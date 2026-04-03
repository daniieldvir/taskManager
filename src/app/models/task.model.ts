import { Status } from '../types/status.type';

export interface Task {
  id: number;
  project: string;
  issueType: string;
  title: string;
  priority: string;
  status: Status;
  reporter: string;
  assignee: string;
  userId: string;
  roleType: string;
  team: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  description: string;
  comments: Comment[];
}

export interface Comment {
  author: string;
  userId: string;
  comment: string;
  createdAt: string;
}
