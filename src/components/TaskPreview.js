// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import CategoryLabel from './CategoryLabel';
import {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';

// Action imports
import {push} from 'react-router-redux';

// Stylesheet generation
const styleSheet = createStyleSheet(theme => ({
  root: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}));

// Component generation
class TaskPreview extends Component {

  // Composition
  render() {

    // Destructuring of props
    const {task, category, viewTask, classes} = this.props;

    return (
      <ListItem button className={classes.root} onClick={() => viewTask(task.id)}>
        <ListItemIcon>
          <CategoryLabel category={category} />
        </ListItemIcon>
        <ListItemText
          primary={task.summary}
        />
      </ListItem>
    )
  }

}

// Prop definition
TaskPreview.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired
  }).isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
};

// Selector Injection


// Action Injection
const mapDispatchToProps = dispatch => bindActionCreators({
  viewTask: (taskId) => push('/tasks/' + taskId)
}, dispatch);


// Connect to data
export default compose(
  withStyles(styleSheet),
  connect(
    null,
    mapDispatchToProps
  )
)(TaskPreview);