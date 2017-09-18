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
class CategoryPreview extends Component {

  // Composition
  render() {

    // Destructuring of props
    const {category, viewCategory, classes} = this.props;

    return (
      <ListItem className={classes.root} button onClick={() => viewCategory(category.id)}>
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

// Selector Injection


// Action Injection
const mapDispatchToProps = dispatch => bindActionCreators({
  viewCategory: (categoryId) => push('/categories/' + categoryId)
}, dispatch);

// Connect to data
export default compose(
  withStyles(styleSheet),
  connect(null, mapDispatchToProps)
)(CategoryPreview);