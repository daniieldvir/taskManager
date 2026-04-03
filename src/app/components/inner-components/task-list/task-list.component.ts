import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { LucideCalendarCheck2, LucideMessageSquare } from '@lucide/angular';
import { Task } from '../../../models/task.model';
import { AvatarComponent } from '../../UI/avatar/avatar.component';
import { PriorityBadgeComponent } from '../../UI/priority-badge/priority-badge.component';

export interface BoardColumn {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    LucideCalendarCheck2,
    LucideMessageSquare,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    NgClass,
    DatePipe,
    DecimalPipe,
    PriorityBadgeComponent,
    AvatarComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public tasks = input<Task[] | undefined>(undefined);
  public taskClicked = output<Task>();

  onTaskClick(task: Task) {
    this.taskClicked.emit(task);
  }

  public columns: BoardColumn[] = [
    { id: 'Open', title: 'Open', tasks: [] },
    { id: 'In Progress', title: 'In Progress', tasks: [] },
    { id: 'Closed', title: 'Closed', tasks: [] },
  ];

  constructor() {
    effect(() => {
      const allTasks = this.tasks();
      if (allTasks) {
        const newCols = [
          { id: 'Open', title: 'Open', tasks: [] as Task[] },
          { id: 'In Progress', title: 'In Progress', tasks: [] as Task[] },
          { id: 'Closed', title: 'Closed', tasks: [] as Task[] },
        ];
        allTasks.forEach((task) => {
          const status = task.status || 'Open';
          let targetCol = newCols.find((c) => c.id === status);
          if (!targetCol) targetCol = newCols[0];
          targetCol.tasks.push(task);
        });
        this.columns = newCols;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // Update task status visually locally
      const updatedTask = event.container.data[event.currentIndex];
      // updatedTask.status = event.container.id;
    }
  }
}
