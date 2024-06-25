import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css'
})
export class AuthenticatedComponent {

  constructor(private authService:AuthService,private router: Router) { 
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['login']);
  }
}
