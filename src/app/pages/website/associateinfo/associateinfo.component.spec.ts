import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateinfoComponent } from './associateinfo.component';

describe('AssociateinfoComponent', () => {
  let component: AssociateinfoComponent;
  let fixture: ComponentFixture<AssociateinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociateinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociateinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
