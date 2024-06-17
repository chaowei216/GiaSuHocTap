import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { GetAllPendingTutor } from '../../../api/TutorManagementApi';

export default function ButtonType({ setType, isUpdate }) {
  const [numberRequest, setNumberRequest] = React.useState("");
  useEffect(() => {
    const fetchRequestTutor = async () => {
      const response = await GetAllPendingTutor();
      const responseJson = await response.json();
      setNumberRequest(responseJson.data.totalCount)
    }
    fetchRequestTutor();
  }, [isUpdate])
  return (
    <div style={{ marginBottom: "15px" }}>
      <Button onClick={() => setType("All")} variant="contained" style={{ marginRight: "20px", fontWeight: "bold" }}>All</Button>
      <Button onClick={() => setType("Active")} variant="contained" style={{ background: "green", marginRight: "20px", fontWeight: "bold" }}>Active</Button>
      <Button onClick={() => setType("Pending")} variant="contained" style={{ background: "#d45b13", fontWeight: "bold" }}>Request ({numberRequest})</Button>
    </div>
  )
}
