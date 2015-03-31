'use strict';

var ScoreCard,
    Immutable = require('immutable'),
    ScoreCardSummary = require('../components/score-summary'),
    ScoreCardStore = require('../stores/score-card-store'),
    AppDispatcher = require('../dispatchers/app-dispatcher'),
    PlayerSelect = require('../components/player-select'),
    React = require('react');

module.exports = ScoreCard = React.createClass({

  getInitialState() {
    return {
      card: ScoreCardStore.getState()
    };
  },

  componentWillMount () {
    ScoreCardStore.addChangeListener(this._onChange);
  },

  componentDidUpdate() {
    $(document).ready(() => {
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger', React.findDOMNode(this)).not('[data-modalized]').attr('data-modalized', true).leanModal();
    });
  },

  render () {
    const started = this.state.card.get('started'),
          playerSelectClass = 'scoreCard__section ' + (started ? 'scoreCard__hidden' : ''),
          scoreCardClass = 'scoreCard__section ' + (started ? '' : 'scoreCard__hidden');

    return (
      <div className="scoreCard container">
        <div className="scoreCard__sectionContainer">
          <div className={playerSelectClass}>
            <PlayerSelect />
          </div>
          <div className={scoreCardClass}>
            {this.renderScoreCard()}
          </div>
        </div>
        <div id="restartConfirmModal" className="modal">
          <div className="modal-content">
            <h4>Restart game?</h4>
          </div>
          <div className="modal-footer">
            <a className="waves-effect waves-red btn-flat modal-action modal-close" onClick={this.restart}>Yes, restart</a>
            <a className="waves-effect waves-green btn-flat modal-action modal-close">No, continue this game</a>
          </div>
        </div>

      </div>
    );
  },

  renderScoreCard() {
    var card = this.state.card,
        activePlayer = card.get('activePlayer'),
        undoDisabled = !card.get('canUndo');

    return (
      <div>
        <ScoreCardSummary />
        <div className="row scoreCard__actions">
          <div className="col s4">
            <form onSubmit={this.submitScore}>
              <input
                className="scoreCard__input"
                placeholder="Score"
                type="number"
                ref="input"
                /* http://www.scrabulizer.com/blog/post/3 */
                min="0" max="2069"
              />
            </form>
          </div>
          <div className="col s4">
            <button className="waves-effect waves-light btn" onClick={this.submitScore}>
              <i className="hide-on-med-and-up mdi-action-done"></i>
              <span className="hide-on-small-only">OK</span>
            </button>
          </div>
          <div className="col s4">
            <button className="waves-effect waves-light btn" onClick={this.undo} disabled={undoDisabled}>
              <i className="hide-on-med-and-up mdi-content-undo"></i>
              <span className="hide-on-small-only">Undo</span>
            </button>
          </div>
          <div className="col offset-s8 s4">
            <a className="waves-effect waves-light btn modal-trigger" href="#restartConfirmModal">
              <i className="hide-on-med-and-up mdi-av-loop"></i>
              <span className="hide-on-small-only">Restart</span>
            </a>
          </div>
        </div>
        <div className="row">
          {this.renderDetails()}
        </div>
      </div>
    );
  },

  renderDetails() {
    const numPlayers = this.state.card.get('numPlayers'),
          cols = 12 / numPlayers;
    var progressiveScores,
        turn, numTurns,
        player,
        score, total,
        content;

    // playerNum -> turnNum -> [score, total]
    progressiveScores = Immutable.Range(0, numPlayers).map((playerNum) => {
      var total = 0;
      return this.state.card.getIn(['scores', playerNum]).map((score) => {
        total += score;
        return [score, total];
      });
    }).toJS();
    content = [];
    for (turn = 0, numTurns = (progressiveScores[0] || []).length; turn < numTurns; ++turn) {
      for (player = 0; player < numPlayers; ++player) {
        if (!progressiveScores[player] || !progressiveScores[player][turn]) {
          score = total = '.';
        } else {
          [score, total] = progressiveScores[player][turn];
        }
        content.push(
          <div key={`player${player}turn${turn}`}>
            <div className={'col s' + (cols - 1) + ' light-green lighten-4'}>{total}</div>
            <div className="col s1 green lighten-4">{score}</div>
          </div>
        );
      }
    }
    return (
      <div className="scoreCard__details row">
        {content}
      </div>
    );
  },

  undo() {
    AppDispatcher.dispatch({ actionType: 'undoScore' });
  },

  restart() {
    AppDispatcher.dispatch({ actionType: 'endGame'})
  },

  submitScore(event) {
    event.preventDefault();
    var input = React.findDOMNode(this.refs.input),
        value = Math.floor(input.valueAsNumber);
    if (value != null && value >= 0) {
      AppDispatcher.dispatch({
        actionType: 'addScore',
        points: value
      });
      input.value = '';
    }
  },


  _onChange() {
    this.setState({
      card: ScoreCardStore.getState()
    });
  }
});
