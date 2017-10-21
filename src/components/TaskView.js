import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import queryString from 'query-string';
import {
  getRootTasks,
  getTaskById,
  getNewTask,
  getChildTasksByParentId,
  getCategoryById,
  getIsCategorySelectDialogOpen,
  getIsStatusSelectDialogOpen
} from '../modules';
import {fetchTaskById, updateTask as updateExistingTask, sendTask, createTask} from '../modules/tasks';
import {updateNewTask} from '../modules/newTask';
import {openCategorySelectDialog, closeCategorySelectDialog} from '../modules/categorySelectDialog';
import {openStatusSelectDialog, closeStatusSelectDialog} from '../modules/statusSelectDialog';
import AppHeader from './AppHeader';
import CategorySelectDialog from './CategorySelectDialog';
import StatusSelectDialog from './StatusSelectDialog';
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
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {statuses} from '../modules/tasks';

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
  },
  fieldList: {
    paddingTop: '0'
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
      isCategorySelectDialogOpen,
      openCategorySelectDialog,
      closeCategorySelectDialog,
      isStatusSelectDialogOpen,
      openStatusSelectDialog,
      closeStatusSelectDialog,
      history
    } = this.props;

    return (
      <div>
        <AppBar position="static" className={classes.header} style={{backgroundColor: category ? category.color : '#000'}}>
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
        <List className={classes.fieldList}>
          <ListItem button onClick={() => openCategorySelectDialog()}>
            <ListItemIcon>
              <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText primary={category ? category.name : 'Uncategorized'} />
          </ListItem>
          <ListItem button onClick={() => openStatusSelectDialog()}>
            <ListItemIcon>
              <Icon>
                {statuses[task.status] ? statuses[task.status].icon : null}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={task.status} />
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
        <Dialog
          fullScreen
          open={isCategorySelectDialogOpen}
          onRequestClose={closeCategorySelectDialog}
          transition={<Slide direction="up" />}
        >
          <CategorySelectDialog
            selectCategory={(categoryId) => {
              if (task.id) {
                sendTask({
                  ...task,
                  categoryId
                });
              } else {
                this.updateTask({
                  ...task,
                  categoryId
                });
              }
              closeCategorySelectDialog();
            }}
            closeDialog={() => closeCategorySelectDialog()}
          />
        </Dialog>
        <Dialog
          fullScreen
          open={isStatusSelectDialogOpen}
          onRequestClose={closeStatusSelectDialog}
          transition={<Slide direction="up" />}
        >
          <StatusSelectDialog
            selectStatus={(status) => {
              if (task.id) {
                sendTask({
                  ...task,
                  status
                });
              } else {
                this.updateTask({
                  ...task,
                  status
                });
              }
              closeStatusSelectDialog();
            }}
            closeDialog={() => closeStatusSelectDialog()}
          />
        </Dialog>
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
    category = getCategoryById(state, task.categoryId);
  } else {
    task = getNewTask(state);
    if (!task.status) {
      task.status = 'Not started';
    }
    category = getCategoryById(state, task.categoryId);
    const query = queryString.parse(location.search);
    task.parentId = parseInt(query.parent);
  }

  return {
    task,
    childTasks,
    category,
    isCategorySelectDialogOpen: getIsCategorySelectDialogOpen(state),
    isStatusSelectDialogOpen: getIsStatusSelectDialogOpen(state)
  };

};

const mapDispatchToProps = dispatch => bindActionCreators({
  viewTask: (taskId) => push(`/tasks/${taskId}`),
  addTask: (taskId) => push(`/tasks/new?parent=${taskId}`),
  openCategorySelectDialog,
  closeCategorySelectDialog,
  openStatusSelectDialog,
  closeStatusSelectDialog,
  fetchTaskById,
  sendTask,
  updateNewTask,
  updateExistingTask,
  createTask
}, dispatch);

export default compose(
  withRouter,
  withStyles(styleSheet),
  connect(mapStateToProps, mapDispatchToProps)
)(TaskView);