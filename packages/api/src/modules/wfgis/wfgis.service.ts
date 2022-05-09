import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { API_URL } from './apiurl';
import { APIResult } from './types/FireLocationsJson';

@Injectable()
export class WFGISService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  /*
    Update fire locations every five minutes
  */
  @Cron('0 */5 * * * *')
  async updateFireLocations() {
    console.log('Pulling fire locations...');
    // Fetch w/ RxJS flavor
    const data = await lastValueFrom<APIResult>(
      this.httpService
        .get<APIResult>(API_URL)
        .pipe(map((resp) => (resp.status == 200 ? resp.data : null))),
    );
    console.log('Done pulling, converting...');
    // Confirm that there is data
    if (!data) return null;
    const features = data.features
      .filter((fire) => fire.attributes.IncidentTypeCategory === 'WF')
      .map((fire) => {
        return {
          FireDiscoveryDateTime: fire.attributes.FireDiscoveryDateTime,
          IncidentName: fire.attributes.IncidentName,
          UniqueFireIdentifier: fire.attributes.UniqueFireIdentifier,
          InitialLatitude: fire.attributes.InitialLatitude,
          InitialLongitude: fire.attributes.InitialLongitude,
          DailyAcres: fire.attributes.DailyAcres,
          DiscoveryAcres: fire.attributes.DiscoveryAcres,
          CalculatedAcres: fire.attributes.CalculatedAcres,
          IncidentTypeCategory: fire.attributes.IncidentTypeCategory,
          x: fire.geometry.x,
          y: fire.geometry.y,
        };
      });
    console.log('filtration done.');
    if (features.length == 0) {
      console.log('Clearly something has gone wrong, exiting.');
      return;
    }
    console.log('Conversion done, wiping db...');
    await this.prisma.fire.deleteMany({});
    console.log('Writing fires...');
    const prismaData = [];
    features.forEach((f) => {
      prismaData.push({
        id: f.UniqueFireIdentifier,
        name: f.IncidentName,
        discoveryTime: new Date(f.FireDiscoveryDateTime),
        updatedAt: new Date(Date.now()),
        x: f.x,
        y: f.y,
        wkid: data.spatialReference.wkid,
      });
    });
    await this.prisma.fire.createMany({
      data: prismaData,
    });
    console.log('Success. Done.');
  }
}
