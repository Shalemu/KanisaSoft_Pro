'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Pagination from '@/components/tables/Pagination';
import SendMessageModal from '@/components/modals/SendMessageModal';

import {
  FaUsers,
  FaSearch,
  FaCalendarAlt,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';

interface Visitor {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  church_origin: string;
  visit_date: string;
  prayer: boolean;
  salvation: boolean;
  joining: boolean;
  travel: boolean;
  other: string;
}

export default function WageniPage() {
  const [data, setData] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // FILTERS
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState(today);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // MESSAGE STATES
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);

    try {
      const res = await apiFetch('/guests');

      if (res?.guests) {
        setData(res.guests);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //add visitors

    

  // FILTER LOGIC
  const filtered = data.filter((v) => {
    const matchDate = filterDate
      ? v.visit_date.slice(0, 10) === filterDate
      : true;

    const matchSearch =
      v.full_name.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.includes(search) ||
      v.church_origin.toLowerCase().includes(search.toLowerCase());

    return matchDate && matchSearch;
  });

  // SUMMARY
  const totalVisitors = filtered.length;
  const totalPrayer = filtered.filter((v) => v.prayer).length;
  const totalSalvation = filtered.filter((v) => v.salvation).length;
  const totalJoining = filtered.filter((v) => v.joining).length;
  const totalTravel = filtered.filter((v) => v.travel).length;

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate]);

  // SELECT USER
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // SELECT ALL
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((v) => v.id));
    }

    setSelectAll(!selectAll);
  };

  // SELECTED VISITORS
  const selectedVisitors = data.filter((v) =>
    selectedIds.includes(v.id)
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
            <FaUsers className="text-blue-600 text-lg" />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Wageni Waliohudhuria
            </h2>

            <p className="text-sm text-gray-500">
              Jumla ya Wageni: {filtered.length}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMessageModal(true)}
          disabled={selectedIds.length === 0}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <FaPaperPlane className="text-xs" />
          Tuma Ujumbe
        </button>
      </div>

      

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* DATE */}
        <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 w-full md:w-64">
          <FaCalendarAlt className="text-gray-400 text-sm mr-2" />

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* SEARCH */}
        <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 flex-1">
          <FaSearch className="text-gray-400 text-sm mr-2" />

          <input
            type="text"
            placeholder="Tafuta jina, simu au kanisa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

        <SummaryCard
          title="Jumla"
          value={totalVisitors}
        />

        <SummaryCard
          title="Maombi"
          value={totalPrayer}
        />

        <SummaryCard
          title="Kuokoka"
          value={totalSalvation}
        />

        <SummaryCard
          title="Kujiunga"
          value={totalJoining}
        />

        <SummaryCard
          title="Safari"
          value={totalTravel}
        />
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Inapakia...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Hakuna wageni waliopatikana.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-700 border-b border-gray-100">
              <tr>

                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>

                <th className="px-4 py-3 text-left font-medium">
                  Tarehe
                </th>

                <th className="px-4 py-3 text-left font-medium">
                  Jina
                </th>

                <th className="px-4 py-3 text-left font-medium">
                  Simu
                </th>

                <th className="px-4 py-3 text-left font-medium">
                  Kanisa
                </th>

                <th className="px-4 py-3 text-left font-medium">
                  Sababu
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedData.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition"
                >

                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(v.id)}
                      onChange={() => toggleSelect(v.id)}
                    />
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {new Date(v.visit_date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-800">
                    {v.full_name}
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {v.phone}
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {v.church_origin}
                  </td>

                  <td className="px-4 py-4">
                    {renderReasons(v)}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-5 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* SEND MESSAGE MODAL */}
      <SendMessageModal
        open={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        selectedVisitors={selectedVisitors}
      />

    </div>
  );
}

/* SUMMARY CARD */
function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
        <FaCheckCircle className="text-blue-600 text-sm" />
      </div>

      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-gray-800">
        {value}
      </h3>

    </div>
  );
}

/* REASONS */
function renderReasons(v: Visitor) {
  const items: string[] = [];

  if (v.prayer) items.push('Maombi');
  if (v.salvation) items.push('Kuokoka');
  if (v.joining) items.push('Kujiunga');
  if (v.travel) items.push('Safari');
  if (v.other) items.push(v.other);

  if (items.length === 0) {
    return (
      <span className="text-gray-400 italic">
        Hakuna
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((r, i) => (
        <span
          key={i}
          className="bg-blue-50 text-blue-700 border border-blue-100 text-xs px-2.5 py-1 rounded-lg font-medium"
        >
          {r}
        </span>
      ))}
    </div>
  );
}