// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import CategoryLabel from './CategoryLabel';
import {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';

// Stylesheet generation
const styleSheet = createStyleSheet(theme => ({
  root: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}));

// Component generation
class CategoryPreview extends Component {

  // Composition
  render() {

    // Destructuring of props
    const {category, onClick, classes} = this.props;

    return (
      <ListItem className={classes.root} button onClick={() => onClick()}>
        <ListItemIcon>
          <CategoryLabel category={category} />
        </ListItemIcon>
        <ListItemText
          primary={category.name}
        />
      </ListItem>
    )
  }

}

// Prop definition
CategoryPreview.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

// Connect to data
export default withStyles(styleSheet)(CategoryPreview);