import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IIssue from "../types/issue";
import { useEffect, useState } from "react";
import { getIssues } from "../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const getFullName = (params: GridValueGetterParams) => {
  return params.row?.assignee?.fullName || "n/a";
};

const getCreatedDate = (params: GridValueGetterParams) => {
  return format(new Date(params.row.createdDate), "dd.MM.yyyy");
};

const getPreview = (params: GridRenderCellParams) => {
  return (
    <a href={params.row.previewUrl} target="_blank" rel="noreferrer">
      <img src={params.row.previewUrl} alt="thumbnail" style={{ width: "100%" }} className="preview" />
    </a>
  );
};

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 120 },
  {
    field: "createdDate",
    headerName: "Created",
    width: 150,
    valueGetter: getCreatedDate,
  },
  { field: "title", headerName: "Title", minWidth: 200, flex: 1 },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 250,
    valueGetter: getFullName,
  },
  {
    field: "previewUrl",
    headerName: "Preview",
    width: 100,
    renderCell: getPreview,
  },
];

export default function ListPage() {
  const [issues, setIssues] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    const targetElem: HTMLElement = event.target as HTMLElement;
    if(!targetElem.classList.contains('preview')) {
      navigate(`/detail/${params.row.issueGuid}`);
    }
  };

  const fetchIssues = async () => {
    setLoading(true);
    const fetchedIssues: IIssue[] = await getIssues();
    setIssues(fetchedIssues);
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div style={{}}>
      <h3>Issues List</h3>
      <DataGrid
        onRowClick={handleEvent}
        getRowId={(row) => row.issueGuid}
        loading={loading}
        rows={issues}
        columns={columns}
      />
    </div>
  );
}
