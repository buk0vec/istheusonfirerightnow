export interface FireArea {
  geometry: Geometry,
  attributes: FAAttributes
}

export interface FAAttributes {

}

export interface FireAreasJSON {
  objectIdFieldName: string;
  uniqueIdField: UniqueIdField;
  globalIdFieldName: string;
  geometryProperties: GeometryProperties;
  geometryType: string;
  spatialReference: SpatialReference;
  fields?: (FieldsEntity)[] | null;
  features?: (FeaturesEntity)[] | null;
}
export interface UniqueIdField {
  name: string;
  isSystemMaintained: boolean;
}
export interface GeometryProperties {
  shapeAreaFieldName: string;
  shapeLengthFieldName: string;
  units: string;
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
  domain?: null;
  defaultValue?: null;
  length?: number | null;
}
export interface FeaturesEntity {
  attributes: Attributes;
  geometry: Geometry;
}
export interface Attributes {
  OBJECTID: number;
  poly_IncidentName: string;
  poly_FeatureCategory: string;
  poly_MapMethod: string;
  poly_GISAcres?: number | null;
  poly_CreateDate: number;
  poly_DateCurrent: number;
  poly_PolygonDateTime?: number | null;
  poly_Acres_AutoCalc: number;
  poly_GlobalID: string;
  poly_Source: string;
  irwin_ABCDMisc?: string | null;
  irwin_ADSPermissionState: string;
  irwin_CalculatedAcres?: number | null;
  irwin_ContainmentDateTime?: null;
  irwin_ControlDateTime?: null;
  irwin_DailyAcres: number;
  irwin_DiscoveryAcres?: number | null;
  irwin_DispatchCenterID: string;
  irwin_EstimatedCostToDate?: number | null;
  irwin_FFReportApprovedByTitle?: null;
  irwin_FFReportApprovedByUnit?: null;
  irwin_FFReportApprovedDate?: null;
  irwin_FireBehaviorGeneral?: string | null;
  irwin_FireBehaviorGeneral1?: string | null;
  irwin_FireBehaviorGeneral2?: string | null;
  irwin_FireBehaviorGeneral3?: string | null;
  irwin_FireCause?: string | null;
  irwin_FireCauseGeneral?: string | null;
  irwin_FireCauseSpecific?: string | null;
  irwin_FireCode?: string | null;
  irwin_FireDepartmentID?: string | null;
  irwin_FireDiscoveryDateTime: number;
  irwin_FireMgmtComplexity?: string | null;
  irwin_FireOutDateTime?: null;
  irwin_FSConfinePercent?: number | null;
  irwin_FSFullSuppPercent?: number | null;
  irwin_FSMonitorPercent?: number | null;
  irwin_FSPointZonePercent?: number | null;
  irwin_FSJobCode?: string | null;
  irwin_FSOverrideCode?: string | null;
  irwin_GACC: string;
  irwin_ICS209ReportDateTime?: number | null;
  irwin_ICS209RForTimePeriodFrom?: number | null;
  irwin_ICS209RForTimePeriodTo?: number | null;
  irwin_ICS209ReportStatus?: string | null;
  irwin_IncidentManagementOrg?: string | null;
  irwin_IncidentName: string;
  irwin_IncidentShortDescription?: string | null;
  irwin_IncidentTypeCategory: string;
  irwin_IncidentTypeKind: string;
  irwin_InitialLatitude?: number | null;
  irwin_InitialLongitude?: number | null;
  irwin_InitialResponseAcres?: number | null;
  irwin_InitialResponseDateTime?: number | null;
  irwin_IrwinID: string;
  irwin_IsFireCauseInvestigated?: number | null;
  irwin_IsFireCodeRequested: number;
  irwin_IsFSAssisted?: number | null;
  irwin_IsMultiJurisdictional?: number | null;
  irwin_IsReimbursable?: number | null;
  irwin_IsTrespass?: number | null;
  irwin_IsUnifiedCommand?: number | null;
  irwin_LocalIncidentIdentifier: string;
  irwin_PercentContained?: number | null;
  irwin_PercentPerToBeContained?: number | null;
  irwin_POOCity?: string | null;
  irwin_POOCounty: string;
  irwin_POODispatchCenterID: string;
  irwin_POOFips: string;
  irwin_POOJurisdictionalAgency?: string | null;
  irwin_POOJurisdictionalUnit?: string | null;
  irwin_POOJurisdUnitParentUnit?: null;
  irwin_POOLandownerCategory: string;
  irwin_POOLandownerKind: string;
  irwin_POOLegalDescPrinMeridian?: string | null;
  irwin_POOLegalDescQtr?: string | null;
  irwin_POOLegalDescQtrQtr?: string | null;
  irwin_POOLegalDescRange?: string | null;
  irwin_POOLegalDescSection?: number | null;
  irwin_POOLegalDescTownship?: string | null;
  irwin_POOPredServiceAreaID: string;
  irwin_POOProtectingAgency?: string | null;
  irwin_POOProtectingUnit: string;
  irwin_POOState: string;
  irwin_PredominantFuelGroup?: string | null;
  irwin_PredominantFuelModel?: string | null;
  irwin_PrimaryFuelModel?: string | null;
  irwin_SecondaryFuelModel?: string | null;
  irwin_TotalIncidentPersonnel?: number | null;
  irwin_UniqueFireIdentifier: string;
  irwin_WFDSSDecisionStatus: string;
  irwin_CreatedBySystem: string;
  irwin_ModifiedBySystem: string;
  irwin_IsDispatchComplete: number;
  irwin_OrganizationalAssessment?: string | null;
  irwin_StratDecisionPublishDate?: number | null;
  irwin_GlobalID?: null;
  irwin_Source: string;
  irwin_ArchivedOn?: null;
  irwin_ModifiedOnDateTime_dt: number;
  irwin_CreatedOnDateTime_dt: number;
  Shape__Area: number;
  Shape__Length: number;
  GlobalID: string;
}
export interface Geometry {
  rings?: (((number)[] | null)[] | null)[] | null;
}
