import { Priority } from "./priority";
import { Status } from "./status";

export class Task {
    id!: string;
    dateCreated!: Date;
    dateModified!: Date | null;
    name!: string;
    description!: string;
    priority!: Priority;
    isCompleted!: string;
}

export class JiraTask {
    _id!: string
    email!: string;
    id!: string;
    dateCreated!: Date;
    dateModified!: Date | null;
    name!: string;
    taskName!: string;
    description!: string;
    priority!: Priority;
    status!: Status;
}