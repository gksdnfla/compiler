import { sealed } from '../utils';
import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';

@sealed
export class BinaryExpressionSyntax extends ExpressionSyntax {
    public override get kind(): SyntaxKind {
        return SyntaxKind.BinaryExpressionSyntax;
    }
    public leftToken: ExpressionSyntax;
    public operatorToken: SyntaxToken;
    public rightToken: ExpressionSyntax;

    constructor(
        leftToken: ExpressionSyntax,
        operatorToken: SyntaxToken,
        rightToken: ExpressionSyntax
    ) {
        super();
        Object.defineProperty(this, 'count', {
            configurable: true,
            enumerable: false,
        });
        this.leftToken = leftToken;
        this.operatorToken = operatorToken;
        this.rightToken = rightToken;
    }

    public getChildren(): Array<ExpressionSyntax> | null {
        return [this.leftToken, this.operatorToken, this.rightToken];
    }
}
