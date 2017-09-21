// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import AppHeader from './AppHeader';
import CategoryPreview from './CategoryPreview';
import List from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

// Selector imports
import {getCategories} from '../modules';

// Action imports
import {push} from 'react-router-redux';
import {fetchCategories} from '../modules/categories';

const styleSheet = createStyleSheet(theme => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  addButton: {
    position: 'fixed',
    bottom: `${theme.spacing.unit * 4}px`,
    right: `${theme.spacing.unit * 4}px`
  }
}));

// Component generation
class CategoryList extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  
  // Composition
  render() {

    // Destructuring of props
    const {classes, categories, createCategory} = this.props;

    return (
      <div>
        <AppHeader title="Category List" />
        <div>
          <List>
            {Object.values(categories).map(category => (
              <CategoryPreview key={category.id} category={category} />
            ))}
          </List>
          <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => createCategory()}>
            <Icon>add</Icon>
          </Button>
        </div>
      </div>
    );

  }

};

const mapStateToProps = state => ({
  categories: getCategories(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCategory: () => push('/categories/new'),
  fetchCategories
}, dispatch);

export default withStyles(styleSheet)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryList)
);