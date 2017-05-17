import React, { Component } from 'react';
import Nav                  from './components/Nav';
import DebatePIN            from './components/DebatePIN';
import Debate               from './components/Debate';

export default class App extends Component {
  state = {
    debateLoaded: false,
    debateLoading: false,
    authToken: null,
    debate: null,
    selectedAnswerId: null,
  }

  render() {
    return (
      <div>
        <Nav />
        {this._renderDebate()}
      </div>
    );
  }

  get elDebateClient() {
    return this.props.elDebateClient;
  }

  _renderDebate() {
    if (this.state.debateLoaded) {
      const {debate, selectedAnswerId} = this.state;
      return <Debate topic={debate.topic}
                     answers={debate.answers}
                     selectedAnswerId={selectedAnswerId}
                     onVoteSelected={this.handleVoteSelected.bind(this)} />;
    } else {
      return <DebatePIN loading={this.state.debateLoading}
                        onCodeSubmit={this.handleCodeSubmit.bind(this)} />;
    }
  }

  async handleCodeSubmit(code) {
    this.setState({debateLoading: true});
    const token  = await this.elDebateClient.getToken(code);
    const debate = await this.elDebateClient.getDebate(token);
    this.setState({
      debateLoading: false,
      debateLoaded:  true,
      authToken:     token,
      debate:        debate
    });
  }

  async handleVoteSelected(selectedId) {
    await this.elDebateClient.vote(this.state.authToken, selectedId);
    this.setState({ selectedAnswerId: selectedId });
  }
}
