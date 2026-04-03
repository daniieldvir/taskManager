import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Status } from '../../../types/status.type';

@Component({
  selector: 'app-stats-card',
  imports: [NgClass],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  public data = input<number>();
  public label = input<Status>();

  public className = computed(() => {
    const currentLabel = this.label();
    if (!currentLabel) return '';
    
    return currentLabel
      .toLowerCase()
      .trim()         
      .replace(/\s+/g, '-');
  });
}
