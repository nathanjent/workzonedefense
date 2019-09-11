/// <reference types="phaser" />

new Phaser.Game({
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
    this.load.image('cone', 'assets/sprites/orange-traffic-cone-256.png', {
        frameWidth: 32,
        framHeight: 24,
    });
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

    let group = this.add.group({
        key: 'cone',
        frame: [0, 1, 2, 3, 4, ],
        frameQuantity: 20,
    });

    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 10,
        height: 10,
        cellWidth: 32,
        cellHeight: 32,
        x: 100,
        y: 100
    });
}

function update () {
}
