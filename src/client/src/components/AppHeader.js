// Base imports
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, createStyleSheet} from 'material-ui/styles';

// Component imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
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
import { openMenu, closeMenu } from '../modules/menu';


class AppHeader extends Component {

  render() {

    // Destructuring of props
    const {openMenu, title} = this.props;

    return (

      <AppBar position="static">
        <Toolbar>

          <FlexBox align="center">

            <IconButton color="contrast" aria-label="Menu" onClick={openMenu} style={{marginRight: '16px'}}>
              <MenuIcon />
            </IconButton>

            <Typography type="title" color="inherit">
              {title}
            </Typography>

            <FlexItem />

            {/*
              <!Button color="contrast">LOG IN</Button>
              <Button color="contrast">SIGN UP</Button>
            */}

          </FlexBox>

        </Toolbar>
      </AppBar>

    );

  }

}

const mapDispatchToProps = {
  openMenu
};

export default connect(
  null,
  mapDispatchToProps
)(AppHeader);