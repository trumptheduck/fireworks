import { GameObject } from "./GameObject";

export class Character extends GameObject {
    letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    letter:string;
    constructor(pos = {x:0, y:0}) {
        super(pos, {x:40, y:40});
        this.letter = this.letters[Math.floor(this.letters.length*Math.random())];
    }
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = "white";
        super.draw(context);
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText(this.letter, -7, 7, 20);
    }
}