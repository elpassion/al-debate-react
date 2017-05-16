import React from 'react';
import {
  Segment,
  Header,
  Icon
}            from 'semantic-ui-react';

const TYPE_COLORS = {
  'positive': 'green',
  'negative': 'red',
  'neutral': 'blue'
};

export default ({id, value, type, selected, onAnswerSelected}) => {
  const color = TYPE_COLORS[type];
  const inverted  = selected;
  const iconColor = inverted ? null : color;

  return (
    <Segment onClick={() => { onAnswerSelected(id) }} {...{color, inverted }}>
      <Header as="h2">
        <Icon name="thumbs outline up" color={iconColor} />
        <Header.Content>{ value }</Header.Content>
      </Header>
    </Segment>
  );
};
