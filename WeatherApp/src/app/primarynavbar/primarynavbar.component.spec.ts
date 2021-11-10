import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarynavbarComponent } from './primarynavbar.component';

describe('PrimarynavbarComponent', () => {
  let component: PrimarynavbarComponent;
  let fixture: ComponentFixture<PrimarynavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimarynavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimarynavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
