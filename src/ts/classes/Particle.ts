import { CanvasRenderingEngine } from "../engines/CanvasRenderingEngine";
import { Vector2 } from "../models/Vector2";
import { GameObject } from "./GameObject";

export class Particle extends GameObject {
    //-1 for infinite lifespan
    lifespan: number;
    fadeOut: boolean;
    radius: number;
    color: string;

    private _lifespan: number;
    private _opacity = 1;
    
    constructor (pos: Vector2 =  {
        x: 0,
        y: 0,
    },
    radius: number = 10,
    lifespan:number = -1, fadeOut: boolean = false, color: string = "white") {
        super(pos);
        this._lifespan = lifespan, this.lifespan = lifespan, this.fadeOut = fadeOut, this.radius = radius, this.color = color;
    }
    //@Override
    update(engine: CanvasRenderingEngine) {
        super.update(engine);
        if (this.lifespan == -1) return;
        if (this._lifespan == 0) {
            engine.addToRemoveQueue(this);
        } else {
            if (this._lifespan <= this._defaultTimeInterval) {
                this._lifespan = 0;
            } else {
                this._lifespan -= this._defaultTimeInterval;
                this._opacity = this._lifespan/this.lifespan;
            }
        }
    };
    //@Override
    draw (context: CanvasRenderingContext2D) {
        if (this.fadeOut) context.globalAlpha = this._opacity;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    };
}