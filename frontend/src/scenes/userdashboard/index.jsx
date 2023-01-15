import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect } from "react";
import { getAllUsers } from "../../actions/userActions";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import StatBox from "../../components/StatBox";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDemande, getDemandeStats } from "../../actions/demandeAction";
import PieChart from "../../components/PieChart";
const UserDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const userStats = useSelector((state) => state.userStats);
  const { stats } = userStats;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getDemandeStats());
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
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats && stats.RTT}
            subtitle="RTT"
            progress="0.30"
            increase="From 15"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 1 */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats && stats.Paid}
            subtitle="Paid"
            progress="0.50"
            increase="From 30"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {userInfo && userInfo.gender == "Female" ? (
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={stats && stats.Maternity}
              subtitle="Maternity"
              progress="0.80"
              increase="from 60"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        ) : (
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={stats && stats.Paternity}
              subtitle="Paternity"
              progress="0.80"
              increase="from 3"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        )}
      </Box>
      {/* ROW 3 */}
    </Box>
  );
};

export default UserDashboard;
