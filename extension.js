const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// var MAX_ICONS = 99;

function activate(context) {
  vscode.window.showInformationMessage('margin colours activated!');

  vscode.window.onDidChangeTextEditorSelection(onTextChange);
  addMarginColours();

    // var decorations = createDecorations();

    // function setRelativeLineDecorations() {
    //     var editor = vscode.window.activeTextEditor;

    //     if (!editor)
    //         return;

    //     var selection = editor.selection;
    //     var text = editor.document.getText(selection);

    //     var line = editor.selection.active.line;
    //     var totalLines = editor.document.lineCount;

    //     for (var delta = 1; delta < MAX_ICONS; delta++) {
    //         var rangesForDecoration = [];

    //         // Check upwards
    //         if (line - delta >= 0) {
    //             rangesForDecoration.push(new vscode.Range(line - delta, 0, line - delta, 0));
    //         }

    //         // Check downwards
    //         if (line + delta < totalLines) {
    //             rangesForDecoration.push(new vscode.Range(line + delta, 0, line + delta, 0));
    //         }

    //         editor.setDecorations(decorations[delta - 1], rangesForDecoration);
    //     }
    // }

    // function clearRelativeLineDecorations() {
    //     var editor = vscode.window.activeTextEditor;

    //     if (!editor)
    //         return;

    //     decorations.forEach((d) => {
    //         editor.setDecorations(d, []);
    //     });
    // }
}

function onTextChange(event) {

}
const colourRegex = /(^[a-zA-Z]+$)|(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))/;

function addMarginColours() {
  const editor = vscode.window.activeTextEditor;
  const { document } = editor;

  for (let i = 0, len = document.lineCount; i < len; i++) {
    const line = document.lineAt(i).text;
    const matches = line.match(colourRegex);
    if (matches) {
      addColour(matches[0], i);
    }
  }
}

function addColour(colour, line) {
  const editor = vscode.window.activeTextEditor;
  const maxSize = 18;
  const size = 12;
  const offset = (maxSize - size) * 0.5;

  const svgContent =
`<svg xmlns="http://www.w3.org/2000/svg" width="${maxSize}" height="${maxSize}">
  <rect width="${size}" height="${size}" x="${offset}" y="${offset}" rx="2" ry="2" style="fill:${colour};" />
</svg>`;

  const filePath = path.resolve(__dirname, `./images/colour-${colour}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');

  const decoration = vscode.window.createTextEditorDecorationType({
    gutterIconPath: filePath,
    gutterIconSize: '100%'
  });
  
  const start = new vscode.Position(line, 0);
  const end = new vscode.Position(line, 1);
  editor.setDecorations(decoration, [new vscode.Range(start, end)]);
}

// this method is called when your extension is deactivated
function deactivate() {

}

module.exports = {
  activate,
  deactivate
};
