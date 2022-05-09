import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WFGISService } from './wfgis.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [WFGISService],
})
export class WFGISModule {}
