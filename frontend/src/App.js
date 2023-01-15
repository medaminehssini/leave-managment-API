import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Team from "./scenes/admin/team";
import Conge from "./scenes/admin/conge";
import SignInPage from "./scenes/auth/LoginPage";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import UserDashboard from "./scenes/userdashboard";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    //console.log(location.pathname);
    if (userInfo != null && location.pathname === "/login") {
      navigate("/");
    } else if (userInfo == null) {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <>
      {userInfo == null ? (
        <Routes>
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      ) : (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Protected nextPage={true}>
                        {userInfo.isAdmin === true ? (
                          <Dashboard />
                        ) : (
                          <UserDashboard />
                        )}
                      </Protected>
                    }
                  />
                  <Route
                    path="/team"
                    element={
                      <Protected nextPage={true} role={"admin"}>
                        <Team />
                      </Protected>
                    }
                  />
                  <Route
                    path="/form"
                    element={
                      <Protected nextPage={true}>
                        <Form />
                      </Protected>
                    }
                  />

                  <Route
                    path="/conge"
                    element={
                      <Protected nextPage={true} role={"admin"}>
                        <Conge />
                      </Protected>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <Protected nextPage={true} role={"user"}>
                        <Calendar />
                      </Protected>
                    }
                  />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

export default App;
