import { DataGrid, GridRowsProp, GridColDef, GridEventListener, useGridApiRef} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getIssues } from "../api";
import { useNavigate } from "react-router-dom";
import IIssue from "../types/issue";

const rows: GridRowsProp = [{
  "id": 1,
  "status": "Open",
  "createdDate": "2021-10-10T10:10:10.000Z",
  "title": "Issue 1",
  "assignee": "John Doe",
  "previewUrl": "https://www.google.com"  
},{
  "id": 2,
  "status": "Open",
  "createdDate": "2021-10-10T10:10:10.000Z",
  "title": "Issue 2",
  "assignee": "John Doe",
  "previewUrl": "https://www.google.com"  
}];
const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 150 },
  { field: "createdDate", headerName: "Created", width: 150 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "assignee", headerName: "Assignee", width: 150 },
  { field: "previewUrl", headerName: "Preview", width: 150 },
];

export default function ListPage() {
  const [issues, setIssues] = useState();


  const navigate = useNavigate();

  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    navigate(`/detail/${params.row.id}`);
  };
  
  const fetchIssues = async () => {
    const result: any = await getIssues();
    console.log(result)
    setIssues(result)
  };

  useEffect(() => {
    console.log("Mounted - getting issues");
    fetchIssues();
  }, [issues]);

  return (
    <div style={{}}>
      <h3>Protected</h3>
      <DataGrid onRowClick={handleEvent} rows={rows} columns={columns} />
    </div>
  );
}
