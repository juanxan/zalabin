import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovileComponent } from './automovile.component';

describe('AutomovileComponent', () => {
  let component: AutomovileComponent;
  let fixture: ComponentFixture<AutomovileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomovileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomovileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
