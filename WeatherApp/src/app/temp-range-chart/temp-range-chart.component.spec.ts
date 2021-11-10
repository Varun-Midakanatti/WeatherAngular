import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempRangeChartComponent } from './temp-range-chart.component';

describe('TempRangeChartComponent', () => {
  let component: TempRangeChartComponent;
  let fixture: ComponentFixture<TempRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempRangeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
