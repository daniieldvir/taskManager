import { Component, input, output, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { User } from '../../../models/user.model';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter',
  imports: [LucideDynamicIcon],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  public assigneeOptions = input<SelectOption[]>();
  public currentUser = input<User | null>(null);
  public filterChanged = output<string>();

  public selectedValue = signal<string>('ALL');

  onSelectionChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;
    const isAll = raw === 'ALL' || raw === '';
    const finalValue = isAll ? 'ALL' : raw;
    this.selectedValue.set(finalValue);
    this.filterChanged.emit(isAll ? 'ALL' : raw);
  }

  filterByLoginUser() {
    const user = this.currentUser();
    if (user) {
      this.selectedValue.set(user.name);
      this.filterChanged.emit(user.name);
    }
  }
}
