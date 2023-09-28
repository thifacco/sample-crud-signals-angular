import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { TaskService } from '../../task.service';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'description', 'completed'];

  public fullColumns = [...this.displayedColumns, 'status', 'delete'];

  public selectedUserId!: number;

  public tasksUrl = 'http://localhost:3000/tasks';

  public userService = inject(UserService);

  public taskService = inject(TaskService);

  public route = inject(ActivatedRoute);

  public router = inject(Router);

  public http = inject(HttpClient);

  public destroyRef = inject(DestroyRef);

  public userTasks = this.taskService.userTasks;

  public ngOnInit(): void {
    this.selectedUserId = +this.route.snapshot.paramMap.get('id')!;

    if (this.selectedUserId) {
      this.userService.setSelectedUserId(this.selectedUserId);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  public updteTaskStatus(task: Task): void {
    const completedTask = {
      ...task,
      completed: true,
    };

    this.http
      .put(this.tasksUrl + '/' + task.id, completedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskService.userTasks.mutate(() => (task.completed = true));
        },
        //! Error handling
      });
  }

  public deleteTask(taskId: number): void {
    this.http
      .delete(this.tasksUrl + '/' + taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskService.userTasks.update((tasks) =>
            tasks.filter((task) => task.id !== taskId)
          );
        },
        //! Error handling
      });
  }

  public addNewTask(): void {
    const newTask = {
      name: "New task",
      description: "New task description",
      completed: false,
      userId: 1
    }

    this.http
      .post(this.tasksUrl, newTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const responseTaks = response as Task;
          this.userTasks.update((task) => [...task, responseTaks]);
        },
        //! Error handling
      });
  }
}
