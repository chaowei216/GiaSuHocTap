import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import InventoryIcon from "@mui/icons-material/Inventory";
function NoDataPage() {
  return (
    <>
      <TableRow
        style={{ textAlign: "center" }}
      >
        <TableCell
          style={{ fontWeight: "600", height: "100px" }}
          component="th"
          scope="row"
          align="center"
          colSpan={8}
        >
          <InventoryIcon />
          Không có dữ liệu
        </TableCell>
      </TableRow>
    </>
  );
}

export default NoDataPage;
