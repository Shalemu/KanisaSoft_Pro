'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Swal from 'sweetalert2';

export interface Leader {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  roles: string[];
  user_id: number | null;
}

export interface Role {
  id: number;
  title: string;
  protected?: boolean;
}

export function useViongozi() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('Yote');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

  const [showRolesTable, setShowRolesTable] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  // ======================
  // PAGINATION STATE
  // ======================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRoles();
    fetchLeaders();
  }, []);

  const fetchRoles = async () => {
    const res = await apiFetch('/leadership-roles');
    setRoles(res.roles || []);
  };

  const fetchLeaders = async () => {
    const res = await apiFetch('/leaders');
    setLeaders(res.leaders || []);
  };

  // ======================
  // FILTER LOGIC
  // ======================
  const filteredLeaders = leaders.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      filterRole === 'Yote' ||
      l.roles?.includes(filterRole) ||
      l.role === filterRole;

    return matchSearch && matchRole;
  });

  // ======================
  // PAGINATION LOGIC
  // ======================
  const totalPages = Math.ceil(filteredLeaders.length / itemsPerPage);

  const paginatedLeaders = filteredLeaders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterRole]);

  // ======================
  // TOGGLES
  // ======================
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleRoleSelect = (id: number) => {
    setSelectedRoleIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === leaders.length
        ? []
        : leaders.map((l) => l.id)
    );
  };

  const toggleSelectAllRoles = () => {
    setSelectedRoleIds(
      selectedRoleIds.length === roles.length
        ? []
        : roles.map((r) => r.id)
    );
  };

  // ======================
  // RETURN
  // ======================
  return {
    // data
    leaders,
    roles,
    filteredLeaders,
    paginatedLeaders,

    // pagination
    currentPage,
    setCurrentPage,
    totalPages,

    // filters
    search,
    setSearch,
    filterRole,
    setFilterRole,

    // selection
    selectedIds,
    setSelectedIds,
    toggleSelect,
    toggleSelectAll,

    selectedRoleIds,
    toggleRoleSelect,
    toggleSelectAllRoles,

    // UI state
    showRolesTable,
    setShowRolesTable,

    editId,
    setEditId,

    editRole,
    setEditRole,

    selectedMemberId,
    setSelectedMemberId,

    // reload
    fetchLeaders,
    fetchRoles,
  };
}