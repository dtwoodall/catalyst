// Base imports
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, logout, isLoggedIn} from '../utilities/authentication';

// Component imports
import {Route, withRouter} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import TaskList from './TaskList';
import TaskView from './TaskView';
import CategoryList from './CategoryList';
import CategoryView from './CategoryView';
import Icon from 'material-ui/Icon';

// Selector imports
import {getIsMenuOpen} from '../modules';

// Action imports
import {closeMenu} from '../modules/menu';

class App extends Component {

  render() {

    // Destructuring of props
    const {isMenuOpen, closeMenu, viewTasks, viewCategories, logout} = this.props;

    return (

      <div>

        <Route exact path="/" component={TaskList} />

        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:taskId" component={TaskView} />

        <Route exact path="/categories" component={CategoryList} />
        <Route exact path="/categories/:categoryId" component={CategoryView} />

        <Drawer
          open={isMenuOpen}
          onRequestClose={closeMenu}
        >
          <List>
            <ListItem button onClick={() => viewTasks()}>
              <ListItemIcon>
                <Icon>list</Icon>
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem button onClick={() => viewCategories()}>
              <ListItemIcon>
                <Icon>folder</Icon>
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
            {(isLoggedIn()) ? (
              <ListItem button onClick={() => logout()}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => login()}>
                <ListItemIcon>
                  <Icon>person</Icon>
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItem>
            )}
          </List>
        </Drawer>

      </div>

    );

  }

}

const mapStateToProps = state => ({
  isMenuOpen: getIsMenuOpen(state)
});

const mapDispatchToProps = {
  viewTasks: () => push('/tasks'),
  viewCategories: () => push('/categories'),
  closeMenu,
  logout
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));