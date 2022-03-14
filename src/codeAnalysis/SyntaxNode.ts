import { SyntaxKind } from './SyntaxKind';
import { SyntaxToken } from './SyntaxToken';
import { ExpressionSyntax } from './ExpressionSyntax';

export abstract class SyntaxNode {
    public abstract get kind(): SyntaxKind;
    public abstract getChildren(): Array<
        SyntaxToken | ExpressionSyntax | SyntaxNode
    > | null;
}
