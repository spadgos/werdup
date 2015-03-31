var WordList,
    {getWordsOfLength} = require('../lib/checker'),
    React = require('react');

module.exports = WordList = React.createClass({
  getInitialState: function () {
    return {
      len: 2,
      search: null
    };
  },

  componentDidMount: function () {
    // the plugin is only defined at document ready for some fucking reason
    $(document).ready(() => {
      const thisEl = React.findDOMNode(this);
      // this first line changes the selects
      $('select', thisEl).material_select();
      // this one binds to the new select. can't use React because of that ^
      $('select', thisEl).change(() => { this.changeWordLength(); });
    });
  },

  render: function () {
    return (
      <div className="wordList container">
        <div className="row">
          <div className="col s12">
            <select ref="lengthSelect" value={this.state.len}>
              <option value={2}>Two letter words</option>
              <option value={3}>Three letter words</option>
            </select>
          </div>
          <div className="col s12">
            <div className="input-field">
              <label htmlFor="wordList__search">Filter (use dots to mean 'any letter')</label>
              <input
                ref="search"
                type="text"
                id="wordList__search"
                className="wup-input"
                onInput={this.setSearch}
                maxLength={this.state.len}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ul className="wordList__list">
              {this.renderWords()}
            </ul>
          </div>
        </div>
      </div>
    );
  },

  renderWords: function () {
    return getWordsOfLength(this.state.len, this.state.search).map((word) => <li key={word}>{word}</li>);
  },

  changeWordLength: function () {
    this.setState({
      len: parseInt(React.findDOMNode(this.refs.lengthSelect).value, 10)
    });
  },

  setSearch: function (event) {
    this.setState({
      search: React.findDOMNode(this.refs.search).value.trim().toLowerCase()
    });
  }
});
