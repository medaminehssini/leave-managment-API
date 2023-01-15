import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  updateUserProfile,
  userRegister,
} from "../../actions/userActions";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChart from "../../components/BarChart";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  accepteDemande,
  getAllDemande,
  refuseDemande,
} from "../../actions/demandeAction";
import PieChart from "../../components/PieChart";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const userAll = useSelector((state) => state.userAll);
  const { loading, error, users } = userAll;
  console.log(users);

  const demandeAll = useSelector((state) => state.adminListDemande);
  const { loadingDemande, errorDemande, demandes } = demandeAll;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDemande());
  }, [dispatch]);

  let navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/conge");
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={users.length}
            subtitle="New Employee"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 1 */}

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              demandes.filter((demandes) => demandes.status === "en progress")
                .length
            }
            subtitle="Pending Request"
            progress="0.50"
            increase="+21%"
            icon={
              <PendingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              demandes.filter((demandes) => demandes.status === "accepted")
                .length
            }
            subtitle="Accepted Request"
            progress="0.80"
            increase="+43%"
            icon={
              <DoneOutlineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              demandes.filter((demandes) => demandes.status === "refused")
                .length
            }
            subtitle="Refused Request"
            progress="0.80"
            increase="+43%"
            icon={
              <CancelIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Pending Request
            </Typography>
          </Box>
          {demandes
            .filter((demande) => demande.status.includes("progress"))
            .map((demande, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {demande.user._id}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {demande.user.name}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}> {demande.type}</Box>

                <Box
                  gridColumn="span 4"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    color="secondary"
                    aria-label="add an alarm"
                    onClick={navigateHome}
                  >
                    <PendingIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            ))}
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            height="43vh"
            style={{
              marginTop: "-31px",
            }}
          >
            <PieChart />
          </Box>
        </Box>
      </Box>
      {/* ROW 3 */}
    </Box>
  );
};

export default Dashboard;
