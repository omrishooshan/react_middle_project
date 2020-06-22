
import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    one:{
        //display:"flex"
       
    },
    two:{
        //display:"flex"
   
    },
    margin: {
        height:"37px"
      },

}))

const clk=()=>{
 
}

const Post=(props)=>{

    const classes=useStyles();
     


    return(
      <div className={classes.pp} >
         
               <div className={classes.one}><p>Title:</p><h5>{props.myposts.title}</h5><br/></div>
               <div className={classes.two}><p>Body:</p><h5>{props.myposts.body.toString()}</h5>
                </div>
          </div>
    )
}

export default Post