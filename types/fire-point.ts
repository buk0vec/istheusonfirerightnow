/*
  fire-areas.ts
  Typings for ESRI Point FeatureLayer REST endpoint output
*/

import { FireObjectJSON, Geometry, Attributes, FeaturesEntity } from "./fire-object";

export interface FirePointJSON extends FireObjectJSON {
  features?: (FPFeaturesEntity)[] | null;
}

export interface FPFeaturesEntity extends FeaturesEntity {
  attributes: FPAttributes;
  geometry: FPGeometry;
}

export interface FPAttributes extends Attributes {
  IncidentName: string;
}

export interface FPGeometry extends Geometry {
  x: number;
  y: number;
}