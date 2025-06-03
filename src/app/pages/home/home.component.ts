import { Task } from './../../models/task';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: Task[] = [];
  taskObj!: Task;
  isEditing: boolean = false;
  taskIdToEdit: any;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: [''],
      status: ['']
    });
    this.getTasks();
  }

  getTasks(): void {
    this.homeService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  addTask(): void {
    const task = this.todoForm.value;
    if (task) {
      this.taskObj = {
        id: null, // Assuming the backend will generate the ID
        title: task.title,
        status: 'pending'
      };
      this.homeService.addTask(this.taskObj).subscribe(task => {
        this.tasks.push(task);
        this.todoForm.reset();
      })

    }
  }

  editTask(): void {
    const task = this.todoForm.value;

    if (task) {
      this.taskObj = {
        id: this.taskIdToEdit,
        title: task.title,
        status: 'pending'
      };

      this.homeService.editTask(this.taskObj).subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === this.taskIdToEdit);
        if (index != -1) {
          this.tasks[index] = this.taskObj;
          this.isEditing = false;
          this.taskIdToEdit = null;
        }
        this.todoForm.reset();
      });
    }
  }

  deleteTask(task: Task): void {
    this.homeService.deleteTask(task).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    })
  }
}
