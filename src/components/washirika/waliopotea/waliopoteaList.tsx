"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import Swal from "sweetalert2";
import {
  FaUserPlus,
  FaFilter,
  FaSms,
  FaCheck,
  FaTimes,
  FaUsers, 
} from "react-icons/fa";

interface User {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  role?: string | null;
  member_id?: number;
  membership_status?: string;
  residential_zone?: string;
  membership_number?: string;
  created_at?: string;
  deactivation_reason?: string | null;
}

interface Props {
  searchTerm: string;
  selectedMonth?: string;
  selectedGroup?: string;
  fromDate?: string;
  toDate?: string;
}

export default function WaliopoteaList({ searchTerm }: Props) {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  useEffect(() => {
    async function fetchLostMembers() {
      setLoading(true);
      try {
        const data = await apiFetch("/users");

        if (data?.users) {
          const lost = data.users.filter((u: any) =>
           ["detained", "lost", "left", "deceased", "rejected"].includes(
              u.membership_status
            )
          );

          setMembers(lost);
        }
      } catch (err) {
        console.error("Error fetching lost members:", err);
        Swal.fire("Error", "Imeshindikana kupakia data", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchLostMembers();
  }, []);

    const statusLabels: Record<string, string> = {
    detained: 'Ametegwa',
    lost: 'Amepotea',
    left: 'Amehama',
    deceased: 'Amefariki',
  };

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      return (
        m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone?.includes(searchTerm)
      );
    });
  }, [members, searchTerm]);


  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  const toggleSelect = (id: number) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  
  const toggleSelectAll = () => {
    const pageIds = paginatedMembers.map((m) => m.id);

    const allSelected = pageIds.every((id) =>
      selectedMembers.includes(id)
    );

    if (allSelected) {
      setSelectedMembers((prev) =>
        prev.filter((id) => !pageIds.includes(id))
      );
    } else {
      setSelectedMembers((prev) => [
        ...prev,
        ...pageIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  // ACTIVATE (RETURN MEMBER)
  const handleActivate = async () => {
    let count = 0;

    for (const id of selectedMembers) {
      const member = members.find((m) => m.id === id);

      if (!member?.member_id) continue;

      try {
        await apiFetch(`/members/${member.member_id}/activate`, {
          method: "POST",
        });
        count++;
      } catch {
        console.warn("Failed to activate:", member.full_name);
      }
    }

    Swal.fire("Imefanikiwa", `${count} wamerudishwa`, "success");

    setMembers((prev) =>
      prev.filter((m) => !selectedMembers.includes(m.id))
    );

    setSelectedMembers([]);
  };

  //  DELETE
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Una uhakika?",
      text: "Unataka kufuta kabisa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ndiyo",
      cancelButtonText: "Hapana",
    });

    if (!confirm.isConfirmed) return;

    let count = 0;

    for (const id of selectedMembers) {
      const member = members.find((m) => m.id === id);

      if (!member?.member_id) continue;

      try {
        await apiFetch(`/members/${member.member_id}/delete-both`, {
          method: "DELETE",
        });
        count++;
      } catch {
        console.warn("Delete failed:", member.member_id);
      }
    }

    Swal.fire("Imefutwa", `${count} washirika wameondolewa`, "success");

    setMembers((prev) =>
      prev.filter((m) => !selectedMembers.includes(m.id))
    );

    setSelectedMembers([]);
  };

  // EMPTY STATE
  if (!loading && members.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        Hakuna waliopotea kwa sasa
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-bold">Waliopotea</h2>

        <div className="flex gap-2">
          <button
            onClick={handleActivate}
            disabled={selectedMembers.length === 0}
            className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Rudisha
          </button>

          <button
            onClick={handleDelete}
            disabled={selectedMembers.length === 0}
            className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
          >
            Futa
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    paginatedMembers.length > 0 &&
                    paginatedMembers.every((m) =>
                      selectedMembers.includes(m.id)
                    )
                  }
                />
              </th>
              <th className="p-3 text-left">Jina</th>
              <th className="p-3 text-left">Simu</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Tarehe</th>
              <th className="p-3 text-left">Sababu ya Kuondolewa</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Inapakia...
                </td>
              </tr>
            ) : paginatedMembers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Hakuna matokeo
                </td>
              </tr>
            ) : (
              paginatedMembers.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(m.id)}
                      onChange={() => toggleSelect(m.id)}
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {m.full_name}
                    <div className="text-xs text-gray-500">
                      {m.membership_number || "—"}
                    </div>
                  </td>

                  <td className="p-3">{m.phone || "—"}</td>

                  <td className="p-3">
                    {m.residential_zone || "—"}
                  </td>

                  <td className="p-3">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString()
                      : "—"}
                  </td>

                       {/* Status */}
                <td className="p-3">
                <div className="flex items-center gap-2 text-yellow-600 font-bold">
                    <FaTimes />
                     {m.deactivation_reason || "—"}
                </div>
                </td>
                        </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center px-4 py-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}