import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function PageNavigation({
  page,
  setPage,
  totalPages,
}) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Stack
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
}
