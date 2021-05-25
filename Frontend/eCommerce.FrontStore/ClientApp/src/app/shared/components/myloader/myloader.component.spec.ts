import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyloaderComponent } from './myloader.component';

describe('MyloaderComponent', () => {
  let component: MyloaderComponent;
  let fixture: ComponentFixture<MyloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
