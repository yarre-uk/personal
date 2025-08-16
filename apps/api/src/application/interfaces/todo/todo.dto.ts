import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { ITodoFilters } from './todo.repository';

import { TodoEntity } from '~/domain';

export class TodoCreateDTO {
  @ApiProperty({ example: 'New Todo' })
  @IsString()
  title: string;
}

export class TodoUpdateDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Updated Title' })
  @IsString()
  @IsOptional()
  title?: string;
}

export class TodoResponseDTO {
  @ApiProperty({ example: 1 })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Base Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Base Description' })
  @IsString()
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

  todoResponseDTO.id = todoEntity.getId();
  todoResponseDTO.title = todoEntity.getTitle().getValue();
  todoResponseDTO.completed = todoEntity.getCompleted();

  return todoResponseDTO;
}
