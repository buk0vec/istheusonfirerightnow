export interface APIResult {
  objectIdFieldName: string;
  uniqueIdField: any;
  globalIdFieldName: string;
  geometryType: string;
  spatialReference: {
    wkid: number;
    latestWkid: number;
  };
  fields: any;
  features: APIFireLocation[];
}

export interface APIFireLocation {
  attributes: {
    FireDiscoveryDateTime: Date;
    IncidentName: string;
    UniqueFireIdentifier: string;
    InitialLatitude: number;
    InitialLongitude: number;
    DailyAcres: number;
    DiscoveryAcres: number;
    CalculatedAcres: number;
    IncidentTypeCategory: string;
  };
  geometry: {
    x: number;
    y: number;
  };
}
