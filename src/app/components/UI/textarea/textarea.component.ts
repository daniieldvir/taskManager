import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  public value = input<string>('');
  public label = input<string>('');
  public placeholder = input<string>('');
  public valueChange = output<string>();


}
