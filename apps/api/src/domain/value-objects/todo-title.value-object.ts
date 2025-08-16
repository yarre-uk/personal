export class TodoTitle {
  private _title: string;

  constructor(title: string) {
    if (!title || title.trim().length === 0) {
      throw new Error('Todo title cannot be empty');
    }

    this._title = title;
  }

  getValue(): string {
    return this._title;
  }

  equals(other: TodoTitle): boolean {
    return this._title === other.getValue();
  }
}
