"use client";


import { useState } from "react";
import WaliokataliwaList from "./waliokataliwaList";
import WaliokataliwaFilters from "./waliokataliwaFilters";

export default function Waliopotea() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <WaliokataliwaFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      {/* Members List */}
      <WaliokataliwaList
        searchTerm={searchTerm}
        selectedMonth={selectedMonth}
        selectedGroup={selectedGroup}
        fromDate={fromDate}
        toDate={toDate}
      />

    </div>
  );
}