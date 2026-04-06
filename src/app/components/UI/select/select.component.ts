import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';

export type SelectOption = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, LucideDynamicIcon],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  public value = input<string>('');
  public valueChange = output<string>();
  public options = input<SelectOption[]>([]);
}
