var form,  player, game;
var PlayerCount = 0,  GameState = 0;
var distance = 0, leftdistance = 0, rightdistance = 0, m=0;
var database, allplayers;
var player1, player2, players;
var trackimg, player1img, player2img, gameoverimg, trashimg;
var obstaclegrp;

function preload(){
    trackimg = loadImage("images/track.jpg");
    player1img = loadImage("images/player1_running1.png");
    player2img = loadImage("images/player2_running1.png");
    gameoverimg = loadImage("images/Gameoverimg.jpg");
    trashimg = loadImage("images/trash-obstacle1.png");

}

function setup(){
    createCanvas(displayWidth, displayHeight);
    database = firebase.database();
    game = new Game();
    game.GetState();
    game.Start();
    obstaclegrp = new Group();
}

function draw(){
    background(255);
    if(PlayerCount==2){
        game.Update(1);
    }
    if(GameState==1){
        game.Play();
    }
    if(GameState==2){
        game.End();
    }
}