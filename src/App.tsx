import React from 'react';
import './App.css';
import {TennisGame} from "./tennis/TennisGame";


type State = {
    playerOneName: string;
    playerTwoName: string;
    score: string;
}

export class App extends React.Component<any, State> {

    private tennisGame: TennisGame;

    constructor(props: any) {
        super(props);

        this.tennisGame = new TennisGame('rafa', 'roger');

        this.state = {
            playerOneName: this.tennisGame.playerOneName,
            playerTwoName: this.tennisGame.playerTwoName,
            score: this.tennisGame.getScore()
        };

        this.playerOneScores = this.playerOneScores.bind(this);
        this.playerTwoScores = this.playerTwoScores.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    playerOneScores(): void {
        this.tennisGame.playerOneScores();
        this.updateScore();
    }

    playerTwoScores(): void {
        this.tennisGame.playerTwoScores();
        this.updateScore();
    }

    resetGame():void {
        this.tennisGame = new TennisGame('rafa', 'roger');
        this.updateScore();
    }

    updateScore(): void {
        this.setState({score: this.tennisGame.getScore()});
    }

    render() {
        return (
            <div>
                <header>
                    <img className="app-icon" src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f3be.svg"></img>
                    <p>Now playing</p>
                    <p>{this.state.playerOneName} vs. {this.state.playerTwoName}</p>
                </header>
                <section>
                    <p>
                        {this.state.score}
                    </p>
                    <ol className="action-menu">
                        <li>
                            <button onClick={this.playerOneScores}>Player 1 scores</button>
                        </li>
                        <li>
                            <button onClick={this.playerTwoScores}>Player 2 scores</button>
                        </li>
                        <li>
                            <button onClick={this.resetGame}>Reset</button>
                        </li>
                    </ol>
                </section>
            </div>
        );
    }
}
