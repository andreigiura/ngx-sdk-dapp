import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerScreenComponent } from './ledger-screen.component';

describe('LedgerScreenComponent', () => {
  let component: LedgerScreenComponent;
  let fixture: ComponentFixture<LedgerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
