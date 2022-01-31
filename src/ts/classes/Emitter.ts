import { CanvasRenderingEngine } from "../engines/CanvasRenderingEngine";
import { Vector2 } from "../models/Vector2";
import { GameObject } from "./GameObject";
import { Particle } from "./Particle";

export class Emitter extends GameObject {
    config: EmitterConfig;
    particle: Particle;
    _timer: number = 0;
    constructor(pos: Vector2 = {x:0, y:0}, config: EmitterConfig = new EmitterConfig(), particle: Particle = new Particle()) {
        super(pos,{x: 0, y: 0})
        this.config = config;
        this.particle = particle;
    }
    update(engine: CanvasRenderingEngine): void {
        super.update(engine);
        if (this._timer - this._defaultTimeInterval > 0) {
            this._timer -= this._defaultTimeInterval;
            return;
        }
        for (let i = 0; i < Math.ceil(this._defaultTimeInterval/this.config.interval); i++) {
            var _particle = new Particle(
                {x: this.pos.x, y: this.pos.y},
                this.particle.radius,
                this.particle.lifespan + (this.config.lifetimeSpread*(Math.random()-0.5)),
                this.particle.fadeOut,
                this.particle.color
            );
            _particle.setAngularSpeed(
                this.config.angle + (this.config.angleSpread*(Math.random()-0.5)),
                this.config.speed + (this.config.speedSpread*(Math.random()-0.5)),
            );
            engine.add(_particle);
        }
        this._timer = this.config.interval;
    }

}

export class ExplosionEmitter extends Emitter {
    recursions: number = 1;
    constructor(pos:Vector2 = {x: 0, y:0}, particle: Particle = new Particle()) {
        super(pos,new EmitterConfig(0.00005,0,2.1,360,4,1), particle);
    }
    update(engine: CanvasRenderingEngine): void {
        super.update(engine);
        if (this.recursions - 1 <= 0) {
            engine.addToRemoveQueue(this);
        } else {
            this.recursions--;
        }
    }
}
export class EmitterConfig {
    interval: number;
    angle: number;
    speed: number;

    angleSpread: number;
    speedSpread: number;
    lifetimeSpread: number;
    constructor(
        interval = 1,
        angle = 0,
        speed = 5,
        angleSpread = 0,
        speedSpread = 0,
        lifetimeSpread = 0
    ) {
        this.interval = interval;
        this.angle = angle;
        this.speed = speed;
        this.angleSpread = angleSpread;
        this.speedSpread = speedSpread;
        this.lifetimeSpread = lifetimeSpread;
    }
}