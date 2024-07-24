import { Priority } from "./priority";

export class Task {
    id!: string;
    dateCreated!: Date;
    dateModified!: Date | null;
    name!: string;
    description!: string;
    priority!: Priority;
    isCompleted!: string;
}