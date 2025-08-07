export class TodoEntity {
  constructor(
    public id: number,
    public title: string,
    public completed = false,
    public createdAt = new Date(),
    public updatedAt = new Date()
  ) {}

  changeCompletionStatus(completed: boolean): void {
    this.completed = completed;
  }

  updateTitle(title: string): void {
    this.title = title;
  }
}
