import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactMailIcon from '@material-ui/icons/ContactMail';
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
    name: "Inbox",
    icon: <InboxIcon />,
  },
  {
    name: "Inbox",
    icon: <InboxIcon />,
  },
  {
    name: "Inbox",
    icon: <InboxIcon />,
  },
  {
    name: "Inbox",
    icon: <InboxIcon />,
  },
];
export default function Menu() {
  return (
    <div>
      <List>
        {menus1.map((menu, index) => (
          <Link to={menu.to} key={index}>
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
