import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material";
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { DataGrid, GridCheckIcon } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import {
  deleteUser,
  getAllUsers,
  updateUserProfile,
  userRegister,
} from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  accepteDemande,
  getAllDemande,
  refuseDemande,
} from "../../../actions/demandeAction";
import { Check } from "@mui/icons-material";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { _id: id, name: "", email: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer
      m="20px"
      //display="flex"
      // justifyContent="space-between"
      //  alignItems="center"
    >
      <Header title="Manage leave" subtitle="Managing the leave application" />
      <div
        style={{
          flex: "3",
          textAlign: "right",
        }}
      ></div>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const demandeAll = useSelector((state) => state.adminListDemande);
  const { loading, error, demandes } = demandeAll;

  const adminAccepteDemande = useSelector((state) => state.adminAccepteDemande);
  const { loading: loadingAccept, error: errorAccept } = adminAccepteDemande;

  const adminRefuseDemande = useSelector((state) => state.adminRefuseDemande);
  const { loading: loadingRefuse, error: errorRefuse } = adminRefuseDemande;

  useEffect(() => {
    dispatch(getAllDemande());
  }, [dispatch]);

  const [rows, setRows] = React.useState(demandes);

  useEffect(() => {
    console.log(demandeAll);
    setRows(demandes);
  }, [demandes]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRefuseClick = (id) => () => {
    dispatch(refuseDemande(id));
  };

  const handleAcceptClick = (id) => () => {
    dispatch(accepteDemande(id));
  };

  const processRowUpdate = (newRow) => {
    if (newRow.isNew) {
      dispatch(
        userRegister(
          newRow.name,
          newRow.email,
          "conge2024",
          newRow.gender,
          newRow.isAdmin == "False" ? false : true,
          newRow.workingWeek
        )
      );
    } else {
      dispatch(
        updateUserProfile(
          {
            name: newRow.name,
            isAdmin: newRow.isAdmin == "False" ? false : true,
            email: newRow.email,
            workingWeek: newRow.workingWeek,
            gender: newRow.gender,
          },
          newRow._id,
          "admin"
        )
      );
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "user",
      cellClassName: "name-column--cell",
      headerName: "Name",
      editable: false,
      flex: 1,
      valueGetter: (params) => {
        return params.row.user.name;
      },
    },
    {
      field: "type",
      cellClassName: "name-column--cell",
      headerName: "Type",
      editable: false,
      flex: 1,
    },
    {
      field: "nbr_jour",
      headerName: "Nombre de jour",
      width: 180,
      headerAlign: "left",
      align: "left",
      editable: false,
    },
    // {
    //   field: "workingWeek",
    //   headerName: "working Week",
    //   flex: 1,
    //   editable: true,
    // },
    // {
    //   field: "isAdmin",
    //   headerName: "isAdmin",
    //   flex: 1,
    //   editable: true,
    // },
    {
      field: "actions",
      type: "actions",
      sortable: true,
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      valueGetter: (params) => params.row.status.length,
      getActions: (row) => {
        if (row.row.status === "en progress") {
          return [
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Accepte"
              className="textPrimary"
              onClick={handleAcceptClick(row.row._id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<ClearIcon />}
              label="Refuse"
              onClick={handleRefuseClick(row.row._id)}
              color="inherit"
            />,
          ];
        } else if (row.row.status === "accepted") {
          return [
            <Button variant="outlined" color="success">
              Accepted
            </Button>,
          ];
        } else {
          return [
            <Button variant="outlined" color="error">
              {" "}
              Refused
            </Button>,
          ];
        }
      },
    },
  ];

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        checkboxSelection
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
