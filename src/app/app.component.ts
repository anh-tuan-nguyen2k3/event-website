import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'event-app';
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Bootstrap carousel initialized!');
    });
  }
}
