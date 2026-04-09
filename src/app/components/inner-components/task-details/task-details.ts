import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { issueTypeOptions, priorityOptions } from '../../../constants/add-task.const';
import { Task } from '../../../models/task.model';
import { Status, StatusEnum } from '../../../types/status.type';
import { ButtonComponent } from '../../UI/button/button.component';
import { CommendBoxComponent } from '../../UI/commend-box/commend-box.component';
import { InputComponent } from '../../UI/input/input.component';
import { PriorityBadgeComponent } from '../../UI/priority-badge/priority-badge.component';
import { SelectComponent, SelectOption } from '../../UI/select/select.component';
import { TextareaComponent } from '../../UI/textarea/textarea.component';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    PriorityBadgeComponent,
    LucideDynamicIcon,
    CommendBoxComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    IssueDetailsComponent,
    ButtonComponent,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetailsComponent {
  private readonly validStatuses: ReadonlySet<Status> = new Set(
    Object.values(StatusEnum) as Status[],
  );

  public isTaskModelOpen = model<boolean>(false);
  public mode = input<'view' | 'create'>('view');
  public task = input<Task | null>(null);
  public initialTask = input<Partial<Task> | null>(null);
  public assigneeOptions = input<SelectOption[]>([]);
  public composerAvatarLabel = input<string>('');
  public commentSubmit = output<string>();
  public saveTask = output<Task>();
  public quickAssignToMe = output<{ taskId: number; assignee: string }>();

  public issueTypeOptions = signal<SelectOption[]>(issueTypeOptions);
  public priorityOptions = signal<SelectOption[]>(priorityOptions);
  public isEditing = model(false);
  protected isFormMode = computed(() => this.mode() === 'create' || this.isEditing());

  protected draft = computed(() => {
    const base = this.task() ?? this.initialTask() ?? {};
    return {
      issueType: '',
      priority: '',
      title: '',
      description: '',
      assignee: '',
      reporter: '',
      project: '',
      team: '',
      status: 'To Do',
      dueDate: '',
      createdAt: '',
      tags: [],
      ...base,
    } as Task;
  });

  protected draftOverride = signal<Task | null>(null);

  protected activeDraft = computed(() => this.draftOverride() ?? this.draft());
  protected draftTagsText = computed(() => (this.activeDraft().tags ?? []).join(', '));
  protected tagRowChips = computed(() => {
    const t = this.task();
    if (!t?.tags?.length) return undefined;
    return t.tags.map((data) => ({ data, variant: 'tag-chip' as const }));
  });

  startEditing() {
    this.draftOverride.set({ ...this.draft() });
    this.isEditing.set(true);
  }

  updateField<K extends keyof Task>(field: K, value: Task[K]) {
    if (!this.draftOverride()) {
      this.draftOverride.set({ ...this.draft() });
    }
    this.draftOverride.update((current) => ({
      ...(current ?? this.draft()),
      [field]: value,
    }));
  }

  updateStatus(value: string) {
    if (this.validStatuses.has(value as Status)) {
      this.updateField('status', value as Status);
    }
  }

  updateDraftTags(value: string) {
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    this.updateField('tags', tags);
  }

  assignTaskToCurrentUser() {
    const currentUserName = this.composerAvatarLabel().trim();
    if (!currentUserName) return;

    if (this.isFormMode()) {
      this.updateField('assignee', currentUserName);
      return;
    }

    const currentTask = this.task();
    if (!currentTask) return;
    this.quickAssignToMe.emit({ taskId: currentTask.id, assignee: currentUserName });
  }

  save() {
    this.saveTask.emit(this.activeDraft());
    this.isEditing.set(false);
    this.draftOverride.set(null);
  }

  cancelEditing() {
    this.isEditing.set(false);
    this.draftOverride.set(null);
    if (this.mode() === 'create') this.close();
  }

  close() {
    this.isTaskModelOpen.set(false);
    this.isEditing.set(false);
    this.draftOverride.set(null);
  }
}
