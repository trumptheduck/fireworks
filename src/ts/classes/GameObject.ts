import { CanvasRenderingEngine } from "../engines/CanvasRenderingEngine";
import { Vector2 } from "../models/Vector2";

export class GameObject {
    pos: Vector2;
    dim: Vector2;
    protected _defaultTimeInterval = 1/60;
    speed: Vector2 = {
        x: 0,
        y: 0
    };
    uuid: string;
    scaling: Vector2 =  {
        x: 0,
        y: 0
    };
    constructor (pos: Vector2 =  {
        x: 0,
        y: 0,
    }, dim: Vector2 = {
        x: 100,
        y: 100
    }) {
        this.pos = pos;
        this.dim = dim;
        this.uuid = `gameObject-${Math.random()}`;
    }

    setSpeed(speed: Vector2) {
        this.speed.x = speed.x;
        this.speed.y = speed.y;
    }

    setAngularSpeed(angle: number, speed: number) {
        this.setSpeed({
            x: speed*Math.cos(angle/180*Math.PI),
            y: speed*Math.sin(angle/180*Math.PI),
        })
    }

    setup (engine: CanvasRenderingEngine) {

    }
    draw (context: CanvasRenderingContext2D) {
        context.fillRect(-this.dim.x/2,-this.dim.y/2,this.dim.x,this.dim.y);
    }
    render(context: CanvasRenderingContext2D) {
        context.save()
        context.translate(this.pos.x, this.pos.y);
        // context.scale(this.scaling.x, this.scaling.y);
        this.draw(context);
        context.restore();
    }
    update (engine: CanvasRenderingEngine) {
        //Object move based on speed
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }
}