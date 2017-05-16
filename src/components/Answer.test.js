import React       from 'react';
import { shallow } from 'enzyme';
import Answer      from './Answer';
import { Segment } from 'semantic-ui-react';

describe('Answer', () => {
  describe('positive', () => {
    it('renders green', () => {
      const answer = shallow(<Answer type="positive" value="answer" />);
      expect(answer.prop('color')).toBe('green');
    });
  });

  describe('negative', () => {
    it('renders red', () => {
      const answer = shallow(<Answer type="negative" value="answer" />);
      expect(answer.prop('color')).toBe('red');
    });
  });

  describe('neutral', () => {
    it('renders blue', () => {
      const answer = shallow(<Answer type="neutral" value="answer" />);
      expect(answer.prop('color')).toBe('blue');
    });
  });

  describe('selected', () => {
    it('renders inverted', () => {
      const answer = shallow(<Answer type="positive" value="answer" selected={true} />);
      expect(answer.prop('inverted')).toBe(true);
    });
  });

  it('handles onAnswerSelected event with selected answer id', () => {
    const handler = jest.fn();
    const id      = 1;
    const answer = shallow(<Answer id={id} onAnswerSelected={handler} answer="answer" />);

    answer.simulate('click');
    expect(handler).toHaveBeenCalledWith(id);
  });
});
