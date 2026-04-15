import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';

function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  </div>);
}

function Book({title, onClick}) {
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author"/>
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}
Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
    { show
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
      : null }
    </div>
  );
}

function Score({ correct, total }) {
  return (
    <div className="row score">
      <div className="col-12 text-right">
        <span className="score__text">{correct} / {total} correct</span>
      </div>
    </div>
  );
}

function GameOver({ score, onResetGame }) {
  return (
    <div className="row game-over">
      <div className="col-8 offset-2 text-center">
        <h2>Game Over</h2>
        <p>You got <strong>{score.correct}</strong> out of <strong>{score.total}</strong> correct!</p>
        <button className="btn btn-primary btn-lg" onClick={onResetGame}>Play Again</button>
      </div>
    </div>
  );
}

function Footer() {
  return (<div id="footer" className="row">
    <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="http://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
        </p>
    </div>
  </div>);
}

const GAME_LENGTH = 10;

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight,
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    },
    onResetGame: () => {
      dispatch({ type: 'RESET_GAME' });
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight, score, onAnswerSelected, onContinue, onResetGame}) {
    const isGameOver = score.total >= GAME_LENGTH;
    return (
      <div className="container-fluid">
        <Hero />
        <Score correct={score.correct} total={score.total} />
        {isGameOver
          ? <GameOver score={score} onResetGame={onResetGame} />
          : <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        }
        {!isGameOver && <Continue show={highlight === 'correct'} onContinue={onContinue}/>}
        <p><Link to="/add">Add an author</Link></p>
        <Footer />
      </div>
    );
  });

export default AuthorQuiz;
