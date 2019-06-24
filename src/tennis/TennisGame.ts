export class TennisGame {
    playerOneScore = 0;
    playerTwoScore = 0;
    _playerTwoName: string;
    _playerOneName: string;

    constructor(playerOneName: string, playerTwoName: string) {
        this._playerOneName = playerOneName;
        this._playerTwoName = playerTwoName;
    }

    public playerOneScores(): void {
        this.playerOneScore++;
    }

    public playerTwoScores(): void {
        this.playerTwoScore++;
    }

    public get playerTwoName() {
        return this._playerTwoName;
    }

    public get playerOneName() {
        return this._playerOneName;
    }

    public getScore(displayNumericScore: boolean = false): string {

        if (this.isGameFinished()) {
            return this.getBestPlayerName() + ' wins';
        }

        if (this.hasAdvantage()) {
            return 'Advantage ' + this.getBestPlayerName();
        }

        if (this.hasDeuce()) {
            return 'Deuce';
        }

        if (this.playerOneScore === this.playerTwoScore) {
            // Find regular equality
            return (displayNumericScore ? this.translateScoreToNumeric(this.playerOneScore) : this.translateScoreToAlpha(this.playerOneScore)) + ' all';
        }

        // Regular score
        return (displayNumericScore ? this.translateScoreToNumeric(this.playerOneScore) : this.translateScoreToAlpha(this.playerOneScore))
            + ',' + (displayNumericScore ? this.translateScoreToNumeric(this.playerTwoScore) : this.translateScoreToAlpha(this.playerTwoScore));

    }

    private isGameFinished(): boolean {
        return (this.playerOneScore >= 4 && this.playerOneScore >= this.playerTwoScore + 2)
            || (this.playerTwoScore >= 4 && this.playerTwoScore >= this.playerOneScore + 2);
    }

    private hasAdvantage() {
        return (this.playerTwoScore >= 4 && this.playerTwoScore === this.playerOneScore + 1)
            || (this.playerOneScore >= 4 && this.playerOneScore === this.playerTwoScore + 1);
    }

    private getBestPlayerName() {
        return ((this.playerOneScore > this.playerTwoScore) ? this._playerOneName : this._playerTwoName);
    }

    private hasDeuce() {
        return this.playerOneScore >= 3 && this.playerTwoScore === this.playerOneScore;
    }

    private translateScoreToAlpha(score: number): string {
        switch (score) {
            case 3:
                return 'Forty';
            case 2:
                return 'Thirty';
            case 1:
                return 'Fifteen';
            case 0:
                return 'Love';
        }

        throw new Error('bad score');
    }

    private translateScoreToNumeric(score: number): string {
        switch (score) {
            case 3:
                return '40';
            case 2:
                return '30';
            case 1:
                return '15';
            case 0:
                return '0';
        }

        throw new Error('bad score');
    }
}
