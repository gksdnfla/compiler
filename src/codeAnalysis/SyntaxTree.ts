import { sealed } from '../utils';
import { ExpressionSyntax } from './ExpressionSyntax';
import { SyntaxToken } from './SyntaxToken';

@sealed
export class SyntaxTree {
    private _root: ExpressionSyntax;
    private _endOfFileToken: SyntaxToken | null;
    private _diagnositics: Array<string>;
    public get root(): ExpressionSyntax {
        return this._root;
    }
    public get endOfFileToken(): SyntaxToken | null {
        return this._endOfFileToken;
    }
    public get diagnositics(): Array<string> {
        return this._diagnositics;
    }

    constructor(
        diagnositics: Array<string>,
        root: ExpressionSyntax,
        endOfFileToken: SyntaxToken | null
    ) {
        this._diagnositics = diagnositics;
        this._root = root;
        this._endOfFileToken = endOfFileToken;
    }
}
