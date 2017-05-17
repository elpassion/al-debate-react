import React        from 'react';
import {
  Message,
  Container
}                   from 'semantic-ui-react';

export default ({message}) => {
  if(message) {
    return <Message negative><Container textAlign="center">{message}</Container></Message>;
  } else {
    return null;
  }
}
