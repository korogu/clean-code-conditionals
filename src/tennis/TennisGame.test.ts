import {TennisGame} from "./TennisGame";

let tennisGame:TennisGame;

beforeEach(() => {
  tennisGame = new TennisGame('rafa', 'roger');
});

it('Get the player 1 name', () => {
  expect(tennisGame.playerOneName).toBe('rafa');
});

it('Get the player 2 name', () => {
  expect(tennisGame.playerTwoName).toBe('roger');
});

it('Get the initial score', () => {
  expect(tennisGame.getScore()).toBe('Love all');
});

it('Display player points after player scores', () => {
  expect(tennisGame.getScore()).toBe('Love all');

  tennisGame.playerOneScores();
  expect(tennisGame.getScore()).toBe('Fifteen,Love');

  tennisGame.playerOneScores();
  expect(tennisGame.getScore()).toBe('Thirty,Love');

  tennisGame.playerOneScores();
  expect(tennisGame.getScore()).toBe('Forty,Love');
});

it('Update player 2 points after player scores', () => {
  expect(tennisGame.getScore()).toBe('Love all');

  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Love,Fifteen');

  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Love,Thirty');

  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Love,Forty');
});

it('Display equality', () => {
  tennisGame.playerOneScores();
  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Fifteen all');

  tennisGame.playerOneScores();
  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Thirty all');

  tennisGame.playerOneScores();
  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Deuce');
});

it('Display advantages', () => {
  setupGameStateToDeuce();

  tennisGame.playerOneScores();
  expect(tennisGame.getScore()).toBe('Advantage rafa');

  tennisGame.playerTwoScores();
  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('Advantage roger');
});

it('Display player 1 win', () => {
  setupGameStateToDeuce();

  tennisGame.playerOneScores();
  tennisGame.playerOneScores();
  expect(tennisGame.getScore()).toBe('rafa wins');
});

it('Display player 1 win', () => {
  setupGameStateToDeuce();

  tennisGame.playerTwoScores();
  tennisGame.playerTwoScores();
  expect(tennisGame.getScore()).toBe('roger wins');
});

function setupGameStateToDeuce() {
  tennisGame.playerOneScores();
  tennisGame.playerOneScores();
  tennisGame.playerOneScores();

  tennisGame.playerTwoScores();
  tennisGame.playerTwoScores();
  tennisGame.playerTwoScores();
}
