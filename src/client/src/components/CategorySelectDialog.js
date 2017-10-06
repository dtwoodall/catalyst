// Base imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import FlexBox from './FlexBox';
import CategoryPreview from './CategoryPreview';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

// Selector imports
import {getCategories} from '../modules';

// Action imports
import {fetchCategories} from '../modules/categories';

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
  addButton: {
    position: 'fixed',
    bottom: `${theme.spacing.unit * 4}px`,
    right: `${theme.spacing.unit * 4}px`
  }
}));

// Component generation
class CategorySelectDialog extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  
  // Composition
  render() {

    // Destructuring of props
    const {classes, categories, createCategory, closeDialog, selectCategory} = this.props;

    return (
      <div>
        <AppBar position="static" className={classes.header}>
          <FlexBox align="flex-end">
            <IconButton color="contrast" className={classes.headerButton} onClick={() => closeDialog()}>
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.title}>
              Pick a Category
            </Typography>
          </FlexBox>
        </AppBar>
        <List>
          {Object.values(categories).map(category => (
            <CategoryPreview key={category.id} category={category} onClick={() => selectCategory(category.id)} />
          ))}
        </List>
        {/*<!Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => createCategory()}>
          <Icon>add</Icon>
        </Button>*/}
      </div>
    );

  }

};

const mapStateToProps = state => ({
  categories: getCategories(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  //createCategory: () => push('/categories/new'),
  fetchCategories
}, dispatch);

export default withStyles(styleSheet)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategorySelectDialog)
);