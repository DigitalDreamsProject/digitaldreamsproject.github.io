/* Add new games here. Each game lives in /games/<id>/index.html */
window.GAMES = [
  {
    id: "stick-militia",
    title: "Stick Militia",
    short: "Shoot all enemies and win!",
    category: "Shooter",
    tags: ["Shooter", "Action", "Platformer"],
    thumb: "assets/stick-militia-thumb-sm.jpg",
    thumbLarge: "assets/stick-militia-thumb.jpg",
    path: "games/stick-militia/index.html",
    aspect: "896 / 596",
    levels: 100,
    description:
      "Fight your way through 100 levels across 8 rotating maps. Dodge bullets, guard, throw bombs and take down every enemy before they take you down. Includes touch controls for mobile.",
    controls: [
      ["← →", "Move"], ["↑", "Jump"], ["X", "Fire"], ["B", "Bomb"],
      ["V", "Dodge"], ["A", "Full guard"], ["Space", "Shield"], ["Z", "Punch"],
      ["M / Esc", "Level menu"], ["R", "Restart"], ["N", "Next level"], ["L", "Watch ad for +5 lives"]
    ],
    featured: true
  }
];
