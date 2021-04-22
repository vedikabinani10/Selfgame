class Game{
    constructor(){

    }
    GetState(){
        var GameStateref = database.ref('GameState');
        GameStateref.on("value",(data)=>{
            GameState = data.val();
        })
    }
    Update(State){
        database.ref('/').update({
            GameState : State
        });
    }
    async Start(){
        if(GameState==0){
            player = new Player();
            var playercountref = await database.ref('PlayerCount').once("value");
            if(playercountref.exists()){
                PlayerCount = playercountref.val();
                player.getcount();
            }
            form = new Form();
            form.display();
        }
        player1 = createSprite(250,displayHeight*5,30,30);
        player1.scale = 0.25;
        player1.addImage("player1",player1img);
        player2 = createSprite(550,displayHeight*5,30,30);
        player2.scale = 0.5;
        player2.addImage("player2",player2img);
        players = [player1,player2];
    }
    Play(){
        form.hide();
        Player.getplayerinfo();
        if(allplayers != undefined){
            background("blue");
            image(trackimg,0,-displayHeight*4.2,displayWidth,displayHeight*5.5);

            var index = 0;
            var y;
            var x;
            for(var i in allplayers){
                index = index + 1;
                x = allplayers[i].xdistance;
                y = displayHeight - allplayers[i].distance;
                
                if(keyIsDown(LEFT_ARROW)){
                    x = players[index-1].x-5;
                    players[index - 1].x= x;
                    player.xdistance = players[index - 1].x;
                    player.update();

                }
                else if(keyIsDown(RIGHT_ARROW)){
                    x = players[index-1].x+5;
                    players[index - 1].x= x;
                    player.xdistance = players[index - 1].x;
                    player.update();
                }
                
                players[index - 1].y = y;
                if(index == player.index){
                    camera.position.x = displayWidth/2;
                    camera.position.y = players[index - 1].y;
                }
            }
        }
        if(keyIsDown(UP_ARROW) && player.index != null){
            player.distance = player.distance + 10;
            player.update();
        }
      
        if(player.distance>3000){
            GameState = 2;
        }
        
            if(frameCount%60==0){

                var obstacle = createSprite(random(player1.x,player2.x),0,20,20);
                obstacle.addImage("trash",trashimg);
                obstacle.scale = 0.1;
                obstacle.velocityY=5
                obstacle.lifetime = displayHeight/3;
                obstaclegrp.add(obstacle);
        }
        for(var i in players){
        if(obstaclegrp.isTouching(players[i])){
            player.distance = player.distance - 10;
            player.update();
        }
    }
        drawSprites();
    }
    End(){
        console.log("gameover");
        image(gameoverimg,0,-displayHeight*3.5,displayWidth,displayHeight);
    }
}