import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public label = input<string>();
  public disabled = input<boolean>();
  public variant = input<'primary' | 'secondary'>();
  public buttonClicked = output<void>();

  public handelButtonClicked() {
    this.buttonClicked.emit();
  }
}
