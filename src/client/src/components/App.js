// Base imports
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// Component imports
import {Route, withRouter} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
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
    const {menuIsOpen, closeMenu, viewTasks, viewCategories} = this.props;

    return (

      <div>

        <Route exact path="/" component={TaskList} />

        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:taskId" component={TaskView} />

        <Route exact path="/categories" component={CategoryList} />
        <Route exact path="/categories/:categoryId" component={CategoryView} />

        <Drawer
          open={menuIsOpen}
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
          </List>
        </Drawer>

      </div>

    );

  }

}

const mapStateToProps = state => ({
  menuIsOpen: getIsMenuOpen(state)
});

const mapDispatchToProps = {
  viewTasks: () => push('/tasks'),
  viewCategories: () => push('/categories'),
  closeMenu
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));