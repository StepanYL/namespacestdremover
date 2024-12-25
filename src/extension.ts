import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) 
{
    let disposable = vscode.commands.registerCommand('namespacestdremover.fixNamespaces', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) 
        {
            vscode.window.showInformationMessage('No active text editor');
            return;
        }
        const document = editor.document;
        const text = document.getText();

        const withoutNamespace = text.replace(/^\s*using\s+namespace\s+std\s*;\s*\n?/gm, '');
        const stdRegex = /(?<!\.|::|<)\b(begin|end|reverse|min|max|ios_base|cin|cout|string|vector|map|set|queue|stack|list|unordered_map|unordered_set|make_pair|make_tuple|endl|to_string|sort|find)\b/g;

        const fixedText = withoutNamespace.replace(stdRegex, 'std::$1');

        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

        edit.replace(document.uri, fullRange, fixedText);
        await vscode.workspace.applyEdit(edit);

        vscode.window.showInformationMessage('"using namespace std;" removed and namespaces fixed!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}