import React        from 'react';
import { shallow }  from 'enzyme';
import Debate       from './Debate';
import Answer       from './Answer';
import ErrorMessage from './ErrorMessage';

describe('Debate', () => {
  const answers = {
    neutral:  {id: 3, value: 'neutral answer'},
    positive: {id: 1, value: 'positive answer'},
    negative: {id: 2, value: 'negative answer'},
  };
  const topic   = 'debate topic';

  it('renders header with topic', () => {
    const debate = shallow(<Debate topic={topic} answers={answers} />);
    expect(debate.containsMatchingElement(topic)).toBe(true);
  });

  it('renders answers', () => {
    const debate = shallow(<Debate topic={topic} answers={answers} />);
    expect(debate.find(Answer).length).toBe(Object.entries(answers).length);
  });

  it('renders answers sorted', () => {
    const debate  = shallow(<Debate topic={topic} answers={answers} />);
    expect(debate.find(Answer).at(0).prop('type')).toBe('positive');
    expect(debate.find(Answer).at(1).prop('type')).toBe('negative');
    expect(debate.find(Answer).at(2).prop('type')).toBe('neutral');
  });

  it('calls onVoteSelected with selected answer id', () => {
    const handler = jest.fn();
    const debate  = shallow(<Debate topic={topic} answers={answers} onVoteSelected={handler} />);
    debate.find(Answer).at(1).shallow().simulate('click');

    expect(handler).toHaveBeenCalledWith(2);
  });

  it('renders error message', () => {
    const error  = 'error message';
    const debate = shallow(<Debate topic={topic} answers={answers} errorMessage={error} />);

    expect(debate.containsMatchingElement(<ErrorMessage message={error} />)).toBe(true);
  });
});
