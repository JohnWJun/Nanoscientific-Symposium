import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Link from "components/Link/LinkWithSearch";
import usePageViews from "hooks/usePageViews";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import PhotoIcon from "@mui/icons-material/Photo";
import SettingsIcon from "@mui/icons-material/Settings";
import useCurrentYear from "hooks/useCurrentYear";
import { adminRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";

const drawerWidth = 240;

const AdminNavBar = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const currentYear = useCurrentYear();
  const menus = [
    {
      title: "Programs",
      link: `/${pathname}/${currentYear}/admin/program`,
      icon: <EventNoteTwoToneIcon />,
      adminOnly: false,
    },
    {
      title: "Speakers",
      link: `/${pathname}/${currentYear}/admin/speakers`,
      icon: <CampaignTwoToneIcon />,
      adminOnly: false,
    },
    {
      title: "Posters",
      link: `/${pathname}/${currentYear}/admin/poster`,
      icon: <PhotoIcon />,
      adminOnly: false,
    },
    {
      title: "Users",
      link: `/${pathname}/${currentYear}/admin/users`,
      icon: <PeopleAltTwoToneIcon />,
      adminOnly: false,
    },
    {
      title: "Menus",
      link: `/${pathname}/${currentYear}/admin/menus`,
      icon: <MenuIcon />,
      adminOnly: false,
    },
    {
      title: "Configuration",
      link: `/${pathname}/${currentYear}/admin/config`,
      icon: <SettingsIcon />,
      adminOnly: false,
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          a: {
            p: 0,
            display: "block",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menus &&
          menus.map((menu) => {
            if (menu.adminOnly && !adminRole.includes(authState.role)) {
              return false;
            }
            return (
              <Link to={menu.link} key={menu.link}>
                <ListItem button>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItem>
              </Link>
            );
          })}
      </List>
      <Divider />
      <List>
        <Link to={`/${pathname}/${currentYear}`}>
          <ListItem button>
            <ListItemIcon>
              <LogoutTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Site" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default AdminNavBar;
