var Sidebar;
var React = require('react');
var Link = require('react-router').Link;

module.exports = Sidebar = React.createClass({

  getDefaultProps: function () {
    return {
      items: [
        { name: 'WerdUp!',           target: 'home' },
        { name: 'Dictionary',        target: 'check' },
        { name: 'Short Word List',   target: 'word-list' },
        { name: 'Word Search',       target: 'search' },
        { name: 'Tile Distribution', target: 'tile-distribution' },
        { name: 'Score Card',        target: 'score-card' }
      ]
    };
  },

  componentDidMount: function () {
    $(React.findDOMNode(this.refs['button-collapse'])).sideNav({
      closeOnClick: true
    });
  },

  renderItems: function () {
    return this.props.items.map(function (item) {
      return (
        <li key={item.name}>
          <Link to={item.target}>{item.name}</Link>
        </li>
      );
    });
  },

  render: function () {
    return (
      <nav className="green">
        <ul id="slide-out" className="side-nav">
          {this.renderItems()}
        </ul>
        <a href="" data-activates="slide-out" className="button-collapse" ref="button-collapse"><i className="mdi-navigation-menu"></i></a>
      </nav>
    );
  }
});

