import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Fire as FireModel } from '@prisma/client';
import { FireService } from '../fire/fire.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fireService: FireService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getFires')
  async getFires(): Promise<FireModel[]> {
    return this.fireService.allFires();
  }
}
