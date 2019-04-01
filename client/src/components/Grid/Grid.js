import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withWidth from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card' ;
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Cgrid from './Cgrid/Cgrid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 120
  },
  paper: {
    height: 250,
    width: 200,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: "auto",
    maxHeight: 150,
    width: "auto",
    maxWidth: 150,
    margin: "auto",
  },
});

const GuttersGrid = (props) => {
    const { classes } = props;
    let onComingData = props.data[0];
    let amazonData = props.data[1];
    let flipkartGrid = null;
    let paytmGrid = null;
    let amazonGrid = null;

    try {
        if(props.width === 'xs'){
            flipkartGrid = <Cgrid data={props.data} />
        }else{
            flipkartGrid = (<Grid container className={classes.root} spacing={24}>
                <Grid style={{paddingTop: 25}} item xs={12}>
                <Grid container className={classes.demo} justify="center" spacing={24}>
                    {onComingData.flipkart.map((element,key) => {
                        let handleChange = ()=>{
                            window.open(element.link, '_blank');
                        }
                        return (
                        <Grid key={key} item>
                            <div onClick={handleChange}>
                                <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia component="img" image={element.imgSrc} className={classes.media} />
                                        <CardContent>
                                            <Typography variant="h5" component="h5">
                                                {element.name}
                                            </Typography>
                                            <Typography component="h4">{element.price}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Paper>
                            </div>
                        </Grid>
                    )})}
                </Grid>
                </Grid>
             </Grid>)

          paytmGrid = (<Grid container className={classes.root} spacing={24}>
              <Grid style={{paddingTop: 25}} item xs={12}>
              <Grid container className={classes.demo} justify="center" spacing={24}>
                  {onComingData.paytm.map((element,key) => {
                      let handleChange = ()=>{
                          window.open(element.link, '_blank')
                      }
                      return (<Grid key={key} item>
                        <div onClick={handleChange}>
                          <Paper className={classes.paper}>
                              <Card className={classes.card}>
                                  <CardActionArea>
                                      <CardMedia component="img" image={element.imgSrc} className={classes.media} />
                                      <CardContent>
                                          <Typography paragraph={true} gutterBottom variant="h5" component="h2">
                                              {element.name}
                                          </Typography>
                                          <Typography component="h4">{element.cashback}</Typography>
                                          <Typography component="h4">₹{element.price}</Typography>
                                      </CardContent>
                                  </CardActionArea>
                              </Card>
                          </Paper>
                          </div>
                      </Grid>
                  )})}
              </Grid>
              </Grid>
           </Grid>)

        amazonGrid = (<Grid container className={classes.root} spacing={24}>
            <Grid style={{paddingTop: 25}} item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={24}>
                {amazonData.map((element,key) => {
                    let handleChange = ()=>{
                        window.open(element.link, '_blank');
                    }
                    return (
                    <Grid key={key} item>
                        <div onClick={handleChange}>
                            <Paper className={classes.paper}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia component="img" image={element.imageSrc} className={classes.media} />
                                    <CardContent>
                                        <Typography variant="h5" component="h5">
                                            {element.name}
                                        </Typography>
                                        <Typography component="h4">₹{element.price}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                        </div>
                    </Grid>
                )})}
            </Grid>
            </Grid>
         </Grid>)
        }
    } catch (error) {
        console.log(error);
    }
    return (
    <div>
      {props.width !== 'xs' ? <Typography style={{padding : 30}} variant="h3" align="center">Amazon</Typography> : null}
      {amazonGrid}
      {props.width !== 'xs' ? <Typography style={{padding : 30}}  variant="h3" align="center">Flipkart</Typography> : null }
      {flipkartGrid}
      {props.width !== 'xs' ? <Typography style={{padding : 30}} variant="h3" align="center">Paytm</Typography> : null}
      {paytmGrid}
    </div>
    );
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(GuttersGrid));