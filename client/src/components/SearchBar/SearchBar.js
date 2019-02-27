import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Grid from '../Grid/Grid';




const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 40
  },
  textField: {
    width: 500,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: "auto",
    display: 'block',
    marginTop: 50
  },
  snackbar: {
    margin: "auto",
    marginTop: 150
  },
});



class SearchBar extends React.Component {

  state = {
    value: '',
    products: null,
    progressBar: false,
    error: false,
    
  }


  formHandler = (event)=>{
    event.preventDefault()
    this.setState({progressBar: true, error: false})
    let data = this.state.value;
    axios.post('http://www.kimatmilao.com/data', {data})
      .then(res =>{
        this.setState({products: res.data, progressBar: false })
      })
      .catch(e => {
        this.setState({progressBar: false, error: true})
        console.log(e);
      })
  }

  inputHandler = (event)=>{
    let value = event.target.value;
    this.setState({value})
  }


  render() {
    const { classes } = this.props;
    let Loading = null;
    let grid = null;
    let snack = null;
    const action = (
      <Button onClick={this.formHandler} color="secondary" size="small">
        Retry
      </Button>
    );
    
    if(this.state.error){
      snack = <SnackbarContent className={classes.snackbar} message="Network error" action={action} />
    }
    if(this.state.progressBar){
      Loading = 
      (<CircularProgress 
         size={100} 
         className={classes.progress} />)
     
    } else {
      grid = (
        <div>
          <Grid data={this.state.products} />
        </div>
      );
    }
    return (
      <div style={{paddingTop: 5}}>
      <form onSubmit={(e)=> this.formHandler(e)} noValidate autoComplete="off">
       <div className={classes.container}>
        <TextField
          id="outlined-name"
          label="Search products"
          className={classes.textField}
          onChange={(event)=>this.inputHandler(event)}
          value={this.state.value}
          margin="normal"
          variant="outlined"
        />
      </div>
     <div style={{paddingTop:5}} className={classes.container}>
          <Button type="submit" variant="contained" size="medium" color="primary" className={classes.margin} >
            Search
          </Button>
      </div>
      </form>
      {snack}
      {this.state.products ? grid : null}
      {Loading}
      
    </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);