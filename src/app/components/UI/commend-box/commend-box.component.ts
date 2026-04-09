import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { Comment } from '../../../models/task.model';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-commend-box',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    AvatarComponent,
    LucideDynamicIcon,
    ButtonComponent,
  ],
  templateUrl: './commend-box.component.html',
  styleUrl: './commend-box.component.scss',
})
export class CommendBoxComponent {
  public comments = input<Comment[]>([]);
  public composerAvatarLabel = input<string>('');
  public commentSubmit = output<string>();

  public addNewComment = signal<boolean>(false);
  public commentIcon = computed(() => {
    return this.addNewComment() ? 'message-square-x' : 'message-square-plus';
  });
  protected newComment = signal<string>('');

  public openAddNewCommentSection() {
    this.addNewComment.update((val) => !val);
  }

  protected handleCommentChange(value: string) {
    this.newComment.set(value);
  }

  protected submitComment() {
    const message = this.newComment().trim();
    if (!message) {
      return;
    }
    this.commentSubmit.emit(message);
    this.newComment.set('');
  }
}
