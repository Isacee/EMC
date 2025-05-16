var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;
var player;
var score = 0;
var scoreText;


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('forest', 'assets/images/forest.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('john', 'assets/images/john.png');
    this.load.image('robux', 'assets/images/robux.png');
}

function create ()
{
    this.add.image(400, 300, 'forest');
    
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 580, 'ground').setScale(50, 1).refreshBody();

    platforms.create(600, 400, 'ground').setScale(5, 1).refreshBody();
    platforms.create(50, 250, 'ground').setScale(2, 1).refreshBody();
    platforms.create(750, 220, 'ground').setScale(3, 1).refreshBody();

    player = this.physics.add.image(100, 450, 'john').setScale(0.6,0.6).refreshBody();

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    robux = this.physics.add.group({
        key: 'robux',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    robux.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(robux, platforms);

    this.physics.add.overlap(player, robux, collectStar, null, this);

}


function update() {
    player.setVelocityX(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.flipX = false;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-450);
    }
}


function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('score: ' + score);

    if (robux.countActive(true) === 0) {
        robux.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
}




// {
//     this.add.image(400, 300, 'sky');

//     platforms = this.physics.add.staticGroup();

//     platforms.create(400, 568, 'ground').setScale(2).refreshBody();

//     platforms.create(600, 400, 'ground');
//     platforms.create(50, 250, 'ground');
//     platforms.create(750, 220, 'ground');
// }