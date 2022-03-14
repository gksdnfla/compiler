import { SyntaxKind } from './SyntaxKind';
import { ExpressionSyntax } from './ExpressionSyntax';
import { NumberExpresstionSyntax } from './NumberExpressionSyntax';
import { BinaryExpressionSyntax } from './BinaryExpressionSyntax';
import { ParenthesizedExpressionSyntax } from './ParenthesizedExpressionSyntax';

export class Evaluator {
    root: ExpressionSyntax;

    constructor(root: ExpressionSyntax) {
        this.root = root;
    }

    public evaluate(): number {
        return this.evaluateExpression(this.root);
    }

    private evaluateExpression(node: ExpressionSyntax): number {
        if (node instanceof NumberExpresstionSyntax) {
            return node.numberToken.value || 0;
        }

        if (node instanceof BinaryExpressionSyntax) {
            let leftNumber: number = this.evaluateExpression(node.leftToken);
            let rightNumber: number = this.evaluateExpression(node.rightToken);

            switch (node.operatorToken.kind) {
                case SyntaxKind.PlusToken:
                    return leftNumber + rightNumber;
                case SyntaxKind.MinusToken:
                    return leftNumber - rightNumber;
                case SyntaxKind.StarToken:
                    return leftNumber * rightNumber;
                case SyntaxKind.SlashToken:
                    return leftNumber / rightNumber;
                case SyntaxKind.PercentToken:
                    return leftNumber % rightNumber;
                default:
                    throw new Error(
                        `Unexpected binary operator ${node.operatorToken.value}`
                    );
            }
        }

        if (node instanceof ParenthesizedExpressionSyntax) {
            return this.evaluateExpression(node.expression);
        }

        throw new Error(`Unexpected node ${node.kind}`);
    }
}
