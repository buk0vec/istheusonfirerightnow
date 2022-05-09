import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FireService } from '../fire/fire.service';
import { PrismaService } from '../prisma/prisma.service';
import { WFGISModule } from '../wfgis/wfgis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WFGISModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FireService, PrismaService],
})
export class AppModule {}
