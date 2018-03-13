'use babel';

import FountainHtmlView from './fountain-html-view';
import { CompositeDisposable } from 'atom';

export default {

  fountainHtmlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fountainHtmlView = new FountainHtmlView(state.fountainHtmlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fountainHtmlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fountain-html:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fountainHtmlView.destroy();
  },

  serialize() {
    return {
      fountainHtmlViewState: this.fountainHtmlView.serialize()
    };
  },

  toggle() {
    console.log('FountainHtml was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
