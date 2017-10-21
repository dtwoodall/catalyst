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
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import {statuses} from '../modules/tasks';

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
  }
}));

// Component generation
class StatusSelectDialog extends Component {

// Composition
  render() {

    // Destructuring of props
    const {classes, closeDialog, selectStatus} = this.props;

    return (
      <div>
        <AppBar position="static" className={classes.header}>
          <FlexBox align="flex-end">
            <IconButton color="contrast" className={classes.headerButton} onClick={() => closeDialog()}>
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.title}>
              Pick a status
            </Typography>
          </FlexBox>
        </AppBar>
        <List>
          {Object.values(statuses).map(status => (
            <ListItem button key={status.name} onClick={() => selectStatus(status.name)}>
              <ListItemIcon>
                <Icon>
                  {status.icon}
                </Icon>
              </ListItemIcon>
              <ListItemText primary={status.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

  }

};

export default withStyles(styleSheet)(StatusSelectDialog);