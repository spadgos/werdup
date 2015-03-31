var _ = require('lodash');
var Immutable = require('immutable');

var AppDispatcher = require('../dispatchers/app-dispatcher');
// var ContestsAsyncRequests = require('../utils/ContestsAsyncRequests');
var Store = require('./store');

var EMPTY_STATE = Immutable.fromJS({
  started: false,
  activePlayer: 0,
  numPlayers: 2,
  scores: [[], [], [], []],
  canUndo: false
});

var cardState,
    prevStates,
    MAX_UNDO = 250;

var ScoreCardStore = _.assign(new Store(), {
  getState() {
    return cardState;
  },
  getTotal(player) {
    return cardState.getIn(['scores', player]).reduce((total, n) => total + n, 0);
  }
});
module.exports = ScoreCardStore;

ScoreCardStore.dispatchToken = AppDispatcher.register((action) => {

  switch (action.actionType) {
    case 'init':
    case 'endGame':
      prevStates = [];
      cardState = EMPTY_STATE;
      break;
    case 'newGame':
      prevStates = [];
      cardState = EMPTY_STATE.merge({
        activePlayer: 0,
        numPlayers: action.numPlayers,
        started: true
      });
      break;

    case 'addScore':
      var points = action.points,
          activePlayer = cardState.get('activePlayer'),
          activePlayerScores = cardState.getIn(['scores', activePlayer]);

      prevStates.push(cardState);
      if (prevStates.length > MAX_UNDO) {
        prevStates.shift();
        prevStates[0] = prevStates[0].set('canUndo', false);
      }
      cardState = cardState
        .merge({
          activePlayer: (activePlayer + 1) % cardState.get('numPlayers'),
          canUndo: true
        })
        .setIn(['scores', activePlayer], activePlayerScores.push(points));
      break;

    case 'undoScore':
      cardState = prevStates.pop();
      break;
    default:
      return;
  }

  ScoreCardStore.emitChange();
});

