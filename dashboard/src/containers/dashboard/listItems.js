import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RoomIcon from '@material-ui/icons/Room';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    
    <ListItem button>
      <Link href="/" variant="body2">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      </Link>
      <ListItemText primary="Dashboard" />
    </ListItem>

    
    <ListItem button>
    <Link href="/country/" variant="body2">
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
    </Link>
      <ListItemText primary="By Country" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);