import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import './App.css';
import { Editor, Viewer } from './components';

class App extends Component {
  state = {
    src: '# Hello world',
  };

  onMarkdownChange = this.onMarkdownChange.bind(this);

  onMarkdownChange(md) {
    this.setState({
      src: md,
    });
  }

  render() {
    const { src } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Md Editor</p>
        </header>
        <div className="App-main">
          <SplitPane split="vertical" defaultSize="50%">
            <Editor src={src} onChangeSrc={this.onMarkdownChange} />
            <Viewer src={src} />
          </SplitPane>
        </div>
      </div>
    );
  }
}

export default App;
