export default function FormatDate(date) {
    // Chuyển chuỗi ngày tháng từ "dd-mm-yyyy" thành định dạng "dd/mm/yyyy"
    const parts = date.split('-'); // Tách ngày, tháng, năm từ chuỗi
    const formattedDate = parts[0] + '/' + parts[1] + '/' + parts[2]; // Định dạng lại thành "dd/mm/yyyy"
    return formattedDate;
}