import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public value = input<string>('');
  public label = input<string>('');
  public placeholder = input<string>('');
  public type = input<'text' | 'date'>('text');
  public maxLength =input<string>('');

  public valueChange = output<string>();
}
