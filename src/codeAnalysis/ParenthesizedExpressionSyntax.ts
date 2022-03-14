import { sealed } from '../utils';
import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxKind } from './SyntaxKind';

@sealed
export class ParenthesizedExpressionSyntax extends ExpressionSyntax {
    public openParenthesisToken: SyntaxToken;
    public expression: ExpressionSyntax;
    public closeParenthesisToken: SyntaxToken;
    public override get kind(): SyntaxKind {
        return SyntaxKind.ParenthesizedExpression;
    }

    constructor(
        openParenthesisToken: SyntaxToken,
        expression: ExpressionSyntax,
        closeParenthesisToken: SyntaxToken
    ) {
        super();

        this.openParenthesisToken = openParenthesisToken;
        this.expression = expression;
        this.closeParenthesisToken = closeParenthesisToken;
    }

    public getChildren(): Array<SyntaxToken | ExpressionSyntax> {
        return [
            this.openParenthesisToken,
            this.expression,
            this.closeParenthesisToken,
        ];
    }
}
