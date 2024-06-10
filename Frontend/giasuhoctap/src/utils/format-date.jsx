export default function FormatDate(date) {
    const dateObj = new Date(date);
    const formattedDate =
        ("0" + dateObj.getDate()).slice(-2) +
        "/" +
        ("0" + (dateObj.getMonth() + 1)).slice(-2) +
        "/" +
        dateObj.getFullYear();
    return formattedDate;
}
