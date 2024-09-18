// src/app/task.ts
export interface Task {
    taskId: number;
    description: string;
    status: string;
    dueDate: Date;
    priority: string;
    assignedTo: string;
  }
  
