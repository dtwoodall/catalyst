// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import FlexBox from './FlexBox';
import FlexItem from './FlexItem';

// Action imports

// Stylesheet generation
const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '48px',
    height: '48px'
  },
  label: {
    width: '36px',
    height: '36px',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '24px',
    borderRadius: '2px',
    textAlign: 'center'
  }
}));

// Component generation
class CategoryLabel extends Component {

  // Composition
  render() {

    // Destructuring of props
    const {category, classes} = this.props;

    return (
        <FlexBox className={classes.root} justify="center" align="center">
          <FlexBox
            justify="center"
            align="center"
            className={classes.label}
            style={{backgroundColor: category.color}}
          >
            {category.name[0]}
          </FlexBox>
        </FlexBox>
    )
  }

}

// Prop definition
CategoryLabel.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

CategoryLabel.defaultProps = {
  category: {
    name: 'Uncategorized',
    color: '#000'
  }
}

// Selector Injection


// Action Injection


// Connect to data
export default withStyles(styleSheet)(CategoryLabel);