// Background
effects.starField.startScreenEffect()
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
spaceship.setStayInScreen(true)
