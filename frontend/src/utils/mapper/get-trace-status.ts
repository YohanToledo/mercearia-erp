export function getTraceStatus(status: string) {
  if (status.startsWith('2')) return '2xx'
  if (status.startsWith('4')) return '4xx'
  if (status.startsWith('5')) return '5xx'
  if (status === 'SUCCESS') return 'SUCCESS'
  if (status === 'WARNING') return 'WARNING'
  return 'ERROR'
}
