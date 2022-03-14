import { isDigit, isWhiteSpace, isInt32 } from '../utils';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxKind } from './SyntaxKind';

export class Lexer {
    private readonly text: string;
    private position: number = 0;
    private _diagnostics: Array<string> = new Array();
    public get diagnostics(): Array<string> {
        return this._diagnostics;
    }

    private get current(): string {
        if (this.position >= this.text.length) return '\0';

        return this.text[this.position];
    }

    private next(): void {
        this.position++;
    }

    constructor(text: string) {
        this.text = text;
    }

    public nextToken(): SyntaxToken {
        if (this.position >= this.text.length)
            return new SyntaxToken(
                SyntaxKind.EndOfFileToken,
                this.position,
                '\0',
                null
            );

        if (isDigit(this.current)) {
            let start: number = this.position;

            while (isDigit(this.current)) {
                this.next();
            }

            let length: number = this.position - start;
            let text: string = this.text.substring(start, start + length);
            let value: number = parseInt(text);

            if (!isInt32(value)) {
                this._diagnostics.push(
                    `The number ${this.text} isn't valid Int32.`
                );
            }

            return new SyntaxToken(SyntaxKind.NumberToken, start, text, value);
        }

        if (isWhiteSpace(this.current)) {
            let start: number = this.position;

            while (isWhiteSpace(this.current)) {
                this.next();
            }

            let length: number = this.position - start;
            let text: string = this.text.substring(start, start + length);

            return new SyntaxToken(
                SyntaxKind.WhiteSpaceToken,
                start,
                text,
                null
            );
        }

        switch (this.current) {
            case '+':
                return new SyntaxToken(
                    SyntaxKind.PlusToken,
                    this.position++,
                    '+',
                    null
                );
            case '-':
                return new SyntaxToken(
                    SyntaxKind.MinusToken,
                    this.position++,
                    '-',
                    null
                );
            case '*':
                return new SyntaxToken(
                    SyntaxKind.StarToken,
                    this.position++,
                    '*',
                    null
                );
            case '/':
                return new SyntaxToken(
                    SyntaxKind.SlashToken,
                    this.position++,
                    '/',
                    null
                );
            case '%':
                return new SyntaxToken(
                    SyntaxKind.PercentToken,
                    this.position++,
                    '%',
                    null
                );
            case '(':
                return new SyntaxToken(
                    SyntaxKind.OpenParenthesisToken,
                    this.position++,
                    '(',
                    null
                );
            case ')':
                return new SyntaxToken(
                    SyntaxKind.CloseParenthesisToken,
                    this.position++,
                    ')',
                    null
                );
            default:
                this._diagnostics.push(
                    `Error: bad character input: ${this.current}`
                );
                return new SyntaxToken(
                    SyntaxKind.BadToken,
                    this.position++,
                    this.text.substring(this.position - 1, this.position),
                    null
                );
        }
    }
}
