import {
    Evaluator,
    Parser,
    SyntaxKind,
    SyntaxNode,
    SyntaxToken,
    SyntaxTree,
} from './codeAnalysis';

const content: string = '2 + 3 * 2 - 0 + 10';

const parser: Parser = new Parser(content);
const syntaxTree: SyntaxTree = parser.parse();

console.log('\x1b[32m', prettyPrint(syntaxTree.root), '\x1b[37m');

if (syntaxTree.diagnositics.length) {
    syntaxTree.diagnositics.forEach((errorMsg: string) => {
        console.log('\x1b[31m', errorMsg, '\x1b[37m');
    });
} else {
    let evaluator = new Evaluator(syntaxTree.root);
    let result = evaluator.evaluate();
    console.log(result);
}

function prettyPrint(node: SyntaxNode, indent: string = ''): string {
    let lineStr: string = '\n';
    lineStr += indent;

    if (node.kind !== SyntaxKind.EndOfFileToken) lineStr += node.kind;

    if (node instanceof SyntaxToken && node.value) {
        lineStr += ' ' + node.value;
    }

    indent += '    ';

    let child: Array<SyntaxNode> | null = node.getChildren();

    if (Array.isArray(child)) {
        child.forEach((item: SyntaxNode): void => {
            lineStr += prettyPrint(item, indent);
        });
    }

    return lineStr;
}
