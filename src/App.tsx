import logo from "./logo.svg";
import "./App.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./components/copyright";

import {
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./components/authProvider";
import AuthRequired from "./components/authRequired"
import Layout from "./components/layout"
import PublicPage from "./pages/public"
import ListPage from "./pages/list"
import DetailPage from "./pages/detail"
import LoginPage from "./pages/loginOld"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<PublicPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/list"
                element={
                  <AuthRequired>
                    <ListPage />
                  </AuthRequired>
                }
              />
              <Route
                path="detail/:issueId"
                element={
                  <AuthRequired>
                    <DetailPage />
                  </AuthRequired>
                }
              />
            </Route>
          </Routes>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
