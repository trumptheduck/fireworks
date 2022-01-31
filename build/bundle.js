(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Character=void 0;const GameObject_1=require("./GameObject");class Character extends GameObject_1.GameObject{constructor(pos={x:0,y:0}){super(pos,{x:40,y:40});this.letters="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";this.letter=this.letters[Math.floor(this.letters.length*Math.random())]}draw(context){context.fillStyle="white";super.draw(context);context.fillStyle="black";context.font="20px Arial";context.fillText(this.letter,-7,7,20)}}exports.Character=Character},{"./GameObject":4}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.EmitterConfig=exports.ExplosionEmitter=exports.Emitter=void 0;const GameObject_1=require("./GameObject");const Particle_1=require("./Particle");class Emitter extends GameObject_1.GameObject{constructor(pos={x:0,y:0},config=new EmitterConfig,particle=new Particle_1.Particle){super(pos,{x:0,y:0});this._timer=0;this.config=config;this.particle=particle}update(engine){super.update(engine);if(this._timer-this._defaultTimeInterval>0){this._timer-=this._defaultTimeInterval;return}for(let i=0;i<Math.ceil(this._defaultTimeInterval/this.config.interval);i++){var _particle=new Particle_1.Particle({x:this.pos.x,y:this.pos.y},this.particle.radius,this.particle.lifespan+this.config.lifetimeSpread*(Math.random()-.5),this.particle.fadeOut,this.particle.color);_particle.setAngularSpeed(this.config.angle+this.config.angleSpread*(Math.random()-.5),this.config.speed+this.config.speedSpread*(Math.random()-.5));engine.add(_particle)}this._timer=this.config.interval}}exports.Emitter=Emitter;class ExplosionEmitter extends Emitter{constructor(pos={x:0,y:0},particle=new Particle_1.Particle){super(pos,new EmitterConfig(5e-5,0,2.1,360,4,1),particle);this.recursions=1}update(engine){super.update(engine);if(this.recursions-1<=0){engine.addToRemoveQueue(this)}else{this.recursions--}}}exports.ExplosionEmitter=ExplosionEmitter;class EmitterConfig{constructor(interval=1,angle=0,speed=5,angleSpread=0,speedSpread=0,lifetimeSpread=0){this.interval=interval;this.angle=angle;this.speed=speed;this.angleSpread=angleSpread;this.speedSpread=speedSpread;this.lifetimeSpread=lifetimeSpread}}exports.EmitterConfig=EmitterConfig},{"./GameObject":4,"./Particle":5}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Firework=void 0;const Emitter_1=require("./Emitter");const GameObject_1=require("./GameObject");const Particle_1=require("./Particle");class Firework extends GameObject_1.GameObject{constructor(pos={x:0,y:0},trail=new Particle_1.Particle,spark=new Particle_1.Particle,fuse=1){super(pos,{x:0,y:0});this.explodeSfx=new Audio("./assets/sfx/explode.mp3");this.whistleSfx=new Audio("./assets/sfx/whistle.mp3");this.trail=trail;this.spark=spark;this.fuse=fuse;this._explosionEmitter=new Emitter_1.ExplosionEmitter(this.pos,this.spark);this._trailEmitter=new Emitter_1.Emitter(this.pos,new Emitter_1.EmitterConfig(.015,90,2,20,.5),this.trail)}setup(engine){super.setup(engine);engine.add(this._trailEmitter);this.whistleSfx.play()}update(engine){super.update(engine);if(this.fuse-this._defaultTimeInterval>0){this.fuse-=this._defaultTimeInterval}else{this.explode(engine)}}explode(engine){this.whistleSfx.pause();this.explodeSfx.play();engine.add(this._explosionEmitter);engine.addToRemoveQueue(this._trailEmitter);engine.addToRemoveQueue(this)}}exports.Firework=Firework},{"./Emitter":2,"./GameObject":4,"./Particle":5}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.GameObject=void 0;class GameObject{constructor(pos={x:0,y:0},dim={x:100,y:100}){this._defaultTimeInterval=1/60;this.speed={x:0,y:0};this.scaling={x:0,y:0};this.pos=pos;this.dim=dim;this.uuid=`gameObject-${Math.random()}`}setSpeed(speed){this.speed.x=speed.x;this.speed.y=speed.y}setAngularSpeed(angle,speed){this.setSpeed({x:speed*Math.cos(angle/180*Math.PI),y:speed*Math.sin(angle/180*Math.PI)})}setup(engine){}draw(context){context.fillRect(-this.dim.x/2,-this.dim.y/2,this.dim.x,this.dim.y)}render(context){context.save();context.translate(this.pos.x,this.pos.y);this.draw(context);context.restore()}update(engine){this.pos.x+=this.speed.x;this.pos.y+=this.speed.y}}exports.GameObject=GameObject},{}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Particle=void 0;const GameObject_1=require("./GameObject");class Particle extends GameObject_1.GameObject{constructor(pos={x:0,y:0},radius=10,lifespan=-1,fadeOut=false,color="white"){super(pos);this._opacity=1;this._lifespan=lifespan,this.lifespan=lifespan,this.fadeOut=fadeOut,this.radius=radius,this.color=color}update(engine){super.update(engine);if(this.lifespan==-1)return;if(this._lifespan==0){engine.addToRemoveQueue(this)}else{if(this._lifespan<=this._defaultTimeInterval){this._lifespan=0}else{this._lifespan-=this._defaultTimeInterval;this._opacity=this._lifespan/this.lifespan}}}draw(context){if(this.fadeOut)context.globalAlpha=this._opacity;context.fillStyle=this.color;context.beginPath();context.arc(0,0,this.radius,0,2*Math.PI);context.fill();context.closePath()}}exports.Particle=Particle},{"./GameObject":4}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Player=void 0;const Keyboard_1=require("../controllers/Keyboard");const Firework_1=require("./Firework");const GameObject_1=require("./GameObject");const Particle_1=require("./Particle");class Player extends GameObject_1.GameObject{constructor(pos={x:0,y:0},controller=new Keyboard_1.Keyboard){super(pos,{x:30,y:30});this.cooldown=0;this.fireworkColors=["#01BDE8","#0000EA","#FDFED2","#E400F1","#EE0090","#D9B01C","#FF664B","#0078FF"];this.controller=controller}draw(context){context.fillStyle="white";super.draw(context)}update(engine){if(this.cooldown-this._defaultTimeInterval>0){this.cooldown-=this._defaultTimeInterval}else{this.cooldown=0}if(this.controller.state.left){this.pos.x-=10}if(this.controller.state.right){this.pos.x+=10}if(this.controller.state.space){if(this.cooldown==0){var color=this.fireworkColors[Math.floor(this.fireworkColors.length*Math.random())];var firework=new Firework_1.Firework({x:this.pos.x,y:this.pos.y},new Particle_1.Particle({x:0,y:0},3,.3,true,color),new Particle_1.Particle({x:0,y:0},3,.3,true,color),1+.5*(Math.random()-.5));firework.setSpeed({x:0,y:-7+6*(Math.random()-.5)});engine.add(firework);this.cooldown=.5}}}}exports.Player=Player},{"../controllers/Keyboard":8,"./Firework":3,"./GameObject":4,"./Particle":5}],7:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Controller=void 0;class Controller{constructor(){this.binding={left:"ArrowLeft",right:"ArrowRight",space:" "};this.state={left:false,right:false,space:false}}}exports.Controller=Controller},{}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Keyboard=void 0;const Controller_1=require("./Controller");class Keyboard extends Controller_1.Controller{constructor(){super();document.addEventListener("keydown",event=>{switch(event.key){case this.binding.left:this.state.left=true;break;case this.binding.right:this.state.right=true;break;case this.binding.space:this.state.space=true}});document.addEventListener("keyup",event=>{switch(event.key){case this.binding.left:this.state.left=false;break;case this.binding.right:this.state.right=false;break;case this.binding.space:this.state.space=false}})}}exports.Keyboard=Keyboard},{"./Controller":7}],9:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.CanvasRenderingEngine=void 0;const Character_1=require("../classes/Character");const Firework_1=require("../classes/Firework");const GameObject_1=require("../classes/GameObject");class CanvasRenderingEngine{constructor(canvas){this.id=`canvas-${Math.random()}`;this.scene=[];this.removeBuffer=[];this.add=object=>{object.setup(this);this.scene.push(object)};this.addToRemoveQueue=object=>{this.removeBuffer.push(object)};this.remove=object=>{var objectToRemove=this.scene.find(sceneObj=>object.uuid==sceneObj.uuid);if(objectToRemove!==undefined){this.scene.splice(this.scene.indexOf(objectToRemove),1)}};this.removeFromBuffer=()=>{this.removeBuffer.forEach(bufferredObject=>{this.remove(bufferredObject)});this.removeBuffer=[]};this.clear=()=>{if(this.context!==null){this.context.clearRect(0,0,this.width,this.height)}};this.render=()=>{if(Math.random()<.02){if(Math.random()>.5){var _char=new Character_1.Character({x:0,y:300+300*(Math.random()-.5)});_char.setAngularSpeed(0,3+2*(Math.random()-.5));this.add(_char)}else{var _char=new Character_1.Character({x:900,y:300+300*(Math.random()-.5)});_char.setAngularSpeed(0,-3+2*(Math.random()-.5));this.add(_char)}}this.removeFromBuffer();this.scene.forEach(object=>{if(object instanceof Character_1.Character){for(let i=0;i<this.scene.length;i++){var _item=this.scene[i];if(_item instanceof Firework_1.Firework){if(Math.abs(_item.pos.x-object.pos.x)<20&&Math.abs(_item.pos.y-object.pos.y)<20){_item.explode(this);console.log(object.letter);document.activeElement.value+=object.letter;this.addToRemoveQueue(object);break}}}}object.update(this);if(this.context!==null)object.render(this.context);this.flagUnusedObjects(object)})};this.canvas=canvas;this.context=this.canvas.getContext("2d");this.width=this.canvas.width;this.height=this.canvas.height}flagUnusedObjects(object){if(object instanceof GameObject_1.GameObject){if(object.pos.x>this.width+100||object.pos.x<-100||object.pos.y>this.height+100||object.pos.y<-100){this.addToRemoveQueue(object)}}}}exports.CanvasRenderingEngine=CanvasRenderingEngine},{"../classes/Character":1,"../classes/Firework":3,"../classes/GameObject":4}],10:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Clock=void 0;class Clock{constructor(fps){this.fpsInterval=0;this.startTime=0;this.now=0;this.then=0;this.elapsed=0;this.tick=()=>{};this.frame=()=>{if(this.stop===false){requestAnimationFrame(this.frame)}this.now=Date.now();this.elapsed=this.now-this.then;if(this.elapsed>this.fpsInterval){this.then=this.now-this.elapsed%this.fpsInterval;this.tick()}};this.startTicking=()=>{this.stop=false;this.fpsInterval=1e3/this.fps;this.then=Date.now();this.startTime=this.then;this.frame()};this.stopTicking=()=>{this.stop=true};this.fps=fps;this.stop=false}}exports.Clock=Clock},{}],11:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});const Player_1=require("./classes/Player");const CanvasRenderingEngine_1=require("./engines/CanvasRenderingEngine");const Clock_1=require("./engines/Clock");class Program{}function main(){var canvasElem=document.createElement("canvas");canvasElem.width=1e3;canvasElem.height=700;canvasElem.style.border="solid black 1px";canvasElem.style.backgroundColor="black";document.body.appendChild(canvasElem);var canvasRenderer=new CanvasRenderingEngine_1.CanvasRenderingEngine(canvasElem);var clock=new Clock_1.Clock(60);canvasRenderer.add(new Player_1.Player({x:500,y:700}));clock.tick=()=>{canvasRenderer.clear();canvasRenderer.render()};clock.startTicking()}main()},{"./classes/Player":6,"./engines/CanvasRenderingEngine":9,"./engines/Clock":10}]},{},[11]);