import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link as LinkRouter } from "react-router-dom";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { Link } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const menus1 = [
  {
    name: "Products",
    icon: <DirectionsCarIcon />,
    to: "/products",
  },
  {
    name: "Order",
    icon: <AddShoppingCartIcon />,
    to: "/order",
  },
  {
    name: "News",
    icon: <MenuBookIcon />,
    to: "/news",
  },
  {
    name: "Contact",
    icon: <ContactMailIcon />,
    to: "/contact",
  },
];
const menus2 = [
  {
    name: "Settings",
    icon: <SettingsIcon />,
  },
  {
    name: "Log Out",
    icon: <ExitToAppIcon />,
    to: '/admin'
  },
];
export default function Menu() {
  return (
    <div>
      <List>
        {menus1.map((menu, index) => (
          <Link to={menu.to} key={index} component={LinkRouter}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {menus2.map((menu, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
