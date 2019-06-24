import {TennisGame} from "./TennisGame";

let tennisGame:TennisGame;

beforeAll(() => {
  tennisGame = new TennisGame('rafa', 'roger');
});

it('Tennis game is mounting !', () => {
  expect(tennisGame).not.toBe(null);
});
