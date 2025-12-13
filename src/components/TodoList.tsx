// src/components/TodoList.tsx
"use client";

import { Check, Trash2, Calendar, Clock, Circle } from "lucide-react";
import { clsx } from "clsx";
import { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-blue-100">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Clock className="text-blue-300" size={32} />
        </div>
        <p className="text-slate-500 font-medium">Danh sách trống. Thêm việc ngay thôi!</p>
      </div>
    );
  }

  // Hàm format ngày giờ
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString('vi-VN', { hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="space-y-3">
      {todos.map((todo) => {
        const isDone = todo.status === 'done';
        
        return (
          <div
            key={todo.id}
            className={clsx(
              "group relative flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all duration-200",
              isDone
                ? "bg-slate-50 border-transparent opacity-75" 
                : "border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 border-l-4 border-l-blue-500"
            )}
          >
            {/* Nút Check/Uncheck */}
            <button
              onClick={() => onToggle(todo.id)}
              className={clsx(
                "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                isDone ? "bg-green-500 border-green-500" : "border-slate-300 hover:border-blue-500 bg-white"
              )}
            >
              {isDone ? <Check size={14} className="text-white" strokeWidth={3} /> : null}
            </button>

            <div className="flex-1 min-w-0">
              {/* Nội dung và Badge */}
              <div className="flex flex-col gap-1.5">
                <p className={clsx(
                    "text-base font-medium break-words transition-all",
                    isDone ? "line-through text-slate-400" : "text-slate-800"
                  )}>
                  {todo.text}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {/* Badge Trạng thái */}
                  <span className={clsx("px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border", 
                     isDone 
                     ? "bg-green-100 text-green-700 border-green-200" 
                     : "bg-yellow-100 text-yellow-700 border-yellow-200"
                   )}>
                      {isDone ? "DONE" : "PENDING"}
                   </span>

                  {/* Deadline */}
                  {todo.deadline && (
                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <Calendar size={12} />
                      <span>Hạn: {formatDate(todo.deadline)}</span>
                    </div>
                  )}

                  {/* Finished Time */}
                  {isDone && todo.finishedTime && (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Clock size={12} />
                      <span>Xong lúc: {formatDate(todo.finishedTime)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nút xóa */}
            <button
              onClick={() => onDelete(todo.id)}
              className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
              title="Xóa công việc"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}