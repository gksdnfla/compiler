import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxTree } from './SyntaxTree';
import { SyntaxFacts } from './SyntaxFacts';
import { ExpressionSyntax } from './ExpressionSyntax';
import { NumberExpresstionSyntax } from './NumberExpressionSyntax';
import { BinaryExpressionSyntax } from './BinaryExpressionSyntax';
import { ParenthesizedExpressionSyntax } from './ParenthesizedExpressionSyntax';
import { Lexer } from './Lexer';
import { UnaryExpressionSyntax } from './UnaryExpressionSyntax';

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
        const expression: ExpressionSyntax = this.parseExpression();
        const endOfFileToken: SyntaxToken = this.matchToken(
            SyntaxKind.EndOfFileToken
        );

        return new SyntaxTree(this._diagnostics, expression, endOfFileToken);
    }

    private parseExpression(parentPrecedence: number = 0): ExpressionSyntax {
        let unaryOperatorPrecedence: number =
            SyntaxFacts.getUnaryOperatorPrecedence(this.current.kind);
        let left;

        if (
            unaryOperatorPrecedence !== 0 &&
            unaryOperatorPrecedence >= parentPrecedence
        ) {
            let operatorToken = this.nextToken();
            let operand = this.parsePrimaryExpression();
            left = new UnaryExpressionSyntax(operatorToken, operand);
        } else {
            left = this.parsePrimaryExpression();
        }

        while (true) {
            let precedence = SyntaxFacts.getBinaryOperatorPrecedence(
                this.current.kind
            );
            if (precedence === 0 || precedence <= parentPrecedence) break;

            let operatorToken = this.nextToken();
            let right = this.parseExpression(precedence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
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
