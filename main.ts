/*****************************************************************************
* | File      	:	WSJoyStick
* | Author      :   Waveshare team
* | Function    :	Contorl JoyStick
* | Info        :
*----------------
* |	This version:   V1.0
* | Date        :   2018-02-06
* | Info        :   Basic version
*
******************************************************************************/
enum DIR {
    NONE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
    UP_LEFT = 5,
    UP_RIGHT = 6,
    DOWN_LEFT = 7,
    DOWN_RIGHT = 8
}

enum BUTTON {
    JOYSTICK_PRESS = 0,
    KEY_A = 1,
    KEY_B = 2,
    KEY_C = 3,
    KEY_D = 4,
    KEY_E = 5,
    KEY_F = 6,
}

let JoyStick_Press = DigitalPin.P8;
let JoyStick_X = AnalogPin.P1;
let JoyStick_Y = AnalogPin.P2;
let KEY_A = DigitalPin.P5;
let KEY_B = DigitalPin.P11;
let KEY_C = DigitalPin.P15;
let KEY_D = DigitalPin.P14;
let KEY_E = DigitalPin.P13;
let KEY_F = DigitalPin.P12;

/**
 * Operational remote JoyStick function
 */
//% weight=100 color=#3333FF icon="\uf11b"
namespace WSJoyStick {
    let Read_X = 0, Read_Y = 0;
    //% blockId==JoyStickInit block="JoyStickInit"
    //% weight=100
    export function JoyStickInit(): void {
        pins.setPull(JoyStick_Press, PinPullMode.PullUp);
        pins.setPull(KEY_A, PinPullMode.PullUp);
        pins.setPull(KEY_B, PinPullMode.PullUp);
        pins.setPull(KEY_C, PinPullMode.PullUp);
        pins.setPull(KEY_D, PinPullMode.PullUp);
        pins.setPull(KEY_E, PinPullMode.PullUp);
        pins.setPull(KEY_F, PinPullMode.PullUp);

        //10 bits of AD conversion chip，max = 1024
        Read_X = pins.analogReadPin(JoyStick_X);
        Read_Y = pins.analogReadPin(JoyStick_Y);
    }

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone weight=90
    //% blockId=PlayMusic block="Play |Music %note=device_note|for %duration=device_beat" blockGap=8
    //% parts="headphone"
    //% useEnumVal=1
    export function PlayMusic(frequency: number, ms: number): void {
        pins.analogPitch(frequency, ms);
    }

    //% blockId==Listen_Key block="Key %pin |Press"
    //% weight=100
    export function Listen_Key(pin: BUTTON): boolean {
        let Val = 2;

        //Read pin 
        if (pin == BUTTON.JOYSTICK_PRESS) {
            Val = pins.digitalReadPin(JoyStick_Press);
        } else if (pin == BUTTON.KEY_A) {
            Val = pins.digitalReadPin(KEY_A);
        } else if (pin == BUTTON.KEY_B) {
            Val = pins.digitalReadPin(KEY_B);
        } else if (pin == BUTTON.KEY_C) {
            Val = pins.digitalReadPin(KEY_C);
        } else if (pin == BUTTON.KEY_D) {
            Val = pins.digitalReadPin(KEY_D);
        } else if (pin == BUTTON.KEY_E) {
            Val = pins.digitalReadPin(KEY_E);
        } else {
            Val = pins.digitalReadPin(KEY_F);
        }

        //registerWithDal((int)pin, MICROBIT_BUTTON_EVT_CLICK, body);
        //To determine the value
        if (Val == 0) {
            return true;
        } else {
            return false;
        }
    }

    //% blockId==onButton block="Key %pin |Press"
    //% weight=100
    export function onButton(pin: BUTTON, body: Action): void {
        let Pin = 0;

        //Read pin 
        if (pin == BUTTON.JOYSTICK_PRESS) {
            Pin = JoyStick_Press;
        } else if (pin == BUTTON.KEY_A) {
            Pin = KEY_A;
        } else if (pin == BUTTON.KEY_B) {
            Pin = KEY_B;
        } else if (pin == BUTTON.KEY_C) {
            Pin = KEY_C;
        } else if (pin == BUTTON.KEY_D) {
            Pin = KEY_D;
        } else if (pin == BUTTON.KEY_E) {
            Pin = KEY_E;
        } else {
            Pin = KEY_F;
        }
        pins.onPulsed(Pin, PulseValue.Low, body);
    }

    //% blockId==Listen_Rocker block="DIR Dir %pin "
    //% weight=100
    export function Listen_Rocker(Dir: DIR): boolean {
        let Get_Rocker = DIR.NONE;
        let New_X = 0, New_Y = 0;
        let Dx = 0, Dy = 0;
        New_X = pins.analogReadPin(AnalogPin.P1);
        New_Y = pins.analogReadPin(AnalogPin.P2);
        //serial.writeNumber(New_X)
        //serial.writeNumber(New_Y)
        Dx = Math.abs(Read_X - New_X);
        Dy = Math.abs(New_Y - Read_Y);
        let Precision = 150; //0.5v

        if (((New_X - Read_X) > Precision) && (Math.abs(New_Y - Read_Y) < Precision)) {
            Get_Rocker = DIR.RIGHT;
        } else if (((Read_X - New_X) > Precision) && (Math.abs(New_Y - Read_Y) < Precision)) {
            Get_Rocker = DIR.LEFT;
        } else if (((New_Y - Read_Y) > Precision) && (Math.abs(Read_X - New_X) < Precision)) {
            Get_Rocker = DIR.UP;
        } else if (((Read_Y - New_Y) > Precision) && (Math.abs(Read_X - New_X) < Precision)) {
            Get_Rocker = DIR.DOWN;
        } else if (((New_X - Read_X) > Precision) && ((New_Y - Read_Y) > Precision)) {
            Get_Rocker = DIR.UP_RIGHT;
        } else if (((New_X - Read_X) > Precision) && ((Read_Y - New_Y) > Precision)) {
            Get_Rocker = DIR.DOWN_RIGHT;
        } else if (((Read_X - New_X) > Precision) && ((New_Y - Read_Y) > Precision)) {
            Get_Rocker = DIR.UP_LEFT;
        } else if (((Read_X - New_X) > Precision) && ((Read_Y - New_Y) > Precision)) {
            Get_Rocker = DIR.DOWN_LEFT;
        } else {
            Get_Rocker = DIR.NONE;
        }

        //To determine the value
        if (Get_Rocker == Dir) {
            return true;
        } else {
            return false;
        }
    }
}

