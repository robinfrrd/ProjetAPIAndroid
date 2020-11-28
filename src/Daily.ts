export interface Daily {
  readonly date: number,
  readonly total_death: number,
  readonly total_positive: number,
  readonly total_negative: number,
  readonly day_death: number,
  readonly day_positive: number,
  readonly onVentilatorCurrently: number
  readonly favorite : boolean
}