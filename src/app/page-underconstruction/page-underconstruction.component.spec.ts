import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderconstructionComponent } from './page-underconstruction.component';

describe('PageUnderconstructionComponent', () => {
  let component: PageUnderconstructionComponent;
  let fixture: ComponentFixture<PageUnderconstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUnderconstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUnderconstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
