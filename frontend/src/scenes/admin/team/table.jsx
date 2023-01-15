import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { DataGrid } from "@mui/x-data-grid";
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <div
        style={{
          flex: "3",
          textAlign: "right",
        }}
      >
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleClick}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const userAll = useSelector((state) => state.userAll);
  const { loading, error, users } = userAll;

  const userReg = useSelector((state) => state.userRegister);
  const { loading: loadingRegister, error: errorRegister } = userReg;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [rows, setRows] = React.useState(users);

  useEffect(() => {
    setRows(users);
  }, [users]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  // const [data, setData] = React.useState({
  //   id: "",
  //   name: "",
  //   age: "",
  //   phoneNumer: "",
  //   email: "",
  // });

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const row = rows.find((row) => (row._id === id ? row : ""));
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteUser(id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log(newRow);
    console.log("tttt");
    if (newRow.isNew) {
      dispatch(
        userRegister(
          newRow.name,
          newRow.email,
          "conge2024",
          newRow.gender,
          newRow.isAdmin,
          newRow.workingWeek
        )
      );
    } else {
      console.log(newRow.isAdmin);
      dispatch(
        updateUserProfile(
          {
            name: newRow.name,
            isAdmin: newRow.isAdmin,
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
      field: "name",
      cellClassName: "name-column--cell",
      headerName: "Name",
      editable: true,
      flex: 1,
    },
    {
      field: "gender",
      cellClassName: "name-column--cell",
      headerName: "Gender",
      editable: true,
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      headerAlign: "left",
      align: "left",
      editable: true,
    },
    {
      field: "workingWeek",
      headerName: "working Week",
      flex: 1,
      editable: true,
    },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
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
