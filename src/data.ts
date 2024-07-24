import { COMPLETED, INCOMPLETE } from "./app/shared/constants/completed-status";
import { Priority } from "./app/shared/models/priority";
import { Task } from "./app/shared/models/task";

export const sample_tasks: Task[] = [
  {
    id: '1',
    dateCreated: new Date('2023-01-01'),
    name: 'Task 1',
    description: 'Description for Task 1',
    priority: Priority.HIGH,
    isCompleted: INCOMPLETE,
    dateModified: null
  },
  {
    id: '2',
    dateCreated: new Date('2023-02-01'),
    name: 'Task 2',
    description: 'Description for Task 2',
    priority: Priority.MEDIUM,
    isCompleted: COMPLETED,
    dateModified: null
  },
  {
    id: '3',
    dateCreated: new Date('2023-03-01'),
    name: 'Task 3',
    description: 'Description for Task 3',
    priority: Priority.LOW,
    isCompleted: INCOMPLETE,
    dateModified: null
  },
  {
    id: '4',
    dateCreated: new Date('2023-04-01'),
    name: 'Task 4',
    description: 'Description for Task 4',
    priority: Priority.HIGH,
    isCompleted: COMPLETED,
    dateModified: null
  },
  {
    id: '5',
    dateCreated: new Date('2023-05-01'),
    name: 'Task 5',
    description: 'Description for Task 5',
    priority: Priority.MEDIUM,
    isCompleted: INCOMPLETE,
    dateModified: null
  },
  {
    id: '6',
    dateCreated: new Date('2023-06-01'),
    name: 'Task 6',
    description: 'Description for Task 6',
    priority: Priority.LOW,
    isCompleted: COMPLETED,
    dateModified: null
  }
];