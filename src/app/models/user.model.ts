import { LucideIconData } from '@lucide/angular';
import { RoleType } from '../types/roleType.type';

export interface User {
  userId: string;
  name: string;
  roleType: RoleType;
  team: string;
  email: string;
  icon?: LucideIconData;
}
