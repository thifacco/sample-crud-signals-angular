import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { Task } from './task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public http = inject(HttpClient);

  public userService = inject(UserService);

  public usersUrl = `${environment.baseAPI}/users`;

  public tasksUrl = `${environment.baseAPI}/tasks`;

  public userTasks = signal<Task[]>([]);

  private userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap((userId) =>
      this.http
        .get<Task[]>(`${this.tasksUrl}?userId=${userId}`)
        .pipe(tap((tasks) => {
          this.userTasks.set(tasks);

        }))
    )
  );
  
  public readOnlyUserTasks = toSignal(this.userTasks$, {
    initialValue: [] as Task[],
  });
}
