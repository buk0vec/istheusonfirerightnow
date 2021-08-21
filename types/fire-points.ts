export interface FirePoint {
  geometry: PointGeometry
  attributes: FPAttributes
}

export interface FPAttributes {
  IncedentName: string
}

export interface FPFeatures {
  attributes: FPAllAttributes,
  geometry: PointGeometry
}

export interface FPAllAttributes {
  OBJECTID: number;
  ABCDMisc?: string | null;
  ADSPermissionState: string;
  CalculatedAcres?: number | null;
  ContainmentDateTime?: null;
  ControlDateTime?: null;
  DailyAcres?: number | null;
  DiscoveryAcres?: number | null;
  DispatchCenterID: string;
  EstimatedCostToDate?: number | null;
  FinalFireReportApprovedByTitle?: null;
  FinalFireReportApprovedByUnit?: null;
  FinalFireReportApprovedDate?: null;
  FireBehaviorGeneral?: string | null;
  FireBehaviorGeneral1?: string | null;
  FireBehaviorGeneral2?: string | null;
  FireBehaviorGeneral3?: string | null;
  FireCause?: string | null;
  FireCauseGeneral?: string | null;
  FireCauseSpecific?: string | null;
  FireCode?: string | null;
  FireDepartmentID?: string | null;
  FireDiscoveryDateTime: number;
  FireMgmtComplexity?: string | null;
  FireOutDateTime?: null;
  FireStrategyConfinePercent?: number | null;
  FireStrategyFullSuppPercent?: number | null;
  FireStrategyMonitorPercent?: number | null;
  FireStrategyPointZonePercent?: number | null;
  FSJobCode?: string | null;
  FSOverrideCode?: string | null;
  GACC: string;
  ICS209ReportDateTime?: number | null;
  ICS209ReportForTimePeriodFrom?: number | null;
  ICS209ReportForTimePeriodTo?: number | null;
  ICS209ReportStatus?: string | null;
  IncidentManagementOrganization?: string | null;
  IncidentName: string;
  IncidentShortDescription?: string | null;
  IncidentTypeCategory: string;
  IncidentTypeKind: string;
  InitialLatitude?: number | null;
  InitialLongitude?: number | null;
  InitialResponseAcres?: number | null;
  InitialResponseDateTime?: number | null;
  IrwinID: string;
  IsFireCauseInvestigated?: number | null;
  IsFireCodeRequested: number;
  IsFSAssisted?: number | null;
  IsMultiJurisdictional?: number | null;
  IsReimbursable?: number | null;
  IsTrespass?: number | null;
  IsUnifiedCommand?: number | null;
  LocalIncidentIdentifier: string;
  PercentContained?: number | null;
  PercentPerimeterToBeContained?: number | null;
  POOCity?: string | null;
  POOCounty: string;
  POODispatchCenterID: string;
  POOFips: string;
  POOJurisdictionalAgency?: string | null;
  POOJurisdictionalUnit?: string | null;
  POOJurisdictionalUnitParentUnit?: null;
  POOLandownerCategory?: string | null;
  POOLandownerKind?: string | null;
  POOLegalDescPrincipalMeridian?: string | null;
  POOLegalDescQtr?: string | null;
  POOLegalDescQtrQtr?: string | null;
  POOLegalDescRange?: string | null;
  POOLegalDescSection?: number | null;
  POOLegalDescTownship?: string | null;
  POOPredictiveServiceAreaID?: string | null;
  POOProtectingAgency?: string | null;
  POOProtectingUnit: string;
  POOState: string;
  PredominantFuelGroup?: string | null;
  PredominantFuelModel?: string | null;
  PrimaryFuelModel?: string | null;
  SecondaryFuelModel?: string | null;
  TotalIncidentPersonnel?: number | null;
  UniqueFireIdentifier: string;
  WFDSSDecisionStatus: string;
  CreatedBySystem: string;
  ModifiedBySystem: string;
  IsDispatchComplete: number;
  OrganizationalAssessment?: string | null;
  StrategicDecisionPublishDate?: number | null;
  CreatedOnDateTime_dt: number | null;
  ModifiedOnDateTime_dt: number | null;
  Source: string | null;
  GlobalID: string | null;
}
export interface PointGeometry {
  x: number;
  y: number;
}
