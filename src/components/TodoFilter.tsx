// src/components/TodoFilter.tsx
"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface TodoFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: "all" | "completed" | "pending";
  setFilterStatus: (val: "all" | "completed" | "pending") => void;
  sortBy: "created" | "deadline";
  setSortBy: (val: "created" | "deadline") => void;
}

export default function TodoFilter({
  searchQuery, setSearchQuery,
  filterStatus, setFilterStatus,
  sortBy, setSortBy
}: TodoFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
      <div className="relative w-full md:w-5/12 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm nhanh..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-blue-100 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-50 shadow-sm">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-sm bg-transparent border-none focus:ring-0 text-slate-600 font-medium cursor-pointer"
            >
            <option value="all">Tất cả</option>
            <option value="pending">Đang chờ</option>
            <option value="completed">Đã xong</option>
            </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-50 shadow-sm">
            <span className="text-xs text-slate-400 font-medium px-1">Xếp theo:</span>
            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm bg-transparent border-none focus:ring-0 text-slate-600 font-medium cursor-pointer"
            >
            <option value="created">Mới nhất</option>
            <option value="deadline">Hạn chót</option>
            </select>
        </div>
      </div>
    </div>
  );
}