import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class ErrorComponent {
  constructor( private router: Router) {}
  onclick() {
    this.router.navigate(['/home'])
  }
}
