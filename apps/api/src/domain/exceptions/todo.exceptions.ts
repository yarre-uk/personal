import { DomainException } from './domain.exception';

export enum TodoExceptionCode {
  TODO_NOT_FOUND = 'TODO_NOT_FOUND',
  TODO_ALREADY_COMPLETED = 'TODO_ALREADY_COMPLETED',
  TODO_ALREADY_INCOMPLETE = 'TODO_ALREADY_INCOMPLETE',
  INVALID_TODO_TITLE = 'INVALID_TODO_TITLE',
}

export class TodoNotFoundException extends DomainException {
  readonly code = TodoExceptionCode.TODO_NOT_FOUND;

  constructor(todoId: string) {
    super(`Todo with id ${todoId} was not found`, { todoId });
  }
}

export class TodoAlreadyCompletedException extends DomainException {
  readonly code = TodoExceptionCode.TODO_ALREADY_COMPLETED;

  constructor(todoId: string) {
    super(`Todo with id ${todoId} is already completed`, { todoId });
  }
}

export class TodoAlreadyIncompletedException extends DomainException {
  readonly code = TodoExceptionCode.TODO_ALREADY_INCOMPLETE;

  constructor(todoId: string) {
    super(`Todo with id ${todoId} is already incomplete`, { todoId });
  }
}

export class InvalidTodoTitleException extends DomainException {
  readonly code = TodoExceptionCode.INVALID_TODO_TITLE;

  constructor(title: string, reason: string) {
    super(`Invalid todo title: ${reason}`, { title, reason });
  }
}
