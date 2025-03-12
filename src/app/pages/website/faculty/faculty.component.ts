import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';
import { User2Service } from '../../../services/user2.service';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent implements OnInit{
  facultyId: any;
  faculty: any

  constructor(private route: ActivatedRoute, private userService: User2Service){}

  ngOnInit(): void {
    this.facultyId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserbyId(this.facultyId).subscribe(
      (res) => {
        this.faculty = res.result;
      }
    );
  }

}
