// src/components/TodoForm.tsx
"use client";

import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { Category } from "../types";

interface TodoFormProps {
  onAdd: (text: string, date: string, category: Category) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("Làm việc"); // Mặc định

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd(text, date, category);
    
    // Reset form
    setText("");
    setDate("");
    setCategory("Làm việc");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50 mb-8 transition-all hover:shadow-blue-200/50">
      <h2 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2">
        <Plus className="bg-blue-100 text-blue-600 rounded p-1" size={24}/> 
        Thêm nhiệm vụ mới
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input tên công việc */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ví dụ: Hoàn thành báo cáo, Chạy bộ..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 placeholder-slate-400 font-medium"
        />

        <div className="flex flex-col md:flex-row gap-3">
          {/* Chọn ngày */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 cursor-pointer"
          />

          {/* Chọn Category (Tag) */}
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 appearance-none cursor-pointer"
            >
              <option value="Làm việc">💼 Làm việc</option>
              <option value="Học tập">📚 Học tập</option>
              <option value="Sức khỏe">💪 Sức khỏe</option>
              <option value="Giải trí">🎬 Giải trí</option>
              <option value="Khác">📝 Khác</option>
            </select>
          </div>

          {/* Nút Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all duration-200"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}