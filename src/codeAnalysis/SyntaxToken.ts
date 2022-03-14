import { SyntaxNode } from './SyntaxNode';
import { SyntaxKind } from './SyntaxKind';

export class SyntaxToken extends SyntaxNode {
    public override kind: SyntaxKind;
    public position: number;
    public text: string | null;
    public value: number | null;

    constructor(
        kind: SyntaxKind,
        position: number,
        text: string | null,
        value: number | null
    ) {
        super();
        this.kind = kind;
        this.position = position;
        this.text = text;
        this.value = value;
    }

    public getChildren(): null {
        return null;
    }
}
