// src/types.ts

export type TodoStatus = 'pending' | 'done';

export type Todo = {
  id: string;          // ID duy nhất
  text: string;        // Nội dung công việc
  deadline: string;    // Thời hạn (datetime)
  status: TodoStatus;  // Trạng thái: pending / done
  finishedTime: string | null; // Thời gian hoàn thành
  createdAt: number;   // Thời gian tạo
  userId: string;      // Liên kết người dùng
};