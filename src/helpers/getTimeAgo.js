export const getTimeAgo = (date) => {
    if (!date) return ''
    const now = new Date();
    const elapsedMilliseconds = now - date;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30);
    const elapsedYears = Math.floor(elapsedMonths / 12);

    if (elapsedMilliseconds < 1000) {
        return 'just now';
    } else if (elapsedSeconds < 60) {
        return elapsedSeconds === 1 ? '1 second ago' : elapsedSeconds + ' seconds ago';
    } else if (elapsedMinutes < 60) {
        return elapsedMinutes === 1 ? '1 minute ago' : elapsedMinutes + ' minutes ago';
    } else if (elapsedHours < 24) {
        return elapsedHours === 1 ? '1 hour ago' : elapsedHours + ' hours ago';
    } else if (elapsedDays < 30) {
        return elapsedDays === 1 ? '1 day ago' : elapsedDays + ' days ago';
    } else if (elapsedMonths < 12) {
        return elapsedMonths === 1 ? '1 month ago' : elapsedMonths + ' months ago';
    } else {
        return elapsedYears === 1 ? '1 year ago' : elapsedYears + ' years ago';
    }
}