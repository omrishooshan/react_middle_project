
import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    inline:{
        display:"flex"
    },
    margin: {
        margin: theme.spacing(1),
      },
      true:{
          color:"green",         
    marginTop: "18px",
    marginLeft: "13px",
      },
      false:{
          color: "red",
    marginTop: "18px",
    marginLeft: "13px"
        
      },
      ttl:{
        marginLeft: "11px",
        marginTop: "18px"
      }
    
}))

const Task=(props)=>{

    const classes=useStyles();
     

    const markCompleted=()=>{
        props.mrkComplete(props.mytasks.id)
       }
       

    return(
      <div >
               <div className={classes.inline}><p>Title:</p><h5 className={classes.ttl}>{props.mytasks.title}</h5><br/></div>
               <div className={classes.inline}><p>Completed:</p><h5 className={props.mytasks.completed? classes.true : classes.false}>{props.mytasks.completed.toString()}</h5>
               <Button size="small" className={classes.margin}    color="secondary" onClick={markCompleted}> Mark As Completed</Button> </div>
          </div>
    )
}

export default Task