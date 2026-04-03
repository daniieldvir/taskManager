import { Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-employee-card',
  imports: [LucideDynamicIcon],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  public role = input.required<User>();
  readonly selected = output<User>();

  select() {
    this.selected.emit(this.role());
  }
}
