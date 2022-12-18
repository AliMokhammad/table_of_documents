import React, { useMemo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tabs from "./Tabs";

interface SidebarDrawerProps {
  drawerWidth: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SidebarDrawer = ({ drawerWidth, open, setOpen }: SidebarDrawerProps) => {
  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const TabsList = useMemo(
    () =>
      Tabs.map((tab, idx) => (
        <>
          <ListItem key={idx} component={Link} to={tab.link}>
            <ListItemButton>
              <ListItemIcon>
                <tab.icon />
              </ListItemIcon>
              <ListItemText primary={tab.name} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      )),
    []
  );
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>{TabsList}</List>
    </Drawer>
  );
};

export default SidebarDrawer;
