import { TodoTitle } from '../value-objects';

export class TodoEntity {
  private _id: string;
  private _title: TodoTitle;
  private _completed: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    title,
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: {
    id: string;
    title: TodoTitle;
    completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = id;
    this._title = title;
    this._completed = completed;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  getId() {
    return this._id;
  }

  getTitle() {
    return this._title;
  }

  getCompleted() {
    return this._completed;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }

  changeCompletionStatus(completed: boolean): void {
    this._completed = completed;
  }

  updateTitle(title: TodoTitle): void {
    this._title = title;
  }
}
