import { Avatar } from "@mui/material";
import { Stack } from "react-bootstrap";
import StarRateIcon from "@mui/icons-material/StarRate";
export default function FeedbackTutor({ dataFeedback }) {
  return (
    <div>
      {dataFeedback &&
        dataFeedback.map((item, index) => {
          <div key={index}>
            <div style={{ marginTop: "23px", width: "100%", display: "flex" }}>
              <div className="flex" style={{ width: "10%" }}>
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Remy Sharp" src="/img/avatarMessi.png" />
                </Stack>
              </div>
              <div className="flex border-b-2 pb-3" style={{ width: "90%" }}>
                <div style={{ width: "80%" }}>
                  <p
                    style={{ color: "#5f67f8", fontWeight: "bold" }}
                    className="name_user"
                  >
                    Nguyễn Phương Nam
                  </p>
                  <p>{item.description}</p>
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <div>
                    {[...Array(item.rating)].map((_, i) => (
                      <StarRateIcon key={i} sx={{ color: "#ff9948" }} />
                    ))}
                    {[...Array(5 - item.rating)].map((_, i) => (
                      <StarRateIcon
                        key={item.rating + i}
                        sx={{ color: "lightgrey" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>;
        })}
    </div>
  );
}
