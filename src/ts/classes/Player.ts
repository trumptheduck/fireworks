import { Controller } from "../controllers/Controller";
import { Keyboard } from "../controllers/Keyboard";
import { CanvasRenderingEngine } from "../engines/CanvasRenderingEngine";
import { Vector2 } from "../models/Vector2";
import { Firework } from "./Firework";
import { GameObject } from "./GameObject";
import { Particle } from "./Particle";

export class Player extends GameObject {
    controller:Controller;
    cooldown: number = 0;
    fireworkColors = [
        "#01BDE8",
        "#0000EA",
        "#FDFED2",
        "#E400F1",
        "#EE0090",
        "#D9B01C",
        "#FF664B",
        "#0078FF"
    ]
    constructor(pos:Vector2 = {x:0, y: 0}, controller: Controller = new Keyboard()) {
        super(pos,{x: 30, y:30})
        this.controller = controller;
    }
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = "white";
        super.draw(context);
    }
    update(engine: CanvasRenderingEngine): void {
        if (this.cooldown - this._defaultTimeInterval > 0) {
            this.cooldown -= this._defaultTimeInterval;
        } else {
            this.cooldown = 0;
        }
        if (this.controller.state.left) {
            this.pos.x -= 10;
        }
        if (this.controller.state.right) {
            this.pos.x += 10;
        }
        if (this.controller.state.space) {
            if (this.cooldown == 0) {
                var color = this.fireworkColors[Math.floor(this.fireworkColors.length*Math.random())]
                var firework = new Firework({x: this.pos.x, y: this.pos.y},new Particle({x: 0, y:0}, 3, 0.3, true, color),new Particle({x: 0, y:0}, 3, 0.3, true, color), 1+ 0.5*(Math.random()-0.5))
                // var emitter = new ExplosionEmitter(,new Particle({x: 0, y:0}, 3, 0.7, true));
                firework.setSpeed({x: 0, y: -7 + 6*(Math.random()-0.5)})
                engine.add(firework);
                this.cooldown = 0.5;
            }
        }
    }
}