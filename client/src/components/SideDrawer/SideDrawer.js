import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AndroidIcon from '@material-ui/icons/AndroidRounded';
import Contact from '@material-ui/icons/ContactMail';
import Divider from '@material-ui/core/Divider';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    const handleChange = ()=>{
      window.open("https://drive.google.com/open?id=1SumE5dozm9vY3rcXShXkqmM7IKPd_MEi", '_blank');
    }

    const handleFacebook = ()=>{
      window.open("https://www.facebook.com/profile.php?id=100022540995674");
    }

    const handleInstagram = ()=>{
      window.open("https://www.instagram.com/immahem/");
    }
   
    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <div className={classes.list}>
        <List>
        <ListItem button onClick={handleChange} key="Android App">
              <ListItemIcon><AndroidIcon /></ListItemIcon>
              <ListItemText primary="Android App" />
          </ListItem>
          <ListItem button key="Contact us">
              <ListItemIcon><Contact /></ListItemIcon>
              <ListItemText primary="Contact us" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleFacebook} key="Facebook">
            <ListItemText primary="Facebook" />
          </ListItem>
          <ListItem button onClick={handleInstagram} key="Instagram">
            <ListItemText primary="Instagram" />
          </ListItem>
        </List>
      </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);