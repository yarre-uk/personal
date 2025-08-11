import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { ITodoFilters } from './todo.repository';

import { TodoEntity } from '~/domain';

export class TodoCreateDTO {
  @ApiProperty({ example: 'New Todo' })
  title: string;
}

export class TodoUpdateDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Updated Title' })
  title?: string;
}

export class TodoResponseDTO {
  @ApiProperty({ example: 'Base Title' })
  title: string;

  @ApiProperty({ example: 'Base Description' })
  completed: boolean;
}

export class TodoFiltersDTO implements ITodoFilters {
  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({ required: false, example: 'Sample Title' })
  @IsString()
  @IsOptional()
  title?: string;
}

export function toTodoResponseDTO(todoEntity: TodoEntity): TodoResponseDTO {
  const todoResponseDTO = new TodoResponseDTO();

  todoResponseDTO.title = todoEntity.title;
  todoResponseDTO.completed = todoEntity.completed;

  return todoResponseDTO;
}
