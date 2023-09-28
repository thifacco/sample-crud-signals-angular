import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public http = inject(HttpClient);

  public userUrl = `${environment.baseAPI}/users`;

  private users$ = this.http.get<User[]>(this.userUrl);

  public users = toSignal(this.users$, { initialValue: [] as User[] });

  public totalUsersCount = computed(() => this.users().length);
}
