/// <reference types="phaser" />

var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200,
            },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
});

function preload () {
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/logo.png');
    this.load.image('red', 'assets/particles/red.png');
    this.load.image('cone', 'assets/sprites/orange-traffic-cone-256.png');
}

function create () {
    this.add.image(400, 300, 'sky'); 
    let particles = this.add.particles('red'); 
    let emitter = particles.createEmitter({ 
        speed: 100, 
        scale: { start: 1, end: 0 }, 
        blendMode: 'ADD' 
    }); 

    let logo = this.physics.add.image(100, 100, 'logo'); 
    logo.setVelocity(100, 200); 
    logo.setBounce(1, 1); 
    logo.setCollideWorldBounds(true); 
    emitter.startFollow(logo); 

    //make an align grid
    var grid = new AlignGrid(3, 9);

    //turn on the lines for testing and layout
    grid.show();

    for (var i = 0; i < 3; i++) {
        var cone = game.add.sprite(0, 0, "cone");
        cone.anchor.set(0.5, 0.5);

        //pick a random row
        var yy = game.rnd.integerInRange(0, 8);

        //place the cone at i for the column
        //and yy as the random row
        grid.placeAt(i, yy, cone);
    }
}

function update () {
}
