import './App.css';
import React from 'react';
import ShowCard from './components/ShowCard';
import BottomBar from './components/BottomBar';
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
    shows: [],
  });

  React.useEffect(() => {
    const fetchQuestionsAndOptions = async () => {
      const resQuestions = await fetch('http://localhost:8000/api/questions/');
      const returnedQuestionsList = await resQuestions.json();
      console.log('these are the questions:');
      console.log(returnedQuestionsList);
      const resOptions = await fetch('http://localhost:8000/api/options/');
      const returnedOptionsList = await resOptions.json();
      console.log('these are the options:');
      console.log(returnedOptionsList);
      const resShows = await fetch('http://localhost:8000/api/shows/');
      const returnedShowsList = await resShows.json();
      console.log('these are the shows:');
      console.log(returnedShowsList);

      setState({
        ...state,
        questions: returnedQuestionsList,
        options: returnedOptionsList,
        shows: returnedShowsList,
      });
    };
    fetchQuestionsAndOptions().catch(console.error);
  }, []);

  const renderQuestion = (current_question) => {
    console.log(
      `rendering the next question. the current scores are ${state.currentScores}`
    );
    const filteredQuestions = state.questions.filter((question) => {
      return parseInt(question.number) === current_question;
    });
    // if (filteredQuestions.length > 0) {
    return filteredQuestions[0].title;
    // } else {
    //   setState({ ...state, testEnded: true });
    // }
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
          testEnded: true,
          currentScores: newCurrentScores,
        })
      : setState({
          ...state,
          currentQuestion: state.currentQuestion + 1,
          currentScores: newCurrentScores,
        });
  };

  const renderOptions = (question_num) => {
    const currentQuestionID = state.questions.filter(
      (question) => question.number === question_num
    )[0].id;
    const filteredOptions = state.options.filter(
      (option) => option.question === currentQuestionID
    );
    const mappedOptions = filteredOptions.map((option) => (
      <Button value={option.id} key={option.id} onClick={nextQuestion}>
        {option.title}
      </Button>
    ));
    return mappedOptions;
  };

  const renderResults = () => {
    // adds a difference key to all shows in a new array
    const newShowsList = state.shows.map(function(show) {
      const difference =
        Math.abs(show.humor_score - state.currentScores[0]) +
        Math.abs(show.thriller_score - state.currentScores[1]) +
        Math.abs(show.romance_score - state.currentScores[2]) +
        Math.abs(show.drama_score - state.currentScores[3]) +
        Math.abs(show.horror_score - state.currentScores[4]) +
        Math.abs(show.family_score - state.currentScores[5]);
      show.difference = difference;
      return show;
    });

    function compare_differences(a, b) {
      if (a.difference < b.difference) {
        return -1;
      }
      if (a.difference > b.difference) {
        return 1;
      }
      return 0;
    }
    // sorts then by the least difference from the overall scores
    newShowsList.sort(compare_differences);

    console.log('after sorted, the new list looks like this:');
    console.log(newShowsList);

    const top3 = newShowsList.slice(0, 3);
    console.log('the top 3 are:');
    console.log(top3);

    const top3banner = top3.map(function(show, i) {
      return (
        <>
          <ShowCard show={show} />
        </>
      );
    });

    return top3banner;
  };

  const renderRetryButton = () => {
    const retryButton = (
      <Button
        variant="outlined"
        onClick={() =>
          setState({
            ...state,
            currentQuestion: 1,
            testStarted: false,
            testEnded: false,
            currentScores: [5, 5, 5, 5, 5, 5],
          })
        }
      >
        Try again
      </Button>
    );
    return retryButton;
  };

  return (
    <>
      <Container>
        <Stack
          mt={2}
          mb={8}
          alignItems="center"
          spacing={5}
          justifyContent="center"
        >
          {/* if the test hasn't started, renders a welcome message, otherwise renders the question or the results */}
          <Typography variant="h3" component="h1">
            {state.testStarted
              ? state.testEnded
                ? 'Here are your results :'
                : renderQuestion(state.currentQuestion)
              : "Welcome to this TV-show picker, let's start the test !"}
          </Typography>

          {/* renders a start button if the test has not started, otherwise it renders the current options or the results */}
          {state.testStarted ? (
            state.testEnded ? (
              <Stack
                spacing={2}
                sx={{
                  justifyContent: 'center',
                }}
              >
                {renderResults()}
              </Stack>
            ) : (
              <ButtonGroup orientation="vertical" size="large">
                {renderOptions(state.currentQuestion)}
              </ButtonGroup>
            )
          ) : (
            <Button
              variant="contained"
              onClick={() => setState({ ...state, testStarted: true })}
            >
              start
            </Button>
          )}
          {state.testEnded ? renderRetryButton() : ''}
        </Stack>
        <BottomBar />
      </Container>
    </>
  );
}

export default App;
