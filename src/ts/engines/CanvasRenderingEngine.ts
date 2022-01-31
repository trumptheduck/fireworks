import { Character } from "../classes/Character";
import { Firework } from "../classes/Firework";
import { GameObject } from "../classes/GameObject";

export class CanvasRenderingEngine {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D|null;
    id:string = `canvas-${Math.random()}`;
    width:number;
    height:number;
    scene: GameObject[] = [];
    removeBuffer: GameObject[] = [];
    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    add = (object:GameObject) => {
        object.setup(this);
        this.scene.push(object);
    }

    addToRemoveQueue = (object: GameObject) => {
        this.removeBuffer.push(object)
    }
    remove = (object:GameObject) => {
       var objectToRemove = this.scene.find(sceneObj => object.uuid == sceneObj.uuid);
       if (objectToRemove !== undefined) {
        this.scene.splice(this.scene.indexOf(objectToRemove),1)
       }
    }
    removeFromBuffer = () => {
        this.removeBuffer.forEach(bufferredObject => {
            this.remove(bufferredObject);
        })
        this.removeBuffer = [];
    }
    clear = () => {
        if (this.context !== null) {
            this.context.clearRect(0,0,this.width,this.height)
        }
    }
    flagUnusedObjects(object:GameObject) {
        if (object instanceof GameObject) {
            if (object.pos.x > this.width+100||object.pos.x < -100||object.pos.y > this.height+100||object.pos.y < -100) {
                this.addToRemoveQueue(object);
            }
        }
    }
    render = () => {
        if (Math.random() < 0.02) {
            if (Math.random() > 0.5) {
                var _char = new Character({x: 0, y: 300+ 300*(Math.random() -0.5)});
                _char.setAngularSpeed(0, 3 + 2*(Math.random() -0.5));
                this.add(_char);
            } else {
                var _char = new Character({x: 900, y: 300+ 300*(Math.random() -0.5)});
                _char.setAngularSpeed(0, -3 + 2*(Math.random() -0.5));
                this.add(_char);
            }

        }
        this.removeFromBuffer();
        this.scene.forEach(object => {
            if (object instanceof Character) {
                for (let i = 0; i < this.scene.length; i ++) {
                    var _item = this.scene[i];
                    if (_item instanceof Firework) {
                        if (Math.abs(_item.pos.x - object.pos.x) < 20&&Math.abs(_item.pos.y - object.pos.y) < 20) {
                            _item.explode(this);
                            console.log(object.letter);
                            (document.activeElement as HTMLInputElement).value += object.letter;
                            this.addToRemoveQueue(object);
                            break;
                        }
                    }
                }
            }
            object.update(this);
            if (this.context !== null)
            object.render(this.context)
            this.flagUnusedObjects(object)
        })
    }
}