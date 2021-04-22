class Form{
    constructor(){
        this.title = createElement('h1');
        this.title.html("Marathon");
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.greeting = createElement('h3');
    }
    hide(){
        this.title.hide();
        this.button.hide();
        this.input.hide();
        this.greeting.hide();
    }
    display(){
        this.title.position(displayWidth/2, displayHeight/5);
        this.input.position(displayWidth/2, displayHeight/3);
        this.button.position(displayWidth/2, displayHeight/2);
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            PlayerCount = PlayerCount + 1;
            player.index = PlayerCount;
            player.update();
            player.updatecount(PlayerCount);
            this.greeting.html("Hello! " + player.name);
            this.greeting.position(displayWidth/2,displayHeight/2);
        })
    }
}