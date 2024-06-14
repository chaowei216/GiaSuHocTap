import { Typography } from "@mui/material";

function Title({ title }) {
  return (
    <Typography style={{marginBottom: "20px", fontWeight: "bold"}} component="h1" variant="h5">
      {title}
    </Typography>
  );
}

export default Title;
