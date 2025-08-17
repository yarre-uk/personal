import {
  TodoAlreadyCompletedException,
  TodoAlreadyIncompletedException,
} from '../exceptions';
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

  updateTitle(title: TodoTitle): void {
    this._title = title;
  }

  markAsCompleted(): void {
    if (this._completed) {
      throw new TodoAlreadyCompletedException(this.getId());
    }

    this._completed = true;
  }

  markAsIncomplete(): void {
    if (!this._completed) {
      throw new TodoAlreadyIncompletedException(this.getId());
    }

    this._completed = false;
  }
}
