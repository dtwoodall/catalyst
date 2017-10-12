// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {setIdToken, setAccessToken} from '../utilities/authentication';

// Component imports
import AppHeader from './AppHeader';
import TaskPreview from './TaskPreview';
import FlexBox from './FlexBox';
import List from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// Selector imports
import {getRootTasks, getCategories} from '../modules';

// Action imports
import {push} from 'react-router-redux';
import {fetchTasks} from '../modules/tasks';

const styleSheet = createStyleSheet(theme => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  addButton: {
    position: 'fixed',
    bottom: `${theme.spacing.unit * 4}px`,
    right: `${theme.spacing.unit * 4}px`
  },
  link: {
    color: '#0CF',
    '&:hover, &:active': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#00BBE8'
    }
  },
  noTasks: {
    marginTop: `${theme.spacing.unit*8}px`
  }
}));

// Component generation
class TaskList extends Component {

  componentDidMount() {
    setIdToken();
    setAccessToken();
    this.props.fetchTasks();
  }
  
  // Composition
  render() {

    // Destructuring of props
    const {classes, rootTasks, categories, viewTask, createTask} = this.props;

    return (
      <div>
        <AppHeader title="Task List" />
        {(rootTasks && rootTasks.length > 0) ?
          <List>
            {rootTasks.map(task => (
              <TaskPreview key={task.id} task={task} category={categories[task.category]} />
            ))}
          </List>
        :
          <FlexBox className={classes.noTasks} align="center" justify="center">
            <Typography type="subheading" color="secondary">
              Nothing to do? <span className={classes.link} onClick={() => createTask()}>Create a task...</span>
            </Typography>
          </FlexBox>
        }
        <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => createTask()}>
          <Icon>add</Icon>
        </Button>
      </div>
    );

  }

};

const mapStateToProps = state => ({
  rootTasks: getRootTasks(state),
  categories: getCategories(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTask: () => push('/tasks/new'),
  fetchTasks
}, dispatch);

export default withStyles(styleSheet)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskList)
);