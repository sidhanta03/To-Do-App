
import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];  // Accept tasks from the parent component

  editingTask: Task | null = null; // Used to store the task being edited

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.tasks.length === 0) {
      this.fetchTasks(); // Fetch tasks only if the input tasks array is empty
    }
  }

  // Fetch all tasks from the backend
  fetchTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  // Method to delete a task
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.taskId !== taskId); // Remove task from local array
      }, error => {
        console.error('Error deleting task:', error);
      });
    }
  }

  // Trigger edit mode for a task
  editTask(task: Task): void {
    this.editingTask = { ...task };  // Clone the task to avoid mutating the original
  }

  // Save the edited task
  saveTask(task: Task): void {
     // Check if the "Assigned To" field is filled
     if (!task.assignedTo || task.assignedTo.trim() === '') {
      alert('Please fill in the "Assigned To" field.');
      return;  // Stop saving if the field is empty
    }
    this.taskService.updateTask(task).subscribe(updatedTask => {
      const index = this.tasks.findIndex(t => t.taskId === updatedTask.taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;  // Update the task in the list
      }
      this.editingTask = null;  // Exit edit mode
    }, error => {
      console.error('Error updating task:', error);
    });
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingTask = null;  // Exit edit mode without saving
  }
}

