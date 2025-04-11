export function addDateOffset(days = 0, months = 0, years = 0) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    currentDate.setMonth(currentDate.getMonth() + months);
    currentDate.setFullYear(currentDate.getFullYear() + years);
    return currentDate;
}

export function getMonthRange(month: string): { startOfMonth: Date; endOfMonth: Date } {
    const [year, monthIndex] = month.split('-').map(Number);
    
    const startOfMonth = new Date(year, monthIndex - 1, 1, 0, 0, 0);
    const endOfMonth = new Date(year, monthIndex, 0, 23, 59, 59);

    return { startOfMonth, endOfMonth };
}
