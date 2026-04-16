export enum InterventionLevel {
  I = 'I', // NR > 600 - Urgent intervention
  II = 'II', // 201 - 600 - Correct and adopt measures
  III = 'III', // 121 - 200 - Improve if possible
  IV = 'IV', // 20 - 100 - Maintain controls
}

export enum RiskAcceptability {
  NOT_ACCEPTABLE = 'not_acceptable',
  NOT_ACCEPTABLE_WITH_CONTROLS = 'not_acceptable_with_controls',
  ACCEPTABLE_WITH_SPECIFIC_CONTROL = 'acceptable_with_specific_control',
  ACCEPTABLE = 'acceptable',
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  IN_TREATMENT = 'in_treatment',
  CONTROLLED = 'controlled',
  RESIDUAL = 'residual',
}

export enum ControlHierarchyLevel {
  ELIMINATION = 'elimination', // 1 — delete the hazard
  SUBSTITUTION = 'substitution', // 2 — replace the hazard with something less dangerous
  ENGINEERING = 'engineering', // 3 — engineering controls
  ADMINISTRATIVE = 'administrative', // 4 — administrative controls
  PPE = 'ppe', // 5 — personal protective equipment
}

export enum ControlStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
}
