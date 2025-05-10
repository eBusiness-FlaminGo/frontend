import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WandComponent } from './wand.component';

describe('WandComponent', () => {
  let component: WandComponent;
  let fixture: ComponentFixture<WandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
