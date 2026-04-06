import { Component, inject, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { User } from '../../../models/user.model';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [LucideDynamicIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public currentUser = input<User | null>(null);
  protected readonly theme = inject(ThemeService);

  protected toggleTheme(): void {
    this.theme.toggle();
  }
}
