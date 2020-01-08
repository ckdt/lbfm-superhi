/* global Mixcloud */
import React, {Component} from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentMix: ''
    };
  }

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

  // when loaded, mount audio
  componentDidMount() {
    this.mountAudio();
  }

  togglePlay = () => {
    this.widget.togglePlay();
  };

  playMix = mixName => {
    this.widget.load(mixName, true);
  };

  render() {
    return (
      <iframe
        className="db fixed bottom-0 z5"
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FLosBangeles%2Flbmx33-tone-of-voice-03-mo-luxe-for-los-bangeles%2F"
        frameBorder="0"
        ref={player => (this.player = player)}
      ></iframe>
    );
  }
}

export default Player;
