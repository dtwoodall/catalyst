import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import queryString from 'query-string';
import {getRootTasks, getTaskById, getNewTask, getChildTasksByParentId, getCategoryById} from '../modules';
import {fetchTaskById, updateTask as updateExistingTask, sendTask, createTask} from '../modules/tasks';
import {updateNewTask} from '../modules/newTask';
import AppHeader from './AppHeader';
import FlexBox from './FlexBox';
import InlineEdit from './InlineEdit';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet(theme => ({
  header: {
    height: '110px',
    justifyContent: 'flex-end' 
  },
  headerButton: {
    margin: '4px 4px 6px 4px'
  },
  title: {
    ...theme.typography.title,
    color: theme.palette.common.white,
    margin: `${theme.spacing.unit * 2}px`,
    lineHeight: '1.7rem',
    width: '100%'
  },
  titleInput: {
    marginBottom: '-16px'
  },
  inlineEdit: {
    ...theme.typography.subheading,
    margin: `0 ${theme.spacing.unit * 2}px`,
    width: '100%',
  },
  button: {
    margin: `${theme.spacing.unit * 2}px`,
  },
  addButton: {
    position: 'fixed',
    bottom: `${theme.spacing.unit * 4}px`,
    right: `${theme.spacing.unit * 4}px`
  },
  multiline: {
    alignItems: 'start'
  }
}));

class TaskView extends Component {

  componentDidMount() {
    if (this.props.match.params.taskId !== 'new') {
      this.props.fetchTaskById(this.props.match.params.taskId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.taskId !== 'new' && this.props.match !== nextProps.match) {
      this.props.fetchTaskById(nextProps.match.params.taskId);
    }
  }

  updateTask(task) {
    task.id ? this.props.updateExistingTask(task) : this.props.updateNewTask(task);
  }

  render() {

    const {
      task,
      childTasks,
      category,
      classes,
      viewTask,
      addTask,
      sendTask,
      createTask,
      history
    } = this.props;

    return (
      <div>
        <AppBar position="static" className={classes.header}>
          <FlexBox align="flex-end">
            <IconButton color="contrast" className={classes.headerButton} onClick={() => history.goBack()}>
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
            <InlineEdit
              placeholder="Enter a summary..."
              className={classes.title}
              inputClassName={classes.titleInput}
              value={task.summary}
              inputProps={{
                'aria-label': 'Summary',
              }}
              onChange={(event) => this.updateTask({
                ...task,
                summary: event.target.value
              })}
              onSubmit={task.id ? () => sendTask(task) : null}
            />
          </FlexBox>
        </AppBar>
        <List>
          <ListItem>
            <ListItemIcon>
              <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText primary={category ? category.name : 'Uncategorized'} />
          </ListItem>
          <ListItem className={classes.multiline}>
            <ListItemIcon>
              <Icon>description</Icon>
            </ListItemIcon>
            <InlineEdit
              placeholder="Enter a description..."
              className={classes.inlineEdit}
              value={task.description}
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={(event) => this.updateTask({
                ...task,
                description: event.target.value
              })}
              onSubmit={task.id ? () => sendTask(task) : null}
            />
          </ListItem>
          <Divider />
          {childTasks ? childTasks.map(childTask => (
            <ListItem button key={childTask.id} onClick={() => viewTask(childTask.id)}>
              <ListItemText
                primary={childTask.summary}
              />
            </ListItem>
          )) : null}
        </List>
        {task.id ? (
          <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => addTask(task.id)}>
            <Icon>add</Icon>
          </Button>
        ) : (
          <FlexBox justify="flex-end">
            <Button raised color="primary" aria-label="save" className={classes.button} onClick={() => createTask(task)}>
              Save
            </Button>
          </FlexBox>
        )}
      </div>
    );

  }

};

const mapStateToProps = (state, { match, location }) => {

  let taskId = match.params.taskId;
  let task = {};
  let childTasks = [];
  let category = null;

  if (taskId !== 'new') {
    taskId = parseInt(taskId);
    task = getTaskById(state, taskId) || {};
    childTasks = getChildTasksByParentId(state, taskId);
    category = getCategoryById(state, task.category);
  } else {
    task = getNewTask(state);
    const query = queryString.parse(location.search);
    task.parentId = parseInt(query.parent);
  }

  return {
    task,
    childTasks,
    category
  };

};

const mapDispatchToProps = dispatch => bindActionCreators({
  viewTask: (taskId) => push(`/tasks/${taskId}`),
  addTask: (taskId) => push(`/tasks/new?parent=${taskId}`),
  fetchTaskById,
  sendTask,
  updateNewTask,
  updateExistingTask,
  createTask
}, dispatch);

export default withRouter(withStyles(styleSheet)(
  connect(mapStateToProps, mapDispatchToProps)(TaskView)
));