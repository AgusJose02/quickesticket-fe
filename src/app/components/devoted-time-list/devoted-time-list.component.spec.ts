import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevotedTimeListComponent } from './devoted-time-list.component';

describe('DevotedTimeListComponent', () => {
  let component: DevotedTimeListComponent;
  let fixture: ComponentFixture<DevotedTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevotedTimeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevotedTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
