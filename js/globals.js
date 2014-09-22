var GAMEWIDTH = 512;
var GAMEHEIGHT = 512;

var INITSTATE = 0;
var MENUSTATE = 1;
var GAMESTATE = 2;

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var X = 88;
var Z = 90;
var A = 65;
var W = 87;
var D = 68;
var S = 83;

// KEY INFORMATION
var KEYDOWN = 0;
var KEYUP = 1; // this is an event on keyup, should change to KEYSTATIC after event is handled
var KEYSTATIC = 2;

// Entity Types
var PADDLE = 0;
var BALL = 1;
var WALL = 2;