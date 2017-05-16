import React, {Component} from 'react';
import {
  Grid,
  Input,
  Button
}                         from 'semantic-ui-react';

import './DebatePIN.css';

export default class DebatePIN extends Component {
  state = {
    code: ''
  }

  render() {
    const {loading} = this.props;

    return (
      <Grid padded centered>
        <Grid.Column width={10}>
          <Input icon="lock"
                 iconPosition="left"
                 placeholder="PIN"
                 loading={loading}
                 disabled={loading}
                 type="number"
                 size="large"
                 value={this.state.code}
                 onChange={e => this.setState({code: e.target.value})}
                 fluid
               />
          <Button color="green"
                  disabled={loading}
                  onClick={this._handleButtonClick.bind(this)}
                  size="large"
                  fluid>GO!</Button>
        </Grid.Column>
      </Grid>
    );
  }

  _handleButtonClick() {
    this.props.onCodeSubmit(this.state.code);
  }
}
