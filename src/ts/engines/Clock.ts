export class Clock {
    private fps:number;
    private stop: boolean;
    private fpsInterval: number = 0;
    private startTime: number = 0;
    private now: number = 0;
    private then: number = 0;
    private elapsed: number = 0;
    
    constructor (fps:number) {
        this.fps = fps;
        this.stop = false;
    }
    tick = () => {};
    frame = () => {
        if (this.stop === false) {
            requestAnimationFrame(this.frame);
        }
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.tick()
        }
    }
    startTicking = () =>{
        this.stop = false;
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
            this.frame();
    }
    stopTicking = () => {
        this.stop = true;
    }
}