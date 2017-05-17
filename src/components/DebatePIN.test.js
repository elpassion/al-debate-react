import React             from 'react';
import { shallow }       from 'enzyme';
import DebatePIN         from './DebatePIN';
import { Input, Button } from 'semantic-ui-react';

describe('DebatePIN', () => {
  let debatePIN = null;

  beforeEach(() => {
    debatePIN = shallow(<DebatePIN />);
  });

  describe('input', () => {
    it('renders', () => {
      expect(debatePIN.find(Input).length).toBe(1);
    });

    it('renders number input', () => {
      expect(debatePIN.find(Input).prop('type')).toBe('number');
    });

    it('renders number input with placeholder', () => {
      expect(debatePIN.find(Input).prop('placeholder')).toBe('PIN');
    });
  })

  describe('button', () => {
    it('renders', () => {
      expect(debatePIN.find(Button).length).toBe(1);
    });
  });

  it('handles onCodeSubmit event', () => {
    const handlerFn = jest.fn();
    debatePIN = shallow(<DebatePIN onCodeSubmit={handlerFn} />);
    debatePIN.find(Button).simulate('click');
    expect(handlerFn).toHaveBeenCalled();
  });

  it('passes code to onCodeSubmit', () => {
    const handlerFn = jest.fn();
    debatePIN = shallow(<DebatePIN onCodeSubmit={handlerFn} />);
    const code = 1234;
    debatePIN.find(Input).simulate('change', {target: {value: code}});
    debatePIN.find(Button).simulate('click');
    expect(handlerFn).toHaveBeenCalledWith(code);
  });
});
