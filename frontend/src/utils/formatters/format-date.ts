import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_FORMATS: Record<'pt-br' | 'en', string> = {
  'pt-br': 'DD/MM/YYYY',
  en: 'YYYY-MM-DD',
}

export const formatDate = (
  date: string | Date,
  locale: 'en' | 'pt-br' = 'pt-br',
  useUTC: boolean = true,
): string => {
  const adjustedDate = useUTC ? dayjs.utc(date) : dayjs(date)
  return adjustedDate.format(DATE_FORMATS[locale])
}

export const formatDateTime = (date: string | Date): string => {
  const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss'
  return dayjs(date).format(DATE_TIME_FORMAT)
}

export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date,
  locale: 'en' | 'pt-br' = 'pt-br',
): string => {
  const format = DATE_FORMATS[locale]
  return `${dayjs(startDate).format(format)} - ${dayjs(endDate).format(format)}`
}
