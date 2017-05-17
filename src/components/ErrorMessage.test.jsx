import React        from 'react';
import { shallow }  from 'enzyme';
import { Message }  from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  const message = 'error message';

  it('renders negative message', () => {
    const errorMessage = shallow(<ErrorMessage message={message} />);
    expect(errorMessage.prop('negative')).toBe(true);
  });

  it('renders given message', () => {
    const errorMessage = shallow(<ErrorMessage message={message} />);
    expect(errorMessage.containsMatchingElement(message)).toBe(true);
  });

  it('renders nothing when no message', () => {
    const errorMessage = shallow(<ErrorMessage message={null} />);
    expect(errorMessage.type()).toBe(null);
  });
});
