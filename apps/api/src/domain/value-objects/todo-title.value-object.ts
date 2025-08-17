import { InvalidTodoTitleException } from '../exceptions';

export class TodoTitle {
  private readonly _title: string;

  constructor(title: string) {
    this.validate(title);
    this._title = title.trim();
  }

  private validate(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new InvalidTodoTitleException(title, 'Title cannot be empty');
    }

    if (title.trim().length > 200) {
      throw new InvalidTodoTitleException(
        title,
        'Title cannot exceed 200 characters'
      );
    }

    if (title.trim().length < 3) {
      throw new InvalidTodoTitleException(
        title,
        'Title must be at least 3 characters long'
      );
    }
  }

  getValue(): string {
    return this._title;
  }

  equals(other: TodoTitle): boolean {
    return this._title === other.getValue();
  }
}
