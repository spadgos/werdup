var Search,
    Scrab = require('@spadgos/scrab').Game,
    dictionary = require('../lib/dictionary'),
    React = require('react');

module.exports = Search = React.createClass({
  getInitialState: function () {
    return {
      game: new Scrab(dictionary.slice()),
      tiles: '',
      options: {},
      hasOptions: false,
      optionsVisible: false,
    };
  },

  render: function () {
    var resultsEl = null;
    if (this.state.tiles.length >= 2) {
      var words = this.state.game.getWords(this.state.tiles, this.state.options);
      var wordEls = words.slice(0, 150)
        .map(function (result) {
          var score = result.score,
              word = result.word;
          return <div key={word}>{score}: {word}</div>;
        });
      if (words.length > 150) {
        wordEls.push(
          <div className="search__moreCount">...{words.length - 150} more...</div>
        );
      }
      resultsEl =
        <div className="search__results">
          <h4>Results</h4>
          {wordEls}
        </div>;
    }

    return (
      <div className="container" style={{marginTop: '1em'}}>
        <div className="input-field">
          <label htmlFor="search__tiles">
            Tiles
          </label>
          <input
            type="text"
            ref="tiles"
            id="search__tiles"
            className="wup-input"
            onInput={this.updateTiles}
          />
        </div>
        <section className="search__optionsSection">
          <a className="search__optionsTitle waves-effect waves-green btn-flat" onClick={this.toggleOptions}>
            {this.state.optionsVisible
                ? 'Less options...'
                : (this.state.hasOptions ? '*' : '') + 'More options...'}
          </a>
          <div className={'search__options ' + (this.state.optionsVisible ? 'isVisible' : '')}>
            <div className="input-field">
              <label htmlFor="search__boardTiles">
                Available tiles on the board
              </label>
              <input
                type="text"
                id="search__boardTiles"
                ref="boardTiles"
                onInput={this.updateOptions}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search__startsWith">
                Starts with...
              </label>
              <input
                type="text"
                id="search__startsWith"
                ref="startsWith"
                onInput={this.updateOptions}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search__endsWith">
                Ends with...
              </label>
              <input
                type="text"
                id="search__endsWith"
                ref="endsWith"
                onInput={this.updateOptions}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search__containsInAnyOrder">
                Contains letters in any order...
              </label>
              <input
                type="text"
                id="search__containsInAnyOrder"
                ref="containsInAnyOrder"
                onInput={this.updateOptions}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search__containsInOrder">
                Contains letters in order...
              </label>
              <input
                type="text"
                id="search__containsInOrder"
                ref="containsInOrder"
                onInput={this.updateOptions}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search__customRegex">
                Custom regex match...
              </label>
              <input
                type="text"
                id="search__customRegex"
                ref="customRegex"
                onInput={this.updateOptions}
              />
            </div>
            <a
              className="btn-flat waves-effect waves-red"
              style={{display: this.state.hasOptions ? 'inline' : 'none'}}
              onClick={this.clearOptions}>
              Clear options
            </a>
          </div>
        </section>
        {resultsEl}
      </div>
    );
  },

  updateTiles: function () {
    var tiles = this.getValue(this.refs.tiles);
    this.setState({
      tiles: tiles,
    });
  },

  getValue: function (ref) {
    return React.findDOMNode(ref).value.trim().toLowerCase();
  },

  clearOptions: function () {
    var refs = this.refs;
    [
      refs.customRegex,
      refs.startsWith,
      refs.endsWith,
      refs.containsInAnyOrder,
      refs.containsInOrder,
      refs.boardTiles,
    ].forEach(function (ref) {
      React.findDOMNode(ref).value = '';
    });
    this.setState({
      options: {},
      hasOptions: false,
    });
  },

  updateOptions: function () {
    var refs = this.refs;
    var regexStr = this.getValue(refs.customRegex);
    var customRegex;
    try {
      customRegex = new RegExp(regexStr);
    } catch (e) {}

    var options = {
      startsWith: this.getValue(refs.startsWith),
      endsWith: this.getValue(refs.endsWith),
      containsInAnyOrder: this.getValue(refs.containsInAnyOrder),
      containsInOrder: this.getValue(refs.containsInOrder),
      customRegex: customRegex,
      boardTiles: this.getValue(refs.boardTiles).split(/(?:\s*,\s*|\s+)/).filter(Boolean),
    };
    var hasOptions =
         options.startsWith
      || options.endsWith
      || options.containsInAnyOrder
      || options.containsInOrder
      || options.boardTiles.length
      || regexStr;

    this.setState({
      options: options,
      hasOptions: !!hasOptions
    });
  },

  toggleOptions: function () {
    this.setState({
      optionsVisible: !this.state.optionsVisible,
    });
  }
});
