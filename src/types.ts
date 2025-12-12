export type Category = "Học tập" | "Làm việc" | "Sức khỏe" | "Giải trí" | "Khác";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  deadline: string;
  category: Category;
  createdAt: number;
};