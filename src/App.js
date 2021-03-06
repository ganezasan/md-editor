import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { load } from './redux/emoji/actions';

import './App.css';
import { Editor, Viewer } from './components';
import 'react-tabs/style/react-tabs.css';

class App extends Component {
  state = {
    src: '# Hello world',
  };

  componentDidMount() {
    this.props.load();
  }

  onMarkdownChange = this.onMarkdownChange.bind(this);

  onMarkdownChange(md) {
    this.setState({
      src: md,
    });
  }

  render() {
    const { store } = this.props;
    const { src } = this.state;
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <p className="App-title">Md Editor</p>
          </header>
          <div className="App-main">
            <div className="editor-box">
              <Tabs style={{ height: '100%' }}>
                <TabList>
                  <Tab>Separate</Tab>
                  <Tab>Combine</Tab>
                </TabList>
                <TabPanel style={{ height: '100%' }}>
                  <SplitPane
                    split="vertical"
                    defaultSize="50%"
                    style={{
                      position: 'relative',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    <Editor src={src} onChangeSrc={this.onMarkdownChange} />
                    <Viewer src={src} />
                  </SplitPane>
                </TabPanel>
                <TabPanel style={{ height: '100%' }}>
                  <Tabs
                    style={{
                      height: '100%',
                    }}
                  >
                    <TabList>
                      <Tab>Write</Tab>
                      <Tab>Preview</Tab>
                    </TabList>
                    <TabPanel
                      style={{
                        height: '100%',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    >
                      <Editor src={src} onChangeSrc={this.onMarkdownChange} />
                    </TabPanel>
                    <TabPanel
                      style={{
                        height: '100%',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    >
                      <Viewer src={src} />
                    </TabPanel>
                  </Tabs>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  load,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
