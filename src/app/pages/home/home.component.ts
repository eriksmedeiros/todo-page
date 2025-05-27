import { HomeService } from './../services/home.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    taskObj: any = {
        title: '',
        status: ''
    };

    todoForm: FormGroup;
    tasks: any[] = [];

    constructor(private formBuilder: FormBuilder,
                private homeService: HomeService)
    {
        this.todoForm = this.formBuilder.group({
            title: [''],
            status: ['pending']
        });
    }

    getTasks(): void {

    }

    addTask(): void {
        const task = this.todoForm.value;
        if (task) {
            this.taskObj = {
                title: task.title,
                status: task.status
            };
            this.tasks.push(this.taskObj);
            this.todoForm.reset();
        }
    }
}
