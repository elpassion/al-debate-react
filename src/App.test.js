import React       from 'react';
import ReactDOM    from 'react-dom';
import {
  shallow,
  mount
}                  from 'enzyme';
import App         from './App';
import DebatePIN   from './components/DebatePIN';
import Debate      from './components/Debate';
import {
  Input,
  Button
}                  from 'semantic-ui-react';

class ElDebateClientMock {
  constructor(debate, code, token) {
    this.code   = code;
    this.token  = token;
    this.debate = debate;
  }

  async getToken(code) {
    if(this.code === code) {
      return this.token;
    } else {
      throw new Error('error');
    }
  }

  async getDebate(token) {
    if(this.token === token) {
      return this.debate;
    } else {
      return null;
    }
  }

  async vote(token, voteId) {
    if (this.token == token) {
      return true;
    } else {
      throw new Error('error');
    }
  }

}


describe('App', () => {
  const debateTopic = 'debate';
  const debateAnswers = {
    positive: {id: 1, value: 'positive answer'},
    negative: {id: 2, value: 'negative answer'},
    neutral:  {id: 3, value: 'neutral answer'}
  };
  const debate = { topic: debateTopic, answers: debateAnswers };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  describe('when debate not fetched', () => {
    it('renders debate pin input', () => {
      const app = shallow(<App />);
      expect(app.containsMatchingElement(<DebatePIN />)).toBe(true);
    });

    it('does not render debate', () => {
      const app = shallow(<App />);
      expect(app.containsMatchingElement(<Debate />)).toBe(false);
    });
  });

  describe('when debate being fetched', () => {
    it('renders debate pin input', () => {
      const app = shallow(<App />);
      app.setState({ debateLoading: true });
      expect(app.containsMatchingElement(<DebatePIN />)).toBe(true);
    });

    it('does not render debate', () => {
      const app = shallow(<App />);
      app.setState({ debateLoading: true });
      expect(app.containsMatchingElement(<Debate />)).toBe(false);
    });
  })

  describe('when debate loaded', () => {
    it('renders debate with topic', () => {
      const app = shallow(<App />);
      app.setState({ debateLoaded: true, debate: debate });
      expect(app.containsMatchingElement(<Debate topic={debateTopic} />)).toBe(true);
    });

    it('renders debate with answers', () => {
      const app = shallow(<App />);
      app.setState({ debateLoaded: true, debate: debate });
      expect(app.containsMatchingElement(<Debate answers={debateAnswers} />)).toBe(true);
    });

    it('does not render debate pin input', () => {
      const app = shallow(<App />);
      app.setState({ debateLoaded: true, debate: debate });
      expect(app.containsMatchingElement(<DebatePIN />)).toBe(false);
    });

    it('renders debate pin with error', () => {
      const error = 'error message';
      const app   = shallow(<App />);
      app.setState({ debateLoaded: false, lastError: error });
      expect(app.containsMatchingElement(<DebatePIN errorMessage={error} />)).toBe(true);
    });

    it('renders debate with error message', () => {
      const error = 'error message';
      const app   = shallow(<App />);
      app.setState({ debateLoaded: true, debate: debate, lastError: error });
      expect(app.containsMatchingElement(<Debate errorMessage={error} />)).toBe(true);
    });
  });

  describe('debate fetching', () => {
    const code   = 1234;
    const token  = 'accesstoken';
    const debate = { topic: debateTopic, answers: debateAnswers };
    const client = new ElDebateClientMock(debate, code, token);

    it('handles code submit and sets debate in state', async () => {
      const app    = shallow(<App elDebateClient={client} />);

      await app.instance().handleCodeSubmit(code);
      expect(app.state('debate')).toBe(debate);
    });

    it('handles error thrown', async () => {
      const app    = shallow(<App elDebateClient={client} />);

      await app.instance().handleCodeSubmit(code + 1);
      expect(app.state('lastError')).not.toBe(null);
    });
  });

  describe('debate voting', () => {
    const code   = 1234;
    const token  = 'accesstoken';
    const debate = { topic: debateTopic, answers: debateAnswers };
    const client = new ElDebateClientMock(debate, code, token);

    it('handles voting', async () => {
      const app    = shallow(<App elDebateClient={client} />);

      app.setState({ debateLoaded: true, debate: debate, authToken: token });
      await app.instance().handleVoteSelected(debateAnswers.positive.id);
      expect(app.state('selectedAnswerId')).toBe(debateAnswers.positive.id);
    });

    it('handles error thrown', async () => {
      const app    = shallow(<App elDebateClient={client} />);
      app.setState({ debateLoaded: true, debate: debate, authToken: token + 'a' });
      await app.instance().handleVoteSelected(debateAnswers.positive.id);
      expect(app.state('lastError')).not.toBe(null);
    });
  })
});
