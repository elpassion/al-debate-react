import React  from 'react';
import {
  Grid,
  Header
}             from 'semantic-ui-react';
import Answer from './Answer';

const ANSWER_PRIORITY = {
  'positive': 1,
  'negative': 2,
  'neutral':  3
}

export default ({topic, answers, selectedAnswerId, onVoteSelected}) => {
  const answersEntriesSorted = answers => Object
                                            .entries(answers)
                                            .sort((a,b) => ANSWER_PRIORITY[a[0]] - ANSWER_PRIORITY[b[0]]);

  return (
    <Grid padded centered>
      <Grid.Row>
        <Header as="h1">{topic}</Header>
      </Grid.Row>
      {answersEntriesSorted(answers).map(([type, answer]) => {
        return (
          <Grid.Row key={type}>
            <Grid.Column width={10}>
              <Answer value={answer.value}
                      id={answer.id}
                      type={type}
                      selected={answer.id === selectedAnswerId}
                      onAnswerSelected={onVoteSelected} />
            </Grid.Column>
          </Grid.Row>
        )
       })}
    </Grid>
  );
};
