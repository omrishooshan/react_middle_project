import React, { useEffect, useState, useCallback } from "react";
import utils from "./utils/usersUtils";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import User from "./user";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import "./main.css";
import Todos from "./todos";
import Posts from "./posts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./css/scrolers.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  add: {
    height: "64px",
    marginLeft: "91.7%",
    marginTop: "0px",
    position: "fixed",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "400px",
    width: "600px",
    marginRight: "20px",
    margin: "6px",
  },
  srch: {
    marginLeft: "33%",
    position: "fixed",
  },
  srcicon: {
    position: "fixed",
    marginLeft: "44%",
    color: "orange",
    opacity: "0.3",
    marginTop: "17px",
  },
  popup: {
    width: "323px",
    height: "323px",

    marginTop: "106px",
    marginLeft: "27.5%",
    position: "fixed",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    backgroundColor: "white",
    zIndex: "1",
  },
  popupHide: {
    display: "none",
  },
  header: {
    marginLeft: "22%",
    marginTop: "23px",
  },
  person: {
    color: "WHITE",
    border: "1px solid",
    borderRadius: "50%",
    boxShadow: "0px 0px 5px",
    marginRight: "17px",
    marginBottom: "-6px",
    backgroundColor: "#083948",
  },
  font: {
    fontSize: "1.3em",
    fontweight: "700",
  },
  newUS: {
    marginTop: "31px",

    marginLeft: "65px",
  },
  footer: {
    marginLeft: "81px",
    marginTop: "38px",
  },
  fixed: {
    height: "404px",
    marginBottom: "72px",
    marginTop: "-21px",
    position: "fixed",
    left: "60%",
  },
}));

export default function Users(props) {
  const [users, getusers] = useState([]);
  const [myclickedcuserid, get_clicked_userid] = useState(0);
  const classes = useStyles();
  const [typedLetter, getLetter] = useState("");
  const [ispopupopen, changepopup] = useState(false);
  const [name, getNewName] = useState([""]);
  const [email, getNewMail] = useState([""]);

  const addNewUser = () => {
    let maxValue = 0;
    let values = users;
    values.forEach((x) => {
      if (x.id > maxValue) {
        maxValue = x.id;
      }
    });
    let obj = {};
    obj.id = maxValue + 1;
    obj.name = name;
    obj.email = email;
    obj.city = "";
    obj.zipcode = "";
    obj.street = "";

    //values.push(obj)
    getusers(users.concat(obj));
    changepopup(false);
  };

  useEffect((props) => {
    utils.getUsers().then((x) => {
      getusers(x);
    });
  }, []);

  const update = (obj) => {
    let values = users;
    values[obj.id] = obj;
    getusers(values);
    alert("upadet succsessfully");
  };

  const change_clicked_userid = (usid) => {
    console.log("change click");
    get_clicked_userid(usid);
  };

  const deleteus = (id) => {
    getusers(users.filter((c) => c.id !== id));
  };
  // const deleteus=async(id)=>{

  //   await console.log(users)
  //   await getusers([...users.filter((use)=>(use.id !== id))])
  //   await console.log("users==>",users)
  // }

  return (
    <div className="left">
      <AppBar>
        <Toolbar>
          {" "}
          <h3>Welcome To Users Programme</h3>
          <SearchIcon className={classes.srcicon} />
          <TextField
            className={classes.srch}
            id="outlined-basic"
            label="Search User"
            value={typedLetter}
            onChange={(e) => getLetter(e.target.value)}
            variant="outlined"
            color="secondary"
          />
          <Button
            className={classes.add}
            variant="contained"
            onClick={() => changepopup(true)}
            color="secondary"
          >
            {" "}
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <br /> <br />
      <div className={!ispopupopen ? classes.popupHide : classes.popup}>
        <div className={classes.header}>
          <PersonAddIcon className={classes.person} />
          <span className={classes.font}>Add New User</span>
        </div>
        <div className={classes.popupaBody}>
          <TextField
            className={classes.newUS}
            onChange={(e) => getNewName(e.target.value)}
            label="Name:"
            color="primary"
          />
          <TextField
            className={classes.newUS}
            onChange={(e) => getNewMail(e.target.value)}
            label="Email:"
            color="primary"
          />
        </div>
        <div className={classes.footer}>
          <Button variant="contained" color="secondary" onClick={addNewUser}>
            {" "}
            Add{" "}
          </Button>
          <Button
            variant="contained"
            onClick={() => changepopup(false)}
            color="secondary"
          >
            {" "}
            Cancel
          </Button>
        </div>
      </div>
      <div className="twolines">
        <Grid container spacing={6} className="left">
          {users
            .filter((us) => {
              return (
                us.name.toLowerCase().includes(typedLetter.toLowerCase()) ||
                us.email.toLowerCase().includes(typedLetter.toLowerCase())
              );
            })
            .map((x) => {
              /*console.log("user==>",x);*/
              return (
                <Grid key={x.id} item lg={8}>
                  <Paper elevation={3} className={classes.paper}>
                    <User
                      myuser={x}
                      get_id_for_tasks={(usid) => change_clicked_userid(usid)}
                      get_update_user={(us) => update(us)}
                      delete_user={(id) => deleteus(id)}
                    />
                  </Paper>
                </Grid>
              );
            })}
        </Grid>

        <div className={classes.fixed}>
          <Todos userid={myclickedcuserid} />

          <Posts userid={myclickedcuserid} />
        </div>
      </div>
    </div>
  );
}
