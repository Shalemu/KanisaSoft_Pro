'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Pagination from '@/components/tables/Pagination';
import { FaUsers } from 'react-icons/fa';

interface Visitor {
  id: number;
  full_name: string;
  phone: string;
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    const res = await apiFetch('/guests');
    if (res?.guests) {
      setData(res.guests);
    }
    setLoading(false);
  };

  // FILTER LOGIC
  const filtered = data.filter(v => {
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

  const totalPrayer = filtered.filter(v => v.prayer).length;
  const totalSalvation = filtered.filter(v => v.salvation).length;
  const totalJoining = filtered.filter(v => v.joining).length;
  const totalTravel = filtered.filter(v => v.travel).length;

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* TITLE */}
<h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
  <FaUsers className="text-gray-700" />
  Wageni Waliohudhuria
</h2>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Tafuta jina, simu au kanisa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

        <SummaryCard title="Jumla ya Wageni" value={totalVisitors} />

        <SummaryCard title="Maombi" value={totalPrayer} />
        <SummaryCard title="Kuokoka" value={totalSalvation} />
        <SummaryCard title="Kujiunga" value={totalJoining} />
        <SummaryCard title="Safari" value={totalTravel} />

      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-center text-gray-500">Inapakia...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">Hakuna wageni.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">

            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-3 py-2">Tarehe</th>
                <th className="px-3 py-2">Jina</th>
                <th className="px-3 py-2">Simu</th>
                <th className="px-3 py-2">Kanisa</th>
                <th className="px-3 py-2">Sababu</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">

                  <td className="px-3 py-2">
                    {new Date(v.visit_date).toLocaleDateString()}
                  </td>

                  <td className="px-3 py-2">{v.full_name}</td>
                  <td className="px-3 py-2">{v.phone}</td>
                  <td className="px-3 py-2">{v.church_origin}</td>

                  <td className="px-3 py-2">
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
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

    </div>
  );
}

/* 🔹 REUSABLE COMPONENTS */

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <FaUsers className="mx-auto text-xl text-blue-600 mb-1" />
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function renderReasons(v: Visitor) {
  const items: string[] = [];

  if (v.prayer) items.push('Maombi');
  if (v.salvation) items.push('Kuokoka');
  if (v.joining) items.push('Kujiunga');
  if (v.travel) items.push('Safari');
  if (v.other) items.push(v.other);

  if (items.length === 0) {
    return <span className="text-gray-400 italic">Hakuna</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((r, i) => (
        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {r}
        </span>
      ))}
    </div>
  );
}