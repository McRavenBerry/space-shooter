// Background
game.splash("Battlefield Galactica")
effects.starField.startScreenEffect()
// Set Score and Life 
info.player1.setLife(1)
info.player1.setScore(0)
// Spaceship
let spaceship = sprites.create(img`
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . 8 c d 8 . . . . . .
    . . . . . 8 8 c b 8 8 . . . . .
    . . . . 8 8 6 f f 6 8 8 . . . .
    . . . . 8 . . c 6 . . 8 . . . .
    . . . 8 . . . f f . . . 8 . . .
    . . . . . . . 8 6 . . . . . . .
    . . . . . . 8 8 9 8 . . . . . .
    . . . . . . 8 6 9 8 . . . . . .
    . . . . . c c c 8 8 8 . . . . .
    . . . . 8 8 6 6 6 9 8 8 . . . .
    . . 8 f f f c c e e f f 8 8 . .
    . 8 8 8 8 8 8 6 6 6 6 9 6 8 8 .
    8 8 8 8 8 8 8 8 6 6 6 9 6 6 8 8
    8 8 8 8 8 8 8 8 6 6 6 6 9 6 8 8
`)
spaceship.setPosition(75, 111)
spaceship.setKind(SpriteKind.Player)
controller.moveSprite(spaceship, 100, 0)
// Spawn asteroids
game.onUpdateInterval(1000, function spawner() {
    let yVel = randint(20, 50)
    let asteroid = sprites.createProjectileFromSprite(img`
        . . . . . . . c c c a c . . . .
        . . c c b b b a c a a a c . . .
        . c c a b a c b a a a b c c . .
        . c a b c f f f b a b b b a . .
        . c a c f f f 8 a b b b b b a .
        . c a 8 f f 8 c a b b b b b a .
        c c c a c c c c a b c f a b c c
        c c a a a c c c a c f f c b b a
        c c a b 6 a c c a f f c c b b a
        c a b c 8 6 c c a a a b b c b c
        c a c f f a c c a f a c c c b .
        c a 8 f c c b a f f c b c c c .
        . c b c c c c b f c a b b a c .
        . . a b b b b b b b b b b b c .
        . . . c c c c b b b b b c c . .
        . . . . . . . . c b b c . . . .
    `, null, 0, yVel)
    let xPos = randint(0, scene.screenWidth())
    asteroid.setPosition(xPos, 0)
    asteroid.setKind(SpriteKind.Enemy)
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
})
// Set up the fire button
controller.A.onEvent(ControllerButtonEvent.Pressed, function fire() {
    let laser = sprites.createProjectileFromSprite(img`
        . . . . . . 5 5 5 . . . . . . .
        . . . . . 5 5 1 5 5 . . . . . .
        . . . . . 5 1 1 1 5 . . . . . .
        . . . . . 5 1 1 1 5 . . . . . .
        . . . . . . 5 1 5 . . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . . . 5 . . . . . . . .
        . . . . . . . 5 . . . . . . . .
        . . . . . . . 5 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spaceship, 0, -50)
    laser.setKind(SpriteKind.Projectile)
    music.pewPew.play()
    laser.setFlag(SpriteFlag.AutoDestroy, true)
})
// Check for collisions
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function collision(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.fire, 100)
    scene.cameraShake(20, 1000)
    music.bigCrash.play()
    pause(1000)
    info.player1.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function hit(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()
    otherSprite.destroy(effects.fire, 100)
    scene.cameraShake(5, 100)
    music.bigCrash.play()
    info.player1.changeScoreBy(1)
})
//  Creates a list of sprites to screen wrap
let sprites_to_wrap : Sprite[] = []
sprites_to_wrap.push(spaceship)
//  Screen wrap code
game.onUpdate(function on_on_update() {
    for (let value of sprites_to_wrap) {
        if (value.left > scene.screenWidth()) {
            value.right = 0
        } else if (value.right < 0) {
            value.left = scene.screenWidth()
        }
        
        if (value.bottom < 0) {
            value.top = scene.screenHeight()
        } else if (value.top > scene.screenHeight()) {
            value.bottom = 0
        }
        
    }
})
