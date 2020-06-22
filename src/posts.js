import React,{useEffect,useState} from 'react'
import utils from './utils/postsUtils'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Post from './post'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './css/scrolers.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
     // marginTop:"18px"
    //   height: '404px',
    //   marginBottom: '72px',
    //   border: '1px solid gray',
    //   position: 'fixed',
    marginTop: "-24px"
    },
    add:{
      marginLeft: "47.7%",
    marginTop: "9px",
      position:"fixed",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'150px',
      width:'600px',
      marginTop:"10px"
    },
    p:{
      marginTop: "-24px",
        fontWeight: "500",
        position: "absolute",
        backgroundColor: "orange",
           width: "112%",
    zIndex: "11",
    left: "-6%",
    textAlign:"center"
      
  },
  postbutton:{
  
  left:"114%"
  },
  popup:{
    width:"381px",
    height:"323px",
    zIndex:"99",
    marginTop: "-152px",
    marginLeft: '-18.5%',
    position: 'fixed',
    boxShadow:'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    backgroundColor:'white',
    
  },

  popupHide:{
    display:"none"
  },
  newpos:{
    marginTop:"31px",
   
  marginLeft: "65px"
  },
  footer:{
    marginLeft: "81px",
    marginTop: "38px",
  },
  font:{
    fontSize: "1.3em",
    fontweight: "700"
  },
  }));


export default function Posts(props){

  const [posts,getposts]=useState([])
  const [postid,getpostid]=useState(0)


  const classes = useStyles();



const[ispopupopen,changepopup]=useState(false)
const [title,getNewTitle]=useState([""])
const [body,getNewBody]=useState([""])
const addNewPost=()=>{
   let maxValue=0
   let values=[...posts]
   values.forEach(x=>{
     if(x.id > maxValue){
       maxValue = x.id
     }
   })
   let obj={}; obj.id=maxValue+1; obj.title = title; obj.body=body; obj.userId =postid; 

console.log([obj])
   
   getposts(posts.concat(obj))
    changepopup(false)
}
    useEffect(()=>{

    getpostid(props.userid)
        utils.getPosts().then(x=>{
          getposts(x.data);
         
        } )
        
    },[props.userid])

        return(
            <div className={classes.root}>
                                        <div className={ !ispopupopen ? classes.popupHide :classes.popup }>
                                  <div className={classes.header}>
                                  <AddCircleOutlineIcon className={classes.person}/>
                                  <span className={classes.font}>Add New Post</span>
                                  </div>
                                  <div className={classes.popupaBody}>
                                  <TextField className={classes.newpos} onChange={e=>getNewTitle(e.target.value)} label="title:" color="primary" />
                                  <TextField className={classes.newpos} onChange={e=>getNewBody(e.target.value)} label="body:" color="primary" />
                                    </div>
                                    <div className={classes.footer}>
                                    <Button  variant="contained"  color="secondary" onClick={addNewPost} > Add </Button> 
                                    <Button  variant="contained" onClick={()=>changepopup(false)}  color="secondary" > Cancel</Button> 
                                    </div>
                          </div>
                  <Button onClick={()=>changepopup(true)}  size="small" className={classes.postbutton}  variant="contained"  color="secondary"> Add Post</Button>
                  <div className={classes.p}>POSTS</div>
                       
                    <Grid container spacing={6} className={classes.root} >
                               <div className="right"> 
                    {  
                      posts.filter(x=>x.userId == postid).map((x,index)=>{
                             
                             
                             return    <Paper key={index} elevation={3} className="posts" > 
                                 <Post key={index} myposts={x}/>
                                 </Paper>
                                 
                                 
                        })}
                                </div>
                    </Grid>
            
            </div>
        )
}