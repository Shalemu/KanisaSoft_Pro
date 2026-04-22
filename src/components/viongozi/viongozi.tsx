'use client';

import ReusableTable from '@/components/tables/ReusableTable';
import Pagination from '@/components/tables/Pagination';
import RolesSection from './role-section';
import { useViongozi } from './hooks/useViongozi';
import { FaEdit } from 'react-icons/fa';

export default function ViongoziPage() {
  const {
    filteredLeaders,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    search,
    setSearch,
    filterRole,
    setFilterRole,
    roles,
    showRolesTable,
    selectedRoleIds,
    toggleRoleSelect,
    toggleSelectAllRoles,
    setEditRole,
    setSelectedMemberId,

    // pagination (ADD THIS in hook if not exists)
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedLeaders,
  } = useViongozi();

  const columns = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          onChange={toggleSelectAll}
        />
      ),
      render: (row: any) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelect(row.id)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      key: 'name',
      label: 'Jina',
      render: (row: any) => (
        <div>
          <div>{row.name}</div>
          <div className="text-xs text-gray-400">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Simu',
    },
    {
      key: 'roles',
      label: 'Nafasi',
      render: (row: any) => (
        <div className="flex gap-1 flex-wrap">
          {row.roles?.map((r: string, i: number) => (
            <span
              key={i}
              className="text-xs bg-green-100 px-2 py-1 rounded"
            >
              {r}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Hatua',
      render: (row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditRole(row.id);
          }}
          className="text-yellow-600"
        >
          <FaEdit />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        Viongozi wa Kanisa
      </h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
          placeholder="Tafuta..."
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border p-2"
        >
          <option value="Yote">Yote</option>
          {roles.map((r) => (
            <option key={r.id} value={r.title}>
              {r.title}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <ReusableTable
        data={paginatedLeaders}
        columns={columns}
        onRowClick={(row: any) => {
          if (row.user_id) setSelectedMemberId(row.user_id);
        }}
      />

      {/* PAGINATION (LIKE IBADA UI) */}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ROLES */}
      {showRolesTable && (
        <RolesSection
          roles={roles}
          selectedRoleIds={selectedRoleIds}
          toggleRoleSelect={toggleRoleSelect}
          toggleSelectAllRoles={toggleSelectAllRoles}
          setEditRole={setEditRole}
        />
      )}

    </div>
  );
}