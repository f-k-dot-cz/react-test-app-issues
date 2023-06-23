import { useEffect, useState } from "react";
import { getIssueById } from "../api";
import { useParams } from "react-router-dom";
import IIssue from "../types/issue";

import TextField from "@mui/material/TextField";

export default function DetailPage() {
  const [issue, setIssue] = useState<IIssue|null>(null);

  let params = useParams();
  const fetchIssue = async (issueId: string) => {
    try {
      const fetchedIssue: IIssue = await getIssueById(issueId);
      setIssue(fetchedIssue)
    } catch (e) {
      console.log("Not found");
    }
  };

  useEffect(() => {
    console.log("Mounted - getting issue");
    console.log(params);
    fetchIssue(params.issueId || '');
  }, [issue, params]);

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
