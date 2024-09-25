import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorComponent } from './decorator.component';

describe('DecoratorComponent', () => {
  let component: DecoratorComponent;
  let fixture: ComponentFixture<DecoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorComponent]
    });
    fixture = TestBed.createComponent(DecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
