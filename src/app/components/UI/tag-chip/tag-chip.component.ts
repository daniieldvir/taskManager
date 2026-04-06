import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Status } from '../../../types/status.type';
import { StatsCardComponent } from '../stats-card/stats-card.component';

@Component({
  selector: 'app-tag-chip',
  imports: [NgClass, StatsCardComponent],
  templateUrl: './tag-chip.component.html',
  styleUrl: './tag-chip.component.scss',
})
export class TagChipComponent {
  public data = input<string>();
  public displayStatus = input<Status>();
  public variant = input<'status-chip' | 'tag-chip'>();
}
