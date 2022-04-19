import './App.css';
import React from 'react';
import {
  Paper,
  Container,
  Button,
  Stack,
  Typography,
  Link,
  ButtonGroup,
} from '@mui/material';

function App() {
  const [state, setState] = React.useState({
    options: [],
    questions: [],
    currentQuestion: 1,
    testStarted: false,
    testEnded: false,
    currentScores: [5, 5, 5, 5, 5, 5],
  });

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const resQuestions = await fetch('http://localhost:8000/api/questions/');
      const returnedQuestionsList = await resQuestions.json();
      console.log('these are the questions:');
      console.log(returnedQuestionsList);
      const resOptions = await fetch('http://localhost:8000/api/options/');
      const returnedOptionsList = await resOptions.json();
      console.log('these are the options:');
      console.log(returnedOptionsList);

      setState({
        ...state,
        questions: returnedQuestionsList,
        options: returnedOptionsList,
      });
    };
    fetchQuestions().catch(console.error);
  }, []);

  const renderQuestion = (current_question) => {
    console.log(
      `rendering the next question. the current scores are ${state.currentScores}`
    );
    const filteredQuestions = state.questions.filter((question) => {
      return parseInt(question.number) === current_question;
    });
    if (filteredQuestions.length > 0) {
      return filteredQuestions[0].title;
    } else {
      setState({ ...state, testEnded: true });
    }
  };

  const nextQuestion = (event) => {
    // gets the selected option object
    const selectedOption = state.options.filter(
      (option) => option.id === parseInt(event.target.value)
    )[0];
    // set a scores array with all the scores
    const scores = [
      selectedOption.humor_factor,
      selectedOption.thriller_factor,
      selectedOption.romance_factor,
      selectedOption.drama_factor,
      selectedOption.horror_factor,
      selectedOption.family_factor,
    ];

    const newCurrentScores = state.currentScores.map(function(score, i) {
      if (score + scores[i] < 0) {
        return 0;
      } else if (score + scores[i] > 10) {
        return 10;
      } else {
        return score + scores[i];
      }
    });

    console.log(`selected the option with id ${event.target.value}`);

    state.questions.length === state.currentQuestion
      ? setState({
          ...state,
          currentQuestion: 0,
          currentScores: newCurrentScores,
        })
      : setState({
          ...state,
          currentQuestion: state.currentQuestion + 1,
          currentScores: newCurrentScores,
        });
  };

  const renderOptions = (question_num) => {
    const filteredOptions = state.options.filter(
      (option) => option.question === question_num
    );
    const mappedOptions = filteredOptions.map((option) => (
      <Button value={option.id} key={option.id} onClick={nextQuestion}>
        {option.title}
      </Button>
    ));
    return mappedOptions;
  };

  return (
    <>
      <Container>
        <Stack mt={2} alignItems="center">
          {/* if the test hasn't started, renders a welcome message, otherwise renders the question or the results */}
          <Typography variant="h3" component="h1">
            {state.testStarted
              ? state.testEnded
                ? 'Here are your results :'
                : renderQuestion(state.currentQuestion)
              : "Welcome to this TV-show picker, let's start the test !"}
          </Typography>

          {/* renders a start button if the test has not started, otherwise it renders the current options */}
          {state.testStarted ? (
            <ButtonGroup orientation="vertical">
              {renderOptions(state.currentQuestion)}
            </ButtonGroup>
          ) : (
            <Button
              variant="contained"
              onClick={() => setState({ ...state, testStarted: true })}
            >
              start
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default App;
