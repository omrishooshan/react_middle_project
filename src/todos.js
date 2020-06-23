import React, { useEffect, useState } from "react";
import utils from "./utils/todosUtils";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Task from "./task";
import { makeStyles } from "@material-ui/core/styles";
import "./css/scrolers.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  add: {
    marginLeft: "47.7%",
    marginTop: "9px",
    position: "fixed",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "150px",
    width: "600px",
    marginTop: "10px",
  },
  gg: {
    height: "343px",
  },
  t: {
    marginTop: "-24px",
    fontWeight: "500",
    position: "absolute",
    backgroundColor: "orange",
    width: "112%",
    zIndex: "11",
    left: "-6%",
    textAlign: "center",
  },

  popup: {
    width: "291px",
    height: "323px",
    zIndex: "99",
    marginTop: "116px",
    marginLeft: "-18.5%",
    position: "fixed",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    backgroundColor: "white",
  },

  popupHide: {
    display: "none",
  },
  newpos: {
    marginTop: "31px",

    marginLeft: "65px",
  },
  footer: {
    marginLeft: "81px",
    marginTop: "38px",
  },
  font: {
    fontSize: "1.3em",
    fontweight: "700",
  },
  posttodobutton: {
    left: "114%",
  },
}));

export default function Todos(props) {
  const [tasks, gettasks] = useState([]);
  const [tasksid, gettasksid] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    gettasksid(props.userid);
    utils.getTasks().then((x) => {
      gettasks(x.data);
    });
  }, [props.userid]);

  const markCompleted = (specificTaskId) => {
    let changeSpecificTaskArr = [...tasks]; ///very importent!!!

    changeSpecificTaskArr.forEach((x) => {
      if (x.id == specificTaskId) {
        x.completed = true;
      }
    });

    gettasks(changeSpecificTaskArr);
  };
  const [ispopupopen, changepopup] = useState(false);
  const [title, getNewTitle] = useState([""]);
  const addNewTodo = () => {
    let maxValue = 0;
    let values = [...tasks];
    values.forEach((x) => {
      if (x.id > maxValue) {
        maxValue = x.id;
      }
    });
    let obj = {};
    obj.id = maxValue + 1;
    obj.title = title;
    obj.userId = tasksid;
    obj.completed = false;

    console.log([obj]);

    gettasks(tasks.concat(obj));
    changepopup(false);
  };

  return (
    <div className={classes.root}>
      <div className={!ispopupopen ? classes.popupHide : classes.popup}>
        <div className={classes.header}>
          <AddCircleOutlineIcon className={classes.person} />
          <span className={classes.font}>Add New Todo</span>
        </div>
        <div className={classes.popupaBody}>
          <TextField
            className={classes.newpos}
            onChange={(e) => getNewTitle(e.target.value)}
            label="title:"
            color="primary"
          />
        </div>
        <div className={classes.footer}>
          <Button variant="contained" color="secondary" onClick={addNewTodo}>
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
      <Button
        onClick={() => changepopup(true)}
        size="small"
        className={classes.posttodobutton}
        variant="contained"
        color="secondary"
      >
        {" "}
        Add Todo
      </Button>

      <div className={classes.t}>TASKS</div>

      <Grid container spacing={6} className={classes.gg}>
        <div className="right">
          {tasks
            .filter((x) => x.userId == tasksid)
            .map((x, index) => {
              return (
                <Paper key={index} elevation={3} className="tasks">
                  <Task
                    key={index}
                    mrkComplete={(specificTaskId) =>
                      markCompleted(specificTaskId)
                    }
                    mytasks={x}
                  />
                </Paper>
              );
            })}
        </div>
      </Grid>
    </div>
  );
}
