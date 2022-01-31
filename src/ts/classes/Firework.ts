import { CanvasRenderingEngine } from "../engines/CanvasRenderingEngine";
import { Vector2 } from "../models/Vector2";
import { Emitter, EmitterConfig, ExplosionEmitter } from "./Emitter";
import { GameObject } from "./GameObject";
import { Particle } from "./Particle";

export class Firework extends GameObject {
    trail: Particle;
    spark: Particle;
    fuse: number;
    explodeSfx: HTMLAudioElement = new Audio("./assets/sfx/explode.mp3");
    whistleSfx: HTMLAudioElement = new Audio("./assets/sfx/whistle.mp3");
    private _explosionEmitter: ExplosionEmitter;
    private _trailEmitter: Emitter;
    constructor(pos:Vector2 = {x:0, y:0}, trail: Particle = new Particle(), spark: Particle = new Particle(), fuse:number = 1, ) {
        super(pos, {x:0, y:0});
        this.trail = trail;
        this.spark = spark;
        this.fuse = fuse;
        this._explosionEmitter = new ExplosionEmitter(this.pos, this.spark);
        this._trailEmitter = new Emitter(this.pos, new EmitterConfig(0.015,90,2,20,0.5), this.trail);
    }
    setup(engine: CanvasRenderingEngine): void {
        super.setup(engine);
        engine.add(this._trailEmitter);
        this.whistleSfx.play();
    }
    update(engine: CanvasRenderingEngine): void {
        super.update(engine);
        if (this.fuse - this._defaultTimeInterval > 0) {
            this.fuse -= this._defaultTimeInterval;
        } else {
            this.explode(engine);
        }
    }
    explode (engine: CanvasRenderingEngine) {
        this.whistleSfx.pause();
        this.explodeSfx.play();
        engine.add(this._explosionEmitter);
        engine.addToRemoveQueue(this._trailEmitter);
        engine.addToRemoveQueue(this);
    }
}