import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Subscription } from 'rxjs';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavigationComponent],
  schemas: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
