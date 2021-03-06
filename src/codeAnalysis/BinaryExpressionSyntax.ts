import { sealed } from '../utils';
import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';

@sealed
export class BinaryExpressionSyntax extends ExpressionSyntax {
    public override get kind(): SyntaxKind {
        return SyntaxKind.BinaryExpressionSyntax;
    }
    public left: ExpressionSyntax;
    public operatorToken: SyntaxToken;
    public right: ExpressionSyntax;

    constructor(
        left: ExpressionSyntax,
        operatorToken: SyntaxToken,
        right: ExpressionSyntax
    ) {
        super();
        Object.defineProperty(this, 'count', {
            configurable: true,
            enumerable: false,
        });
        this.left = left;
        this.operatorToken = operatorToken;
        this.right = right;
    }

    public getChildren(): Array<ExpressionSyntax> | null {
        return [this.left, this.operatorToken, this.right];
    }
}
