var TileDistribution,
    Tile = require('../components/tile'),
    Tiles = require('../lib/tiles'),
    React = require('react');

module.exports = TileDistribution = React.createClass({

  render: function () {
    var tiles = Tiles.getTileDistribution().map((tile) => {
      return (
        <div className="tileDistribution__freq" key={tile.letter}>
          <Tile data={tile} /> x {tile.frequency}
        </div>
      );
    });
    return (
      <div className="tileDistribution container">
        {tiles}
      </div>
    );
  },
});
