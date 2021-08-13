import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeCmsComponent } from './mange-cms.component';

describe('MangeCmsComponent', () => {
  let component: MangeCmsComponent;
  let fixture: ComponentFixture<MangeCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangeCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangeCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
