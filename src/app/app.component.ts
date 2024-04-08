import { Component } from '@angular/core';
import { UserService } from './services/UserService';
import { User } from './shared/Models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'foodmine';
}
