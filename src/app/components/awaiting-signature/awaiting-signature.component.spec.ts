import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingSignatureComponent } from './awaiting-signature.component';

describe('AwaitingSignatureComponent', () => {
  let component: AwaitingSignatureComponent;
  let fixture: ComponentFixture<AwaitingSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitingSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
