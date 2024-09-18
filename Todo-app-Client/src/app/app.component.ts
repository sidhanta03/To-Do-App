import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];  // Declare tasks as an array of any type
  showTaskForm = false;

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Refresh the task list when clicking the "Refresh" button
  refreshTaskList() {
    this.loadTasks();  // Reload tasks from the backend
  }


  // When a task is added, update the task list
  onTaskAdded(task: any) {
    if (task) {
      this.tasks.push(task);  // Add the newly added task to the array
    }
    this.showTaskForm = false;  // Close the task form after submission
  }
}
