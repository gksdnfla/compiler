import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';

export class UnaryExpressionSyntax extends ExpressionSyntax {
    public override get kind(): SyntaxKind {
        return SyntaxKind.BinaryExpressionSyntax;
    }
    public operatorToken: SyntaxToken;
    public right: ExpressionSyntax;

    constructor(operatorToken: SyntaxToken, right: ExpressionSyntax) {
        super();
        Object.defineProperty(this, 'count', {
            configurable: true,
            enumerable: false,
        });
        this.operatorToken = operatorToken;
        this.right = right;
    }

    public getChildren(): Array<ExpressionSyntax> | null {
        return [this.operatorToken, this.right];
    }
}
