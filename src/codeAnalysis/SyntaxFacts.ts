import { SyntaxKind } from './SyntaxKind';

export class SyntaxFacts {
    public static getBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.StarToken:
            case SyntaxKind.SlashToken:
            case SyntaxKind.PercentToken:
                return 2;
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 1;
            default:
                return 0;
        }
    }
}
