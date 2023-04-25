import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoraCompareComponent } from './aseguradora-compare.component';

describe('AseguradoraCompareComponent', () => {
  let component: AseguradoraCompareComponent;
  let fixture: ComponentFixture<AseguradoraCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradoraCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradoraCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
