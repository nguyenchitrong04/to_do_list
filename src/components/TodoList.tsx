// src/components/TodoList.tsx
"use client";

import { Check, Trash2, Calendar, Tag } from "lucide-react";
import { clsx } from "clsx";
import { Todo, Category } from "../types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Hàm lấy màu cho từng loại Tag
const getCategoryColor = (cat: Category) => {
  switch (cat) {
    case "Làm việc": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Học tập": return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "Sức khỏe": return "bg-green-100 text-green-700 border-green-200";
    case "Giải trí": return "bg-pink-100 text-pink-700 border-pink-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
            <Tag className="text-blue-300" size={40} />
        </div>
        <p className="text-slate-500 font-medium">Danh sách trống. Thêm việc ngay thôi!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={clsx(
            "group relative flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all duration-200",
            todo.completed 
              ? "bg-slate-50 border-transparent opacity-70" 
              : "border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200"
          )}
        >
          {/* Nút check tròn */}
          <button
            onClick={() => onToggle(todo.id)}
            className={clsx(
              "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
              todo.completed ? "bg-blue-500 border-blue-500" : "border-slate-300 hover:border-blue-500"
            )}
          >
            {todo.completed && <Check size={14} className="text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {/* Hiển thị Category Badge */}
              <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider", getCategoryColor(todo.category))}>
                {todo.category || "Khác"}
              </span>
              
              {/* Deadline */}
              {todo.deadline && (
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <Calendar size={12} />
                  <span>{todo.deadline}</span>
                </div>
              )}
            </div>

            <p className={clsx(
                "text-base font-medium break-words",
                todo.completed ? "line-through text-slate-400" : "text-slate-800"
              )}>
              {todo.text}
            </p>
          </div>

          <button
            onClick={() => onDelete(todo.id)}
            className="text-slate-300 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}