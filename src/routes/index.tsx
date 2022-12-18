import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { DocumentsData } from "../pages/documentsData";

import { AppBar, Drawer, DrawerHeader, Main } from "../components/Sidebar";
const drawerWidth = 240;

export default function Index() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer drawerWidth={drawerWidth} open={open} setOpen={setOpen} />
      <Main open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Routes>
          <Route path={`/documents`} element={<DocumentsData />} />
          <Route path="*" element={<Navigate to="/documents" replace />} />
        </Routes>
      </Main>
    </Box>
  );
}
