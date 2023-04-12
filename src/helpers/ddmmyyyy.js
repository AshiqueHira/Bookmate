export const ddmmyyy = (date) => {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0'); // get the day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get the month (note that it's zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // get the year
    const formattedDate = `${day}.${month}.${year}`; // concatenate the components into a string
    // console.log(formattedDate); // output: e.g. "04.04.2023"

    return formattedDate
}