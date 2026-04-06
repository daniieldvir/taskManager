import { SelectOption } from '../components/UI/select/select.component';

export const projectOptions: SelectOption[] = [
  { label: 'Website Redesign', value: 'Website Redesign' },
  { label: 'Mobile App', value: 'Mobile App' },
  { label: 'Backend API', value: 'Backend API' },
];

export const priorityOptions: SelectOption[] = [
  { label: 'Highest', value: 'Highest' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

export const issueTypeOptions: SelectOption[] = [
  { label: 'Story', value: 'Story' },
  { label: 'Task', value: 'Task' },
  { label: 'Bug', value: 'Bug' },
  { label: 'Improvement', value: 'Improvement' },
];

export const statusOptions: SelectOption[] = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' },
  { label: 'Blocked', value: 'Blocked' },
  { label: 'Closed', value: 'Closed' },
];