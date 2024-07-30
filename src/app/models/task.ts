export interface Task {
  taskId: number;
  taskName: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  image: string;
}