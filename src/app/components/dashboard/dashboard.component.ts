import { Component, inject } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  schemas: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);
  profile = this.oidcSecurityService.userData$;

  logOut() {
    this.oidcSecurityService.logoff();
    this.router.navigate(['/login']);
  }
}
