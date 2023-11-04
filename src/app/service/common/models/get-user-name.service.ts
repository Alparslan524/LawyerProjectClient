import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserNameService {

  constructor() { }
  userNameOrEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
