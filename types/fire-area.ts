/*
  fire-areas.ts
  Typings for ESRI Polygon FeatureLayer REST endpoint output
*/
import { FireObjectJSON, FeaturesEntity, Attributes, Geometry } from "./fire-object";

export interface FireAreaJSON extends FireObjectJSON {
  geometryProperties: GeometryProperties;
  features?: (FAFeaturesEntity)[] | null;
}

export interface GeometryProperties {
  shapeAreaFieldName: string;
  shapeLengthFieldName: string;
  units: string;
}

export interface FAFeaturesEntity extends FeaturesEntity {
  attributes: FAAttributes;
  geometry: FAGeometry;
}
export interface FAAttributes extends Attributes {
  
}
export interface FAGeometry extends Geometry {
  rings?: (((number)[] | null)[] | null)[] | null;
}
