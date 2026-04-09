import { StatusEnum } from "../types/status.type";

export const TaskListColumn = [
    { id: StatusEnum.ToDo, title: 'Open', tasks: [] },
    { id: StatusEnum.InProgress, title: 'In Progress', tasks: [] },
    { id: StatusEnum.Done, title: 'Closed', tasks: [] },
  ];