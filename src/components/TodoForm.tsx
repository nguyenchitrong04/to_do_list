// src/components/TodoForm.tsx
"use client";

import { useState } from "react";
import { Plus, CalendarClock } from "lucide-react";

interface TodoFormProps {
  onAdd: (text: string, deadline: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd(text, deadline);
    
    setText("");
    setDeadline("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50 mb-8 transition-all hover:shadow-blue-200/50">
      <h2 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2">
        <Plus className="bg-blue-100 text-blue-600 rounded p-1" size={24}/> 
        Thêm công việc mới
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        {/* Input Text */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nội dung công việc..."
          className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700 placeholder-slate-400 font-medium"
        />
        
        {/* Input Datetime */}
        <div className="relative">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full md:w-auto p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 cursor-pointer font-medium"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}