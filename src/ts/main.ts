import { Character } from "./classes/Character";
import { Emitter, EmitterConfig, ExplosionEmitter } from "./classes/Emitter";
import { Firework } from "./classes/Firework";
import { Particle } from "./classes/Particle";
import { Player } from "./classes/Player";
import { CanvasRenderingEngine } from "./engines/CanvasRenderingEngine";
import { Clock } from "./engines/Clock";

class Program {

}

function main():void {
    var canvasElem: HTMLCanvasElement = document.createElement('canvas');
    canvasElem.width = 1000;
    canvasElem.height = 700;
    canvasElem.style.border = "solid black 1px";
    canvasElem.style.backgroundColor = "black";
    document.body.appendChild(canvasElem);
    var canvasRenderer = new CanvasRenderingEngine(canvasElem);
    var clock:Clock = new Clock(60);
    canvasRenderer.add(new Player({x: 500, y: 700}));

    clock.tick = () => {
        canvasRenderer.clear();
        canvasRenderer.render();
    }
    clock.startTicking();
}

main();