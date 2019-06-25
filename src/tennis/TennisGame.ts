interface ScorePrinter {
    printScore(score: TennisScore): string;
}

class PlainTextScorePrinter implements ScorePrinter {
    printScore(score: TennisScore): string {
        return score.label;
    }
}

class NumericScorePrinter implements ScorePrinter {
    printScore(score: TennisScore): string {
        return score.points.toString();
    }
}

class TennisScore {
    private readonly _balls: number;
    private readonly _points: number;
    private readonly _label: string;

    public static readonly SCORE_0 = new TennisScore(0, 0, 'Love');
    public static readonly SCORE_15 = new TennisScore(1, 15, 'Fifteen');
    public static readonly SCORE_30 = new TennisScore(2, 30, 'Thirty');
    public static readonly SCORE_40 = new TennisScore(3, 40, 'Forty');

    constructor(balls: number, points: number, label: string) {
        this._balls = balls;
        this._points = points;
        this._label = label;
    }

    get balls(): number {
        return this._balls;
    }

    get points(): number {
        return this._points;
    }

    get label(): string {
        return this._label;
    }

    isBetter(score: TennisScore): boolean {
        return this._balls > score.balls;
    }

    nextBall() {
        if (this === TennisScore.SCORE_0) {
            return TennisScore.SCORE_15;
        } else if (this === TennisScore.SCORE_15) {
            return TennisScore.SCORE_30;
        } else if (this === TennisScore.SCORE_30) {
            return TennisScore.SCORE_40;
        } else {
            const nextBall = this._balls + 1;
            return new TennisScore(nextBall, nextBall, nextBall.toString());
        }
    }

    isForward(otherScore: TennisScore) {
        return {
            by: (delta: number) => this.balls >= otherScore.balls + delta

        };
    }

    isEqual(otherScore: TennisScore) {
        return otherScore.balls === this._balls;
    }
}

export class TennisGame {
    private playerOneScore = TennisScore.SCORE_0;
    private playerTwoScore = TennisScore.SCORE_0;
    private readonly _playerTwoName: string;
    private readonly _playerOneName: string;

    constructor(playerOneName: string, playerTwoName: string) {
        this._playerOneName = playerOneName;
        this._playerTwoName = playerTwoName;
    }

    public playerOneScores(): void {
        this.playerOneScore = this.playerOneScore.nextBall();
    }

    public playerTwoScores(): void {
        this.playerTwoScore = this.playerTwoScore.nextBall();
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

        const scorePrinter: ScorePrinter = displayNumericScore ? new NumericScorePrinter() : new PlainTextScorePrinter();

        if (this.playerOneScore === this.playerTwoScore) {
            // Find regular equality
            return scorePrinter.printScore(this.playerOneScore) + ' all';
        }


        // Regular score
        return scorePrinter.printScore(this.playerOneScore) + ',' + scorePrinter.printScore(this.playerTwoScore);

    }

    private isGameFinished(): boolean {
        return (this.playerOneScore.isBetter(TennisScore.SCORE_40) && this.playerOneScore.isForward(this.playerTwoScore).by(2))
            || (this.playerTwoScore.isBetter(TennisScore.SCORE_40) && this.playerTwoScore.isForward(this.playerOneScore).by(2));
    }

    private hasAdvantage() {
        return (this.playerTwoScore.isBetter(TennisScore.SCORE_40) && this.playerTwoScore.isForward(this.playerOneScore).by(1))
            || (this.playerOneScore.isBetter(TennisScore.SCORE_40) && this.playerOneScore.isForward(this.playerTwoScore).by(1));
    }

    private getBestPlayerName() {
        return (this.playerOneScore.isBetter(this.playerTwoScore) ? this._playerOneName : this._playerTwoName);
    }

    private hasDeuce() {
        return this.playerOneScore.isBetter(TennisScore.SCORE_30) && this.playerTwoScore.isEqual(this.playerOneScore);
    }
}
