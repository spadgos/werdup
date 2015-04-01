var AppDispatcher = require('./dispatchers/app-dispatcher');
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Sidebar = require('./components/sidebar');
var pages = {
  index: require('./pages/index'),
  checker: require('./pages/checker'),
  wordList: require('./pages/word-list'),
  tileDistribution: require('./pages/tile-distribution'),
  scoreCard: require('./pages/score-card')
};

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  componentWillMount: function () {
    AppDispatcher.dispatch({ actionType: 'init' });
    var preloader = document.getElementsByClassName('preloader-wrapper')[0];
    preloader.parentNode.removeChild(preloader);
  },

  render: function () {
    return (
      <div>
        <Sidebar/>
        <div className="Content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute handler={pages.index}/>
    <Route name="check" path="/check" handler={pages.checker} />
    <Route name="word-list" path="/word-list" handler={pages.wordList} />
    <Route name="tile-distribution" path="/tile-distribution" handler={pages.tileDistribution} />
    <Route name="score-card" path="/score-card" handler={pages.scoreCard} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

module.exports = App;
