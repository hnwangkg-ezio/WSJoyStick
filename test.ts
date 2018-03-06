WSJoyStick.JoyStickInit()
WSJoyStick.PlayMusic(294, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(330, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(349, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(392, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(440, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(494, music.beat(BeatFraction.Whole))
WSJoyStick.PlayMusic(523, music.beat(BeatFraction.Whole))
basic.forever(() => {
    if (WSJoyStick.Listen_Rocker(DIR.UP)) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.DOWN)) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.LEFT)) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.RIGHT)) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.UP_LEFT)) {
        basic.showLeds(`
            # # # # .
            # # . . .
            # . # . .
            # . . # .
            . . . . #
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.UP_RIGHT)) {
        basic.showLeds(`
            . # # # #
            . . . # #
            . . # . #
            . # . . #
            # . . . .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.DOWN_LEFT)) {
        basic.showLeds(`
            . . . . #
            # . . # .
            # . # . .
            # # . . .
            # # # # .
            `)
    } else if (WSJoyStick.Listen_Rocker(DIR.DOWN_RIGHT)) {
        basic.showLeds(`
            # . . . .
            . # . . #
            . . # . #
            . . . # #
            . # # # #
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.JOYSTICK_PRESS)) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_A)) {
        basic.showLeds(`
            . . # . .
            . # . # .
            . # # # .
            . # . # .
            . . . . .
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_B)) {
        basic.showLeds(`
            . # . . .
            . # . . .
            . # # # .
            . # . # .
            . # # # .
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_C)) {
        basic.showLeds(`
            . . # # .
            . # . . .
            . # . . .
            . # . . .
            . . # # .
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_D)) {
        basic.showLeds(`
            . # # . .
            . # . # .
            . # . # .
            . # . # .
            . # # . .
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_E)) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # # .
            . # . . .
            . # # # .
            `)
    } else if (WSJoyStick.Listen_Key(BUTTON.KEY_F)) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # # .
            . # . . .
            . # . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})

