/* eslint-env mocha */
/* eslint-disable no-unused-expressions, global-require */

const vscode = require('vscode');
const mockery = require('mockery');
const sinon = require('sinon');
const { expect } = require('chai');

describe('margin-colours', () => {
  let marginColours;

  let changeTextEditorSpy;
  let createDecorationSpy;
  let setDecorationsSpy;
  let lineAtSpy;
  let writeFileSpy;

  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  beforeEach(() => {
    mockery.registerMock('vscode', {
      Range: vscode.Range,
      Position: vscode.Position,
      window: {
        activeTextEditor: {
          document: {
            lineCount: 50,
            lineAt: lineAtSpy = sinon.fake.returns({ text: 'myColour: #123456' })
          },
          setDecorations: setDecorationsSpy = sinon.spy()
        },
        onDidChangeTextEditorSelection: changeTextEditorSpy = sinon.spy(),
        createTextEditorDecorationType: createDecorationSpy = sinon.spy()
      }
    });
    mockery.registerMock('fs', {
      writeFileSync: sinon.spy()
    });
    marginColours = require('../src/extension');
  });

  describe('activate', () => {
    beforeEach(() => {
      marginColours.activate();
    });

    it('adds margin colours to active editor\'s file', () => {
      expect(setDecorationsSpy).to.have.been.called;
    });

//     it('generates one svg file for each unique colour', () => {

//     });

//     it('adds svg image to each line with colour', () => {

//     });

//     it('finds hex colours', () => {});

//     it('finds rgb colours', () => {});

//     it('finds rgba colours', () => {});

//     it('finds hsl colours', () => {});

//     it('uses first colour if a line contains two colour strings', () => {

//     });
//   });

//   describe('deactivate', () => {

  });
});
