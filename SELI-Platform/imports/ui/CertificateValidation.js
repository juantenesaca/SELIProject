import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:'12px',
    paddingRight:'12px',
    marginLeft:'auto',
    marginRight:'auto',
    maxWidth:'85rem',
    marginTop:'100px'
   
  },
  target:{
    backgroundColor:'#CADDF7'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer:{
    marginTop:'30px',

  }
}));

export default function CenteredGrid(props) {
  console.log("En mostrar certificado", props, props.match.params.id)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [id, setId]=useState(props.match.params.id);
  const [studentData, setStudentData]=useState(props.history.location.state.infoStudent);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  return (
    <div className={classes.root}>
      <h1>Smart Ecosystem for Learning and Inclusion</h1>
      <p>Course Certificate</p>
      <p>{studentData.course}</p>

      <Grid container spacing={1}>
        <Grid item xs={4}>
        <Card className={classes.target}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                C
              </Avatar>
            }
            
            title={studentData.name}
            subheader={(new Date()).toString()}
          />
          
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
            Completed by: {studentData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {studentData.date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {studentData.name} 's account is verified. 
            SELI: Smart Ecosystem for Learning and Inclusion certifies their successful completion of {studentData.course} course.
            </Typography>
          </CardContent>
         
          
        </Card>
        </Grid>
        <Grid item xs={8}>
          <iframe src={"https://201.159.223.92/vows/"+id} height="500px" width="100%" title="Iframe Example"></iframe>
        </Grid>
      </Grid>

      <footer className={classes.footer}>
        <p>Copyright &copy; 2020 SELI Team.</p>
      </footer>


     
    </div>
  );
}
