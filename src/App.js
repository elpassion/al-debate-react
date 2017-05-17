import React, { Component } from 'react';
import Nav                  from './components/Nav';
import DebatePIN            from './components/DebatePIN';
import Debate               from './components/Debate';

export default class App extends Component {
  state = {
    debateLoaded:     false,
    debateLoading:    false,
    authToken:        null,
    debate:           null,
    selectedAnswerId: null,
    lastError:        null
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
                     errorMessage={this.state.lastError}
                     selectedAnswerId={selectedAnswerId}
                     onVoteSelected={this.handleVoteSelected.bind(this)} />;
    } else {
      return <DebatePIN loading={this.state.debateLoading}
                        errorMessage={this.state.lastError}
                        onCodeSubmit={this.handleCodeSubmit.bind(this)} />;
    }
  }

  async handleCodeSubmit(code) {
    try {
      this.setState({debateLoading: true, lastError: null});
      const token  = await this.elDebateClient.getToken(code);
      const debate = await this.elDebateClient.getDebate(token);
      this.setState({
        debateLoading: false,
        debateLoaded:  true,
        authToken:     token,
        debate:        debate
      });
    } catch(e) {
      this.setState({debateLoading: false, lastError: e.message});
    }
  }

  async handleVoteSelected(selectedId) {
    this.setState({lastError: null});
    try{
      await this.elDebateClient.vote(this.state.authToken, selectedId);
      this.setState({selectedAnswerId: selectedId});
    } catch(e) {
      this.setState({lastError: e.message});
    }
  }
}
