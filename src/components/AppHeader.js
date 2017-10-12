// Base imports
import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {Route, withRouter} from 'react-router-dom';
import TaskList from './TaskList';
import TaskView from './TaskView';
import FlexBox from './FlexBox';
import FlexItem from './FlexItem';

// Selector imports
import {getIsMenuOpen} from '../modules';

// Action imports
import {openMenu, closeMenu} from '../modules/menu';

const stylesheet = createStyleSheet({
  toolbar: {
    width: '100%'
  }
});

class AppHeader extends Component {

  render() {

    // Destructuring of props
    const {title, openMenu, classes} = this.props;

    return (

      <AppBar position="static">
        <Toolbar>

          <FlexBox align="center" className={classes.toolbar}>

            <IconButton color="contrast" aria-label="Menu" onClick={openMenu} style={{marginRight: '16px'}}>
              <MenuIcon />
            </IconButton>

            <Typography type="title" color="inherit">
              {title}
            </Typography>

          </FlexBox>

        </Toolbar>
      </AppBar>

    );

  }

}

const mapDispatchToProps = {
  openMenu
};

export default compose(
  withStyles(stylesheet),
  connect(
    null,
    mapDispatchToProps
  )
)(AppHeader);