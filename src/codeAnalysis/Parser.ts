import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxTree } from './SyntaxTree';
import { ExpressionSyntax } from './ExpressionSyntax';
import { NumberExpresstionSyntax } from './NumberExpressionSyntax';
import { BinaryExpressionSyntax } from './BinaryExpressionSyntax';
import { ParenthesizedExpressionSyntax } from './ParenthesizedExpressionSyntax';
import { Lexer } from './Lexer';

export class Parser {
    private readonly tokens: SyntaxToken[];
    private position: number = 0;
    private _diagnostics: Array<string> = new Array();
    public get diagnositics(): Array<string> {
        return this._diagnostics;
    }
    private get current(): SyntaxToken {
        return this.peek(0);
    }

    constructor(text: string) {
        let tokens: SyntaxToken[] = new Array();
        const lexer: Lexer = new Lexer(text);

        do {
            var token: SyntaxToken = lexer.nextToken();

            if (
                token.kind !== SyntaxKind.WhiteSpaceToken &&
                token.kind !== SyntaxKind.BadToken
            ) {
                tokens.push(token);
            }
        } while (token.kind !== SyntaxKind.EndOfFileToken);

        this.tokens = tokens;
        this._diagnostics = lexer.diagnostics;
    }

    private peek(offset: number): SyntaxToken {
        let index = this.position + offset;

        if (index >= this.tokens.length)
            return this.tokens[this.tokens.length - 1];

        return this.tokens[index];
    }

    private nextToken(): SyntaxToken {
        let current: SyntaxToken = this.current;
        this.position++;
        return current;
    }

    private matchToken(syntaxKind: SyntaxKind): SyntaxToken {
        if (this.current.kind === syntaxKind) {
            return this.nextToken();
        }

        this._diagnostics.push(
            `ERROR: Unexpected token<${this.current.kind}>, expected <${syntaxKind}>`
        );

        return new SyntaxToken(syntaxKind, this.current.position, null, null);
    }

    public parse(): SyntaxTree {
        const expression: ExpressionSyntax = this.parseTerm();
        const endOfFileToken: SyntaxToken = this.matchToken(
            SyntaxKind.EndOfFileToken
        );

        return new SyntaxTree(this._diagnostics, expression, endOfFileToken);
    }

    private parseTerm(): ExpressionSyntax {
        let leftToken: ExpressionSyntax = this.parsePrimaryExpression();

        while (
            this.current.kind === SyntaxKind.PlusToken ||
            this.current.kind === SyntaxKind.MinusToken ||
            this.current.kind === SyntaxKind.StarToken ||
            this.current.kind === SyntaxKind.SlashToken ||
            this.current.kind === SyntaxKind.PercentToken
        ) {
            let operatorToken: SyntaxToken = this.nextToken();
            let rightToken = this.parseFactor();
            leftToken = new BinaryExpressionSyntax(
                leftToken,
                operatorToken,
                rightToken
            );
        }

        return leftToken;
    }

    private parseFactor(): ExpressionSyntax {
        let leftToken: ExpressionSyntax = this.parsePrimaryExpression();

        while (
            this.current.kind === SyntaxKind.StarToken ||
            this.current.kind === SyntaxKind.SlashToken ||
            this.current.kind === SyntaxKind.PercentToken
        ) {
            let operatorToken: SyntaxToken = this.nextToken();
            let rightToken = this.parseTerm();
            leftToken = new BinaryExpressionSyntax(
                leftToken,
                operatorToken,
                rightToken
            );
        }

        return leftToken;
    }

    parseExpression(): ExpressionSyntax {
        return this.parseTerm();
    }

    private parsePrimaryExpression():
        | NumberExpresstionSyntax
        | SyntaxToken
        | ParenthesizedExpressionSyntax {
        if (this.current.kind === SyntaxKind.OpenParenthesisToken) {
            let leftToken: SyntaxToken = this.nextToken();
            let expression: ExpressionSyntax = this.parseExpression();
            let rightToken: SyntaxToken = this.matchToken(
                SyntaxKind.CloseParenthesisToken
            );

            return new ParenthesizedExpressionSyntax(
                leftToken,
                expression,
                rightToken
            );
        }

        let numberToken = this.matchToken(SyntaxKind.NumberToken);

        if (numberToken) {
            return new NumberExpresstionSyntax(numberToken);
        } else {
            return this.current;
        }
    }
}
