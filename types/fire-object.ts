/*
  fire-object.ts
  Typings for ESRI Generic FeatureLayer REST endpoint output
*/
export interface FireObjectJSON {
  objectIdFieldName: string;
  uniqueIdField: UniqueIdField;
  globalIdFieldName: string;
  geometryType: string;
  spatialReference: SpatialReference;
  fields?: (FieldsEntity)[] | null;
  features?: (FeaturesEntity)[] | null;
}

export interface UniqueIdField {
  
  name: string;
  
  isSystemMaintained: boolean;
}
export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}
export interface FieldsEntity {
  name: string;
  type: string;
  alias: string;
  sqlType: string;
  length: number;
  domain?: null;
  defaultValue?: null;
}
export interface FeaturesEntity {
  attributes: Attributes;
  geometry: Geometry;
}
export interface Attributes {
  OBJECTID: string;
}

export interface Geometry {
  x?: number;
  y?: number;
  rings?: (((number)[] | null)[] | null)[] | null;
}
