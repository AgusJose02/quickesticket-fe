import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWikiComponent } from './project-wiki.component';

describe('ProjectWikiComponent', () => {
  let component: ProjectWikiComponent;
  let fixture: ComponentFixture<ProjectWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectWikiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
