import { Component, computed, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Status } from '../../../types/status.type';
import { AvatarComponent } from '../avatar/avatar.component';
import { TagChipComponent } from '../tag-chip/tag-chip.component';

export type TagChipData = {
  data: string ;
  variant: 'status-chip' | 'tag-chip';
  displayStatus?: Status;
};

@Component({
  selector: 'app-detail-row',
  standalone: true,
  imports: [LucideDynamicIcon, AvatarComponent, TagChipComponent],
  templateUrl: './detail-row.component.html',
  styleUrl: './detail-row.component.scss',
})
export class DetailRowComponent {
  public svgIcon = input.required<{ name: string; size?: number | string }>();
  public label = input.required<string>();
  public value = input<string>();
  public avatar = input<string>();
  public tagChip = input<TagChipData | TagChipData[]>();

  public isEditable = input<boolean>(false);
  public isEditing = input<boolean>(false);

  protected tags = computed(() => {
    const val = this.tagChip();
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  });
}
