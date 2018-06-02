const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const colourRegex = /(^[a-zA-Z]+$)|(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))/;

function activate() {
  
  addMarginColours();
  vscode.window.onDidChangeTextEditorSelection(addMarginColours);
  // vscode.workspace.onDidChangeTextDocument(addMarginColours);
}

function addMarginColours() {
  const { document } = vscode.window.activeTextEditor;

  for (let i = 0, len = document.lineCount; i < len; i++) {
    const line = document.lineAt(i).text;
    const matches = line.match(colourRegex);
    if (matches) {
      addColourToLine(matches[0], i);
    }
  }
}

function addColourToLine(colour, line) {
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
