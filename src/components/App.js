/* global Mixcloud */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Cover from './Cover';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';
import mixesData from '../data/mixes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentMix: '',
      mixIds: mixesData,
      mixes: [],
      mix: ''
    };
  }

  fetchMixes = async () => {
    const {mixIds} = this.state;

    mixIds.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com/${id}`);
        const data = await response.json();
        this.setState((prevState, props) => ({
          mixes: [...prevState.mixes, data]
        }));

        this.setState({
          mix: data
        });
      } catch (error) {}
    });
  };

  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);

    await this.widget.ready;

    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );

    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );
  };

  componentDidMount() {
    this.mountAudio();
    this.fetchMixes();
  }

  // Methods inside objecs
  actions = {
    togglePlay: () => {
      this.widget.togglePlay();
    },
    playMix: mixName => {
      const {currentMix} = this.state;

      if (mixName === currentMix) {
        return this.widget.togglePlay();
      }

      this.setState({
        currentMix: mixName
      });

      this.widget.load(mixName, true);
    }
  };

  render() {
    const [firstMix = {}] = this.state.mixes;
    return (
      <Router>
        <div className="App">
          {/* Page */}
          <div className="flex-l justify-end">
            {/* Cover */}
            <Cover {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
            <div className="w-50-l relative z-1">
              {/* Header */}
              <Header />
              {/* Pages */}
              <Route exact path="/" render={() => <Home {...this.state} {...this.actions} />} />
              <Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />} />
              <Route path="/about" render={() => <About {...this.state} />} />
            </div>
          </div>
          {/* Player */}
          <iframe
            ref={player => (this.player = player)}
            className="db fixed bottom-0 z-5"
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FLosBangeles%2Flbmx33-tone-of-voice-03-mo-luxe-for-los-bangeles%2F"
            frameBorder="0"
          ></iframe>
        </div>
      </Router>
    );
  }
}

export default App;
