import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

 
const useStyles = makeStyles((theme) => ({
    first: {
        marginBottom: "47px",
        marginTop: "38px"
      
    },
    id:{float:"left"},
    finalbtn:{
        marginTop: "18px"
    },
    hdnspn:{padding:"36px"},
    otherBtn :{
        marginTop: '6px',
    
    },
    middle:{display: "none"},
    middleshow:{display: "show"},
    space:{padding:"8px"},
    root: {
      
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        marginLeft:"30%",
        
      },
 
    },
    isclicked:{
       backgroundColor:"#d3d3d32e"
    },
    isntclicked:{
      backgroundColor:"none"
    }
  }));




const User=(props)=>{

    const classes=useStyles();
     
    const[name,getname]=useState("")
    const[id,getid]=useState("")
    const[email,getemail]=useState("")
    const[street,getstreet]=useState("")
    const[city,getcity]=useState("")
    const[zip,getzip]=useState("")

    const [show,showother]=useState(false)
    const [clicked,getclicked]=useState(false)

    useEffect(()=>{
        getid(props.myuser.id);
        getname(props.myuser.name);
        getemail(props.myuser.email);
        getstreet(props.myuser.street)
        getcity(props.myuser.city);
        getzip(props.myuser.zipcode)


    },[])
   const showfunc=()=>{
      showother(!show)
    }

    const clck=()=>{
      props.get_id_for_tasks(id)
      getclicked(!clicked)
    }

    const updateUser=()=>{
      let obj={}; obj.id=id; obj.name = name; obj.email=email; obj.city =city; obj.zipcode =zip; obj.street =street;
      props.get_update_user(obj)
    }

    const deleteUser=()=>{
     // console.log("the id of the user is==>",id)
      props.delete_user(id)
    }

    return(
            <form className={clicked? classes.isclicked : classes.isntclicked }  noValidate autoComplete="off" onClick={clck}>       
                 <div className={classes.first}>
    <h3 className={classes.id}>Id: {id}</h3>
<TextField className={classes.mdlbtn} label="Name" value={name} onChange={(e)=>getname(e.target.value)} /><br/><br/><br/>
  <span className={classes.space}></span>
  <TextField label="Email" value={email} onChange={(e)=>getemail(e.target.value)}/>
  </div>
  <Button className={classes.otherBtn}   variant="outlined"  color="secondary" onClick={showfunc}  > Other Data </Button>

  
        <div className={show?classes.middleshow:classes.middle}>
      <TextField  label="Street" value={street} onChange={(e)=>getstreet(e.target.value)} /><span className={classes.space}></span>
  <TextField className={classes.mdlbtn}  label="City" value={city} onChange={(e)=>getcity(e.target.value)} /><span className={classes.space}></span>
  <TextField label="Zip Code" value={zip} onChange={(e)=>getzip(e.target.value)} />
       </div>

       <div className={classes.finalbtn}>
  <Button   variant="contained"  color="primary" onClick={updateUser}>  Update</Button> 
  <span className={classes.hdnspn}></span>
<Button   variant="contained"  color="primary" onClick={deleteUser}> Delete</Button>
</div>
 
</form>
    )
}

export default User