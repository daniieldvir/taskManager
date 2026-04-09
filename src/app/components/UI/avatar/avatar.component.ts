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
    const normalizedName = this.normalizeName(this.data());
    const baseHash = this.fnv1a32(normalizedName);
    const color = this.hashToRgb(baseHash);
    const readableColor = this.ensureContrastWithWhiteText(color);

    return `rgb(${readableColor.r}, ${readableColor.g}, ${readableColor.b})`;
  });

  private normalizeName(name: string | undefined): string {
    const normalized = (name ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
    return normalized || 'guest';
  }

  private fnv1a32(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  private hashToRgb(hash: number): { r: number; g: number; b: number } {
    const mixed = this.fnv1a32(`${hash}-avatar-color`);
    const r = (mixed >> 16) & 0xff;
    const g = (mixed >> 8) & 0xff;
    const b = mixed & 0xff;
    return { r, g, b };
  }

  private ensureContrastWithWhiteText(color: { r: number; g: number; b: number }): {
    r: number;
    g: number;
    b: number;
  } {
    let { r, g, b } = color;

    for (let i = 0; i < 8; i++) {
      const luminance = this.getRelativeLuminance(r, g, b);
      const contrastWithWhite = 1.05 / (luminance + 0.05);
      if (contrastWithWhite >= 4.5) {
        break;
      }

      r = Math.max(0, Math.floor(r * 0.85));
      g = Math.max(0, Math.floor(g * 0.85));
      b = Math.max(0, Math.floor(b * 0.85));
    }

    return { r, g, b };
  }

  private getRelativeLuminance(r: number, g: number, b: number): number {
    const [sr, sg, sb] = [r, g, b].map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
  }
}
