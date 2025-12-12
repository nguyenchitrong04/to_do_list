// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Todo, Category } from "../types";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";

function TodoApp() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // State quản lý bộ lọc và tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [sortBy, setSortBy] = useState<"created" | "deadline">("created");

  // Load Data
  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`todo_app_${user.id}`);
      if (savedData) setTodos(JSON.parse(savedData));
    }
  }, [user?.id]);

  // Save Data
  useEffect(() => {
    if (user?.id && todos.length > 0) {
      localStorage.setItem(`todo_app_${user.id}`, JSON.stringify(todos));
    } else if (user?.id && todos.length === 0) {
       const existing = localStorage.getItem(`todo_app_${user.id}`);
       if (existing) localStorage.setItem(`todo_app_${user.id}`, JSON.stringify([]));
    }
  }, [todos, user?.id]);

  // --- CẬP NHẬT HÀM THÊM MỚI ---
  const handleAddTodo = (text: string, date: string, category: Category) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      deadline: date,
      category: category, 
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleStatus = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    if (confirm("Bạn muốn xóa nhiệm vụ này?")) {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  // Logic lọc và sắp xếp
  const filteredTodos = todos
    .filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = 
        filterStatus === "all" ? true :
        filterStatus === "completed" ? todo.completed :
        !todo.completed;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      return b.createdAt - a.createdAt;
    });

  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <div>
      <div className="mb-8 mt-4">
         <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
           Xin chào, {user?.firstName} 👋
         </h1>
         <div className="flex items-center gap-3 text-slate-600 font-medium">
            <span>Hôm nay bạn có mục tiêu gì không?</span>
            {pendingCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-200">
                    Còn {pendingCount} việc
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
            <span className="text-5xl">🚀</span>
          </div>
          <h2 className="text-4xl font-black text-blue-900 mb-4">Task Master</h2>
          <p className="text-slate-500 mb-10 text-lg max-w-md leading-relaxed">
            Quản lý công việc thông minh với giao diện xanh mát. Đăng nhập để bắt đầu hành trình năng suất!
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