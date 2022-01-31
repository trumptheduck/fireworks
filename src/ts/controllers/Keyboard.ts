import { Controller } from "./Controller";

export class Keyboard extends Controller {
    constructor() {
        super();
        document.addEventListener('keydown',(event)=>{
            switch (event.key) {
                case this.binding.left:
                this.state.left = true;
                break;
                case this.binding.right:
                this.state.right = true;
                break;
                case this.binding.space:
                this.state.space = true;
            }
        })
        document.addEventListener('keyup',(event)=>{
            switch (event.key) {
                case this.binding.left:
                this.state.left = false;
                break;
                case this.binding.right:
                this.state.right = false;
                break;
                case this.binding.space:
                this.state.space = false;
            }
        })
    }
}