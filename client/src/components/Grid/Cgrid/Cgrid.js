import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
});

function MediaControlCard(props) {
  const { classes } = props;
  let onComingData = props.data[0];
  let amazonData = props.data[1];
  let flipkartGrid = null;
  let paytmGrid = null;
  let amazonGrid = null;
  try{
    flipkartGrid = onComingData.flipkart.map((element, key)=>{
      let handleChange = ()=>{
        window.open(element.link, '_blank');
      }
      return (<Card style={{marginBottom: 20}} key={key} className={classes.card}>
      <div className={classes.details} onClick={handleChange}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
           {element.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
           {element.price}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={element.imgSrc}
      />
    </Card>
    )})
   paytmGrid = onComingData.paytm.map( (element, key)=>{
      let handleChange = ()=>{
        window.open(element.link, '_blank');
      }
      return (<Card style={{marginBottom: 20}} key={key} className={classes.card}>
      <div className={classes.details} onClick={handleChange}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
           {element.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          {element.cashback}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          ₹{element.price}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={element.imgSrc}
      />
    </Card>
    )})
    amazonGrid = amazonData.map((element, key)=>{
    let handleChange = ()=>{
      window.open(element.link, '_blank');
    }
    return (<Card style={{marginBottom: 20}} key={key} className={classes.card}>
    <div className={classes.details} onClick={handleChange}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
         {element.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
        ₹{element.price}
        </Typography>
      </CardContent>
    </div>
    <CardMedia
      className={classes.cover}
      image={element.imageSrc}
    />
  </Card>
  )})
  } catch(err){
    console.log(err);
  }
  return (
    <div style={{padding: 20}}>
      <Typography style={{padding: 30}} align="center" variant="h3">Amazon</Typography>
      {amazonGrid}
      <Typography style={{padding: 30}} align="center" variant="h3">Flipkart</Typography>
      {flipkartGrid}
      <Typography style={{padding: 30}} align="center" variant="h3">Paytm</Typography>
      {paytmGrid}
    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);