import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevotedTimeFormComponent } from './devoted-time-form.component';

describe('DevotedTimeFormComponent', () => {
  let component: DevotedTimeFormComponent;
  let fixture: ComponentFixture<DevotedTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevotedTimeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevotedTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
