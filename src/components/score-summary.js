var ScoreCard,
    Immutable = require('immutable'),
    ScoreCardStore = require('../stores/score-card-store'),
    React = require('react');

module.exports = ScoreCard = React.createClass({
  componentWillMount () {
    ScoreCardStore.addChangeListener(this._onChange);
  },

  getInitialState() {
    return {
      card: ScoreCardStore.getState()
    };
  },

  render () {
    var numPlayers = this.state.card.get('numPlayers'),
        cols = 12 / numPlayers,
        content = Immutable.Range(0, numPlayers).map((playerNum) => {
          var total = ScoreCardStore.getTotal(playerNum),
              isActive = this.state.card.get('activePlayer') === playerNum,
              activeClass = isActive ? 'lighten-4' : 'lighten-5';
          return (
            <div key={playerNum} className={'playerScore col s' + cols + ' green ' + activeClass}>
              <div className="playerScore__playerName">Player {playerNum + 1}</div>
              <div className="playerScore__score">{total}</div>
            </div>
          );
        });
    return (
      <div className="row">
        {content}
      </div>
    );
  },

  _onChange() {
    this.setState({
      card: ScoreCardStore.getState()
    });
  }
});
