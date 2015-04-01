var ScoreCard,
    Immutable = require('immutable'),
    ScoreCardSummary = require('../components/score-summary'),
    ScoreCardStore = require('../stores/score-card-store'),
    AppDispatcher = require('../dispatchers/app-dispatcher'),
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
    var buttons = ['2', '3', '4'].map((name, ind) => {
      var fn = this.setPlayers.bind(this, ind + 2);
      return (
        <div key={name} className="col s4">
          <button className="waves-effect waves-light btn" onClick={fn}>{name}</button>
        </div>
      );
    });

    return (
      <div>
        <h4>Number of players?</h4>
        <div className="playerSelect row">
          {buttons}
        </div>
      </div>
    );
  },

  setPlayers(num) {
    AppDispatcher.dispatch({
      actionType: 'newGame',
      numPlayers: num
    });
  },

  _onChange() {
    this.setState({
      card: ScoreCardStore.getState()
    });
  }
});
