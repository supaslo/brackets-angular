import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Link } from '../../models/link';
import { MediaMatcher } from '@angular/cdk/layout';
import { GoogleSigninComponent } from "../google-signin/google-signin.component";
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  imports: [MatListModule, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule, GoogleSigninComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-navigation',
  styleUrl: './navigation.component.css',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnDestroy, OnInit {
  authSubscription!: Subscription;
  private router = inject(Router);
  loggedInUser: boolean = false;
  user: SocialUser | undefined;
  mobileQuery: MediaQueryList;

  links: Link[] = [
    { label: 'Home', path: '/'},
    { label: 'Tournaments', path: '/tournament'},
    { label: 'Registrations', path: '/registration'},
    { label: 'Users', path: '/user'},
  ];

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    (_, i) =>
      `test = ${i + 1}`,
  );
  
  private _mobileQueryListener: () => void;

  constructor(private authService: SocialAuthService) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loggedInUser = false;
    /*if (this.userData.username) {
      this.loggedInUser = true;
      this.username = this.userData.name;
    }*/
  }

  ngOnDestroy(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  
  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.authSubscription = this.authService.authState.subscribe((user) => {
        this.loggedInUser = (user != null);
        this.user = user;
        console.log('user', user);
        localStorage.setItem('user', JSON.stringify(user));
      });
    } else {
      this.loggedInUser = true;
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('user');
    this.loggedInUser = false;
    this.router.navigate(['/']);
  } 
}
