import { sealed } from '../utils';
import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxKind } from './SyntaxKind';

@sealed
export class NumberExpresstionSyntax extends ExpressionSyntax {
    numberToken: SyntaxToken;
    public override get kind(): SyntaxKind {
        return SyntaxKind.NumberExpression;
    }

    constructor(numberToken: SyntaxToken) {
        super();
        this.numberToken = numberToken;
    }

    public getChildren(): Array<SyntaxToken> {
        return [this.numberToken];
    }
}
