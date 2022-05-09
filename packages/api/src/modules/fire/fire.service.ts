import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Fire } from '@prisma/client';

@Injectable()
export class FireService {
  constructor(private prisma: PrismaService) {}

  async user(
    fireWhereUniqueInput: Prisma.FireWhereUniqueInput,
  ): Promise<Fire | null> {
    return this.prisma.fire.findUnique({
      where: fireWhereUniqueInput,
    });
  }

  async allFires(): Promise<Fire[] | null> {
    return this.prisma.fire.findMany({});
  }
}
