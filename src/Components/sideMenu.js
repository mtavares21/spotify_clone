import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentHome from "@mui/icons-material/Home";
import ContentSearch from "@mui/icons-material/Search";
import ContentLiked from "@mui/icons-material/Favorite";
import Cloud from "@mui/icons-material/Cloud";

export default function SideMenu({setMenuItem}) {
  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: "100%",
        backgroundColor: "black",
        color: "white",
        padding: "0px",
        fontWeight: "bold",
      }}
    >
      <MenuList>
        <MenuItem onClick={ ()=> setMenuItem(() => 'home')}>
          <ListItemIcon>
            <ContentHome sx={{ color: "white" }} fontSize="small" />
          </ListItemIcon>
          <Typography fontWeight="bold" >
            Home
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => setMenuItem(() => 'search')} >
          <ListItemIcon>
            <ContentSearch sx={{ color: "white" }} fontSize="small" />
          </ListItemIcon>
          <Typography fontWeight="bold" >
            Search
          </Typography>
        </MenuItem>
        <MenuItem onClick={() =>setMenuItem(() => 'liked_songs')}>
          <ListItemIcon>
            <ContentLiked sx={{ color: "white" }} fontSize="small" />
          </ListItemIcon>
          <Typography fontWeight="bold" >
            Liked Songs
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
