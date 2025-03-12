import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { FacultyService } from '../../../services/faculty.service';
import { Event2Service } from '../../../services/event2.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
 
  selectedUnit: any = ''; // Lưu giá trị đơn vị được chọn
  selectedCategory: any;
  organizationUnits: any;
  categories: any;
  appEvents: any; 
  sql = "http://localhost:8080/eventapp-service/events?";


  constructor(private CategoryService: CategoryService, private facultyService: FacultyService, private eventService: Event2Service){}

  ngOnInit(): void {
    console.log(this.selectedUnit + this.selectedCategory);
    this.CategoryService.getAllEvents().subscribe(
      (res) => {
        this.categories = res.result;
      }
    )

    this.facultyService.getAllFaculty().subscribe(
      (res) => {
        this.organizationUnits = res.result;
      }
    )

    this.eventService.getAllEventsByStatus("APPROVE").subscribe(
      (res) => {
          console.log(res.result);
          this.appEvents = res.result;
      }
    )
  }

  changeCategory(){
    console.log(this.selectedCategory);
    this.filter(this.check());
  }

  changeOrg(){
    console.log(this.selectedUnit);
   
    this.filter( this.check());
  }

  check(): string {
    if(this.selectedCategory === null && this.selectedUnit === null){
      return this.sql;
    }

    if(this.selectedCategory !== null && this.selectedUnit === null){
      return this.sql + "?categoryId=" + this.selectedCategory;
    }

    if(this.selectedCategory === null && this.selectedUnit !== null){
      return this.sql + "?faculty_id=" + this.selectedUnit;
    }

    return this.sql + "?faculty_id=" + this.selectedUnit + "&categoryId=" + this.selectedCategory;
  }
  filter(sql: string){
    this.eventService.filter(sql).subscribe(
      (res) => {
        this.appEvents = res.result;
      }
    )
  }
}
