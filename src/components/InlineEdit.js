import React, {Component} from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
  text: {
    width: '100%',
    whiteSpace: 'pre-wrap'
  },
  input: {
    color: 'inherit',
    width: '100%',
    paddingTop: '0'
  }
}));

class InlineEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  toggleEdit(editing) {
    if (!editing) {
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    }
    this.setState({editing});
  }

  render() {

    const {
      placeholder,
      className,
      displayClassName,
      inputClassName,
      value,
      inputProps,
      classes,
      onChange
    } = this.props;

    return (
      <div className={className} onClick={() => this.toggleEdit(true)} onBlur={() => this.toggleEdit(false)}>
        {this.state.editing ?
          <Input
            multiline
            placeholder={placeholder}
            className={`${classes.input} ${inputClassName}`}
            value={value}
            inputProps={{...inputProps, autoFocus: true}}
            onChange={(event) => onChange(event)}
          />
        :
          <div className={`${classes.text} ${displayClassName}`}>
            {value || placeholder}
          </div>
        }
      </div>
    );

  }

};

export default withStyles(styleSheet)(InlineEdit);