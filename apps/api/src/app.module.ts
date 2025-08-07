import { Module } from '@nestjs/common';

import { DataAccessModule } from '@/data-access';

@Module({
  imports: [DataAccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
