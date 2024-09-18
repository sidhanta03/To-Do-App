import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = { description: '', status: 'Not Started', dueDate: '', priority: 'Normal', assignedTo: '' };

  @Output() taskAdded = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  addTask() {
    if (!this.task.assignedTo) {
      alert('Please fill in the "Assigned To" field.');
      return; // Stop the form submission if the field is empty
    }
    this.http.post('http://localhost:3000/tasks', this.task).subscribe(
      (response: any) => {
        this.taskAdded.emit(response); // Emit the added task to parent component
        this.closeForm();
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }

  closeForm() {
    this.taskAdded.emit(null); // Optionally close the form if needed
  }
}
