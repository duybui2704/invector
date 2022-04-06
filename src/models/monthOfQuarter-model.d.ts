export interface MonthReportModel {
  id: number
  quarter: number
  contractNumber: number
  investMount: number
  originAmountEarning: number
  interest: number
  month: string
  year: string
}
export interface QuarterReportModel {
  contractNumber: number
  investMount: number
  originAmountEarning: number
  interest: number,
  quarter:number,
  year: string
  data: MonthReportModel[]
}
