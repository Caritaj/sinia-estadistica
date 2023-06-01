import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTablaComponent } from './datos-tabla.component';

describe('DatosTablaComponent', () => {
  let component: DatosTablaComponent;
  let fixture: ComponentFixture<DatosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
