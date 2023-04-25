import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoraTableComponent } from './aseguradora-table.component';

describe('AseguradoraTableComponent', () => {
  let component: AseguradoraTableComponent;
  let fixture: ComponentFixture<AseguradoraTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradoraTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradoraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
