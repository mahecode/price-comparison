import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AndroidIcon from '@material-ui/icons/AndroidRounded';

import SideDrawer from '../SideDrawer/SideDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  const handleChange = ()=>{
    window.open("https://drive.google.com/open?id=1SumE5dozm9vY3rcXShXkqmM7IKPd_MEi", '_blank');
  }
  return (
    <div className={classes.root}>
      <AppBar 
      position="fixed">
        <Toolbar>
          <SideDrawer />
          <Typography variant="h4" color="inherit" className={classes.grow}>
            Kimatmilao
          </Typography>
          <IconButton onClick={handleChange} className={classes.menuButton} color="inherit" aria-label="Menu">
            <AndroidIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar); 