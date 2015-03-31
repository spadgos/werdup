var Checker,
    React = require('react'),
    {check} = require('../lib/checker');

module.exports = Checker = React.createClass({
  getInitialState: function () {
    return {
      ok: false,
      known: false
    };
  },

  render: function () {
    return (
      <div className="container" style={{marginTop: '1em'}}>
        <input type="text" ref="word" className="checkerInput wup-input" onInput={this.checkWord} />
        <div className={'results' + (this.state.known ? '' : ' unknown')}>
          {this.renderResult()}
        </div>
      </div>
    );
  },

  renderResult: function () {
    var cls = 'ok-result '+ (this.state.ok ? 'ok' : 'not-ok'),
        iconCls = 'ok-icon ' + (this.state.ok ? 'mdi-navigation-check' : 'mdi-navigation-cancel');
    return (
      <div className={cls}>
        <i className={iconCls}></i>
        is <b>not</b> a word!
      </div>
    );
  },

  checkWord: function (event) {
    var word = React.findDOMNode(this.refs.word).value.trim().toLowerCase();
    if (word.length > 1) {
      this.setState({
        ok: check(word),
        known: true
      });
    } else {
      this.setState({ known: false });
    }
  }
});
