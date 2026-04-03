import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-priority-badge',
  imports: [NgClass],
  templateUrl: './priority-badge.component.html',
  styleUrl: './priority-badge.component.scss',
})
export class PriorityBadgeComponent {
public priority = input<string>()
}
