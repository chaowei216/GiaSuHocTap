import { IconButton } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
export default function ExpandContent({ description, numberLength }) {
    const [showFull, setShowFull] = useState(false);
    return (
        <>
            {!showFull ? (
                <React.Fragment>
                    {description.length > numberLength ? `${description.substring(0, numberLength)} ...` : description}
                    {description.length > numberLength && (
                        <IconButton style={{ width: "33px", marginLeft: "5px" }} size="small" onClick={() => setShowFull(true)}>
                            <ExpandMoreIcon />
                        </IconButton >
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment onClick={() => setShowFull(false)}>
                    {description}
                    <IconButton style={{ width: "33px", marginLeft: "5px" }} size="small" onClick={() => setShowFull(false)}>
                        <ExpandLessIcon />
                    </IconButton>
                </React.Fragment>
            )}
        </>
    );
}