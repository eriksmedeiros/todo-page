import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';

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

    constructor(private formBuilder: FormBuilder, private homeService: HomeService) {
        this.todoForm = this.formBuilder.group({
            title: [''],
            status: ['']
        });
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
                title: task.title,
                status: task.status || 'pending'
            };
            this.homeService.addTask(this.taskObj).subscribe(task => {
                this.tasks.push(this.taskObj);
                this.todoForm.reset();
            })
        }
    }
}