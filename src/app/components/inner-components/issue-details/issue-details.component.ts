import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { projectOptions, statusOptions } from '../../../constants/add-task.const';
import { Task } from '../../../models/task.model';
import { ButtonComponent } from '../../UI/button/button.component';
import { DetailRowComponent } from '../../UI/detail-row/detail-row.component';
import { InputComponent } from '../../UI/input/input.component';
import { SelectComponent, SelectOption } from '../../UI/select/select.component';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DetailRowComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss',
})
export class IssueDetailsComponent {
  public task = input<Task | null>(null);
  public isFormMode = input(false);
  public draft = input<Partial<Task>>({});
  public projectOptions = input<SelectOption[]>(projectOptions);
  public statusOptions = input<SelectOption[]>(statusOptions);
  public assigneeOptions = input<SelectOption[]>([]);
  public currentUserName = input<string>('');

  public assigneeChange = output<string>();
  public reporterChange = output<string>();
  public projectChange = output<string>();
  public teamChange = output<string>();
  public statusChange = output<string>();
  public dueDateChange = output<string>();
  public tagsChange = output<string>();
  public assignToMeClick = output<void>();

  protected currentDate = new Date();
  protected draftTagsText = computed(() => (this.draft().tags ?? []).join(', '));
  protected taskAssignedToMe = computed(() => this.task()?.assignee === this.currentUserName());

  protected assignToMe() {
    this.assignToMeClick.emit();
  }

  protected tagRowChips = computed(() => {
    const t = this.task();
    if (!t?.tags?.length) return undefined;
    return t.tags.map((data) => ({ data, variant: 'tag-chip' as const }));
  });
}
