import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-button',
  imports: [NgClass, LucideDynamicIcon],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public label = input<string>();
  public icon = input<{ name: string; size?: number | string }>();
  public disabled = input<boolean>();
  public variant = input<'primary' | 'secondary' | 'uniq-icon'>();
  public buttonClicked = output<void>();

  public handelButtonClicked() {
    this.buttonClicked.emit();
  }
}
