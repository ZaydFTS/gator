export function parsePublishedDate(
    dateStr?: string
): Date | null {
    if (!dateStr) return null;

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        return null;
    }

    return date;
}