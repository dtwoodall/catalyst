import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import queryString from 'query-string';
import {getCategoryById, getRootTasksByCategoryId, getNewCategory} from '../modules';
import {fetchTasksByCategoryId} from '../modules/tasks';
import {fetchCategoryById, updateCategory as updateExistingCategory, sendCategory, createCategory} from '../modules/categories';
//import {getRootTasks, getTaskById, getNewTask, getChildTasksByParentId, getCategoryById} from '../modules';
//import {fetchTaskById, updateTask as updateExistingTask, sendTask, createTask} from '../modules/tasks';
import {updateNewCategory} from '../modules/newCategory';
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

class CategoryView extends Component {

  componentDidMount() {
    if (this.props.match.params.categoryId !== 'new') {
      this.props.fetchCategoryById(this.props.match.params.categoryId);
      this.props.fetchTasksByCategoryId(this.props.match.params.categoryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.categoryId !== 'new' && this.props.match !== nextProps.match) {
      this.props.fetchCategoryById(nextProps.match.params.categoryId);
      this.props.fetchTasksByCategoryId(this.props.match.params.categoryId);
    }
  }

  updateCategory(category) {
    category.id ? this.props.updateExistingCategory(category) : this.props.updateNewCategory(category);
  }

  render() {

    const {
      category,
      tasks,
      classes,
      viewTask,
      addTask,
      sendCategory,
      createCategory,
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
              placeholder="Enter a name..."
              className={classes.title}
              inputClassName={classes.titleInput}
              value={category.name}
              inputProps={{
                'aria-label': 'Name',
              }}
              onChange={(event) => this.updateCategory({
                ...category,
                name: event.target.value
              })}
              onSubmit={category.id ? () => sendCategory(category) : null}
            />
          </FlexBox>
        </AppBar>
        <List>
          <ListItem>
            <ListItemIcon>
              <Icon>palette</Icon>
            </ListItemIcon>
            <InlineEdit
              placeholder="Choose a color..."
              className={classes.inlineEdit}
              value={category.color}
              inputProps={{
                'aria-label': 'Color',
              }}
              onChange={(event) => this.updateCategory({
                ...category,
                color: event.target.value
              })}
              onSubmit={category.id ? () => sendCategory(category) : null}
            />
          </ListItem>
          <Divider />
          {tasks ? tasks.map(task => (
            <ListItem button key={task.id} onClick={() => viewTask(task.id)}>
              <ListItemText
                primary={task.summary}
              />
            </ListItem>
          )) : null}
        </List>
        {category.id ? (
          <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => addTask(category.id)}>
            <Icon>add</Icon>
          </Button>
        ) : (
          <FlexBox justify="flex-end">
            <Button raised color="primary" aria-label="save" className={classes.button} onClick={() => createCategory(category)}>
              Save
            </Button>
          </FlexBox>
        )}
      </div>
    );

  }

};

const mapStateToProps = (state, { match, location }) => {

  let categoryId = match.params.categoryId;
  let category = {};
  let tasks = [];

  if (categoryId !== 'new') {
    categoryId = parseInt(categoryId);
    category = getCategoryById(state, categoryId) || {};
    tasks = getRootTasksByCategoryId(state, categoryId);
  } else {
    category = getNewCategory(state);
  }

  return {
    category,
    tasks
  };

};

const mapDispatchToProps = dispatch => bindActionCreators({
  viewTask: (taskId) => push(`/tasks/${taskId}`),
  addTask: (categoryId) => push(`/tasks/new?category=${categoryId}`),
  fetchCategoryById,
  fetchTasksByCategoryId,
  sendCategory,
  updateNewCategory,
  updateExistingCategory,
  createCategory
}, dispatch);

export default withRouter(withStyles(styleSheet)(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
));