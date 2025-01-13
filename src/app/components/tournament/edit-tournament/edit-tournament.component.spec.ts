import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTournamentComponent } from './edit-tournament.component';

describe('EditTournamentComponent', () => {
  let component: EditTournamentComponent;
  let fixture: ComponentFixture<EditTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
