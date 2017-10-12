import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getRootTasks, getTaskById } from '../modules';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet(theme => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  input: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: `${theme.spacing.unit * 2}px`,
  }
}));

const EditTask = ({task, classes, updateTask}) => {

  let summary;

  let saveTask = () => {
    updateTask({
      ...task,
      summary: summary.value
    });
  };

  return (

    <div>
      <Typography type="title" className={classes.title}>
        {task.summary}
      </Typography>
      <div>
        <TextField
          id="summary"
          label="Summary"
          className={classes.input}
          defaultValue={task.summary}
          inputRef={input => {
            summary = input;
          }}
          margin="normal"
        />
      </div>
      <Button raised className={classes.button} onClick={() => saveTask()}>
        Save
      </Button>
    </div>

  )

};

const mapStateToProps = (state, { match }) => ({
  task: getTaskById(state, match.params.taskId)
});

const mapDispatchToProps = dispatch => ({
  updateTask: (task) => {
    dispatch({type: 'UPDATE_TASK', task});
    dispatch(push('/'));
  }
});

export default withRouter(withStyles(styleSheet)(
  connect(mapStateToProps, mapDispatchToProps)(EditTask)
));