import { Component, effect, inject } from '@angular/core';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-crud-signals-angular';

  public taskService = inject(TaskService);

  constructor() {
    effect(() => {
      localStorage.setItem(
        'TASKS',
        JSON.stringify(this.taskService.userTasks())
      );
    });
  }
}
