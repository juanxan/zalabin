import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoraSelectComponent } from './aseguradora-select.component';

describe('AseguradoraSelectComponent', () => {
  let component: AseguradoraSelectComponent;
  let fixture: ComponentFixture<AseguradoraSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradoraSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradoraSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
