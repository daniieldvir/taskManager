import { UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  public data = input<string>('');

  public avatarColor = computed(() => {
    const name = this.data() || 'Guest';
    const hash = this.getHashCode(name);

    const goldenRatioConjugate = 0.618033988749895;
    let h = (hash * goldenRatioConjugate) % 1;
    const hue = Math.floor(h * 360);

    return `hsl(${hue}, 70%, 45%)`;
  });

  private getHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }
}
