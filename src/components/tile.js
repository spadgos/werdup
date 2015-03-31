var Tile,
    React = require('react');

module.exports = Tile = React.createClass({
  render: function () {
    var {letter, points} = this.props.data;
    return (
      <div className="tile">
        <div className="tile__letter">{letter}</div>
        <div className="tile__points">{points}</div>
      </div>
    );
  }
});
