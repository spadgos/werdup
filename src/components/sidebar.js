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


// var Item = React.createClass({

//   contextTypes: {
//     router: React.PropTypes.func.isRequired
//   },

//   render: function () {
//     var params = this.context.router.getCurrentParams();
//     var category = data.lookupCategory(params.category);
//     var item = data.lookupItem(params.category, params.name);
//     return (
//       <div>
//         <h2>{category.name} / {item.name}</h2>
//         <p>Price: ${item.price}</p>
//       </div>
//     );
//   }
// });

// var Index = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <p>Sidebar features:</p>
//         <ul style={{maxWidth: '400px'}}>
//           <li>User can open/close categories</li>
//           <li>
//             Visiting an item on first page load will automatically open
//             the correct category. (Click an item, then reload the
//             browser.)
//           </li>
//           <li>
//             Navigating with forward/back buttons will open an active
//             category if it is not already open. (Navigate to several
//             items, close all the categories, then use back/forward
//             buttons.)
//           </li>
//           <li>
//             Only the user can close a category. (Navigating from an
//             active category will not close it.)
//           </li>
//         </ul>
//       </div>
//     );
//   }
// });

// var routes = (
//   <Route handler={App}>
//     <DefaultRoute handler={Index}/>
//     <Route name="item" path=":category/:name" handler={Item} />
//   </Route>
// );

