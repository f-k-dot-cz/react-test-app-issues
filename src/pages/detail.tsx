import { useEffect, useState } from "react";
import { getIssueById } from "../api";
import { useParams } from "react-router-dom";
import IIssue from "../types/issue";

import TextField from "@mui/material/TextField";

export default function DetailPage() {
  const [issue, setIssue] = useState<IIssue|null>(null);

  let issueId;

  let params = useParams();
  const fetchIssue = async (issueId: number) => {
    try {
      const result: IIssue = await getIssueById(issueId);
      console.log(result);
      setIssue(result)
    } catch (e) {
      console.log("Not found");
    }
    //setIssues(result)
  };

  useEffect(() => {
    console.log("Mounted - getting issue");
    issueId = "1";
    console.log(params);
    fetchIssue(parseInt(issueId || ""));
  }, [issue]);

  return (
    <div style={{}}>
      <h3>Issue Detail</h3>
      <TextField
        label="Status"
        defaultValue={issue?.status}
        InputProps={{
          readOnly: true,
        }}
        variant="filled"
      />
    </div>
  );
}
