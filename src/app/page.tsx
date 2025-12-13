// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Todo } from "../types";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";

function TodoApp() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // State UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "done" | "pending">("all");
  const [sortBy, setSortBy] = useState<"created" | "deadline" | "status">("created");

  // Load Data
  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`todo_app_${user.id}`);
      if (savedData) setTodos(JSON.parse(savedData));
    }
  }, [user?.id]);

  // Save Data
  useEffect(() => {
    if (user?.id) {
      // Lưu luôn, kể cả rỗng
      localStorage.setItem(`todo_app_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user?.id]);

  // --- HANDLERS ---
  
  const handleAddTodo = (text: string, deadline: string) => {
    if (!user?.id) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      deadline,
      status: 'pending',     // Mặc định Pending
      finishedTime: null,    // Mặc định null
      createdAt: Date.now(),
      userId: user.id        // Gắn User ID
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleStatus = (id: string) => {
    setTodos(todos.map(t => {
      if (t.id !== id) return t;

      const newStatus = t.status === 'pending' ? 'done' : 'pending';
      // Nếu chuyển sang done -> Ghi nhận giờ. Nếu mở lại -> Xóa giờ.
      const newFinishedTime = newStatus === 'done' ? new Date().toISOString() : null;

      return { 
        ...t, 
        status: newStatus,
        finishedTime: newFinishedTime
      };
    }));
  };

  const deleteTodo = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa công việc này?")) {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  // --- FILTER & SORT LOGIC ---
  const filteredTodos = todos
    .filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" ? true : todo.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === "status") {
        // Pending trước, Done sau
        if (a.status === b.status) return 0;
        return a.status === 'pending' ? -1 : 1;
      }
      return b.createdAt - a.createdAt;
    });

  const pendingCount = todos.filter(t => t.status === 'pending').length;

  return (
    <div>
      <div className="mb-8 mt-4">
         <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
           Xin chào, {user?.firstName} 👋
         </h1>
         <div className="flex items-center gap-3 text-slate-600 font-medium">
            <span>Danh sách công việc cần làm</span>
            {pendingCount > 0 && (
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 shadow-sm">
                    Pending: {pendingCount}
                </span>
            )}
         </div>
      </div>

      <TodoForm onAdd={handleAddTodo} />
      
      <TodoFilter 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <TodoList 
        todos={filteredTodos} 
        onToggle={toggleStatus} 
        onDelete={deleteTodo} 
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
          <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-xl">
            <span className="text-5xl">📝</span>
          </div>
          <h2 className="text-4xl font-black text-blue-900 mb-4">Task Master</h2>
          <p className="text-slate-500 mb-10 text-lg max-w-md leading-relaxed">
            Quản lý công việc thông minh, đơn giản và hiệu quả.
          </p>
          <div className="scale-125">
             <SignIn routing="hash" />
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <TodoApp />
      </SignedIn>
    </>
  );
}