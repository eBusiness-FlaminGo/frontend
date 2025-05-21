import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LootBoxDetailPageComponent } from './loot-box-detail-page.component';

describe('LootBoxDetailPageComponent', () => {
  let component: LootBoxDetailPageComponent;
  let fixture: ComponentFixture<LootBoxDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LootBoxDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LootBoxDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
