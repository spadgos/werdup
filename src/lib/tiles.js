/*
2 blank tiles (scoring 0 points)
1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
2 points: D ×4, G ×3
3 points: B ×2, C ×2, M ×2, P ×2
4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
5 points: K ×1
8 points: J ×1, X ×1
10 points: Q ×1, Z ×1
*/
const _ = require('lodash');

const tiles = _.map({
  a: [1, 9],
  b: [3, 2],
  c: [3, 2],
  d: [2, 4],
  e: [1, 12],
  f: [4, 2],
  g: [2, 3],
  h: [4, 2],
  i: [1, 9],
  j: [8, 1],
  k: [5, 1],
  l: [1, 4],
  m: [3, 2],
  n: [1, 6],
  o: [1, 8],
  p: [3, 2],
  q: [10, 1],
  r: [1, 6],
  s: [1, 4],
  t: [1, 6],
  u: [1, 4],
  v: [4, 2],
  w: [4, 2],
  x: [8, 1],
  y: [4, 2],
  z: [10, 1],
  ' ': [0, 2]
}, ([points, frequency], letter) => {
  return {
    letter,
    points,
    frequency
  };
});

module.exports = {
  getTileDistribution
};

function getTileDistribution() {
  return tiles;
}
