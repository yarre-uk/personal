import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DomainExceptionFilter, TodoModule } from './presentation';

import { DataAccessModule } from '@/data-access';

@Module({
  imports: [DataAccessModule, TodoModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
