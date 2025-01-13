import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Link } from './models/link';
import { AuthGoogleService } from './services/auth-google.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [MatListModule, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);
  private authService = inject(AuthGoogleService);
  //userData: any = this.oidcSecurityService.userData$;
  loggedInUser: boolean = false;
  username: string = "";
  mobileQuery: MediaQueryList;

  links: Link[] = [
		{ label: 'Home', path: '/'},
    { label: 'Tournaments', path: '/tournament'},
		{ label: 'Registrations', path: '/registration'},
	];

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    (_, i) =>
      `test = ${i + 1}`,
  );

  private _mobileQueryListener: () => void;

  constructor() {
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

  login() {
    //this.oidcSecurityService.authorize();
  }

  /*refreshSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }*/

  logout() {
    //this.oidcSecurityService.logoff();
    this.router.navigate(['/dashboard']);
  }

  /*ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => {
      if (!isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
      if (isAuthenticated) {
        this.navigateToStoredEndpoint();
        this.loggedInUser = true;
        this.username = userData.name;
      }
    });
  }

  private navigateToStoredEndpoint() {
    const path = this.read('redirect');

    if (this.router.url === path) {
        return;
    }

    if (path.toString().includes('/unauthorized')) {
        this.router.navigate(['/']);
    } else {
        this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data != null) {
        return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }*/

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
