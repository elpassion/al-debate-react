import React    from 'react';
import { Grid } from 'semantic-ui-react';
import logo     from '../assets/logo_white.png';

export default () => (
  <Grid padded style={{ backgroundColor: "black" }} className="header">
    <Grid.Column textAlign="center">
      <img src={logo} width="123" height="60" alt="EL Debate logo" />
    </Grid.Column>
  </Grid>
)
