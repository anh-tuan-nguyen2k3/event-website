import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { FacultyService } from '../../../services/faculty.service';
import { Event2Service } from '../../../services/event2.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
 
  selectedUnit: any = ''; // Lưu giá trị đơn vị được chọn
  search: any;
  selectedCategory: any = "";
  organizationUnits: any;
  categories: any;
  appEvents: any; 
  sql = "http://localhost:8080/eventapp-service/events";


  constructor(private CategoryService: CategoryService, private facultyService: FacultyService, private eventService: Event2Service, private route: ActivatedRoute){}

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

    this.route.queryParams.subscribe(params => {
      this.search = params['search'] || ''; // Default to an empty string if not provided
      console.log('Search term from URL:', this.search);

      // Fetch filtered events based on the search term
      if(this.search === null){
        this.eventService.getAllEventsByStatus("APPROVE").subscribe(
          (res) => {
              console.log(res.result);
              this.appEvents = res.result;
          }
        )
      }else{
        this.eventService.getAllEventsByStatus("APPROVE", this.search).subscribe(
          (res) => {
              console.log(res.result);
              this.appEvents = res.result;
          }
        )
      }
    });

   
  }

  changeCategory(){
    console.log(this.selectedCategory);
    this.filter(this.check());
  }

  changeOrg(){
    console.log(this.selectedUnit);
    this.filter(this.check());
  }

  check(): string {
    let queryParams: string[] = [];

    if (this.selectedCategory !== "") {
        queryParams.push("categoryId=" + this.selectedCategory);
    }

    if (this.selectedUnit !== "") {
        queryParams.push("faculty_id=" + this.selectedUnit);
    }

    return this.sql + (queryParams.length > 0 ? "?" + queryParams.join("&") : "");
}


  filter(sql: string){
    console.log(sql)
    this.eventService.filter(sql).subscribe(
      (res) => {
        this.appEvents = res.result;
      }
    )
  }
}
