import { Component, input, output } from '@angular/core';
import { LucideChevronDown } from '@lucide/angular';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter',
  imports: [LucideChevronDown],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  public assigneeOptions = input<SelectOption[]>();

  public filterChanged = output<string>();

  onSelectionChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;
    const isAll = raw === 'ALL' || raw === '';
    this.filterChanged.emit(isAll ? 'ALL' : raw);
  }
}
