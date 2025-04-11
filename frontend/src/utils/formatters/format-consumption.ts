export const formatConsumptionPercentage = (total = 0, available = 0) => {
  const percent = (total / available) * 100

  if (isNaN(percent)) {
    return {
      formatted: 0,
      progress: 0,
    }
  }

  return {
    formatted: percent.toFixed(0),
    progress: percent,
  }
}

export const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}
