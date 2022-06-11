/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FlappyBird/Collision.ts":
/*!*************************************!*\
  !*** ./src/FlappyBird/Collision.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Collision = void 0;\r\nconst Contants_1 = __webpack_require__(/*! ./Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass Collision {\r\n    constructor() { }\r\n    isCollided(bird, p) {\r\n        // Collison with pipe\r\n        let checkXPos = bird.x + (Contants_1.Constants.BIRD_WIDTH - 60) >= p.x && bird.x <= p.x + p.width - 40;\r\n        let checkYPos = (bird.y <= p.y + Contants_1.Constants.PIPE_H - 25 && p.pos == 'top') || (bird.y + Contants_1.Constants.BIRD_HEIGHT - 40 >= p.y + Contants_1.Constants.PIPE_H + Contants_1.Constants.SPACE_BET_P && p.pos == 'top');\r\n        if (checkXPos && checkYPos) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n}\r\nexports.Collision = Collision;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Collision.ts?");

/***/ }),

/***/ "./src/FlappyBird/Contants.ts":
/*!************************************!*\
  !*** ./src/FlappyBird/Contants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Constants = void 0;\r\nexports.Constants = {\r\n    TO_RADIANS: Math.PI / 180,\r\n    BIRD_WIDTH: 80,\r\n    BIRD_HEIGHT: 70,\r\n    CANVAS_W: 1000,\r\n    CANVAS_H: 500,\r\n    PIPE_H: 269,\r\n    SPACE_BET_P: 160,\r\n    PIPE_TIME: 1500,\r\n    PIPE_TOP_W: 225,\r\n    PIPE_TOP_H: 269,\r\n    PIPE_BOT_W: 225,\r\n    PIPE_BOT_H: 336,\r\n    ImgKeys: ['bg', 'pause', 'bird1', 'bird2', 'bird3', 'bird4', 'crab', 'over', 'pipe_down', 'pipe_up', 'playbtn', 'restart', 'flappy']\r\n};\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Contants.ts?");

/***/ }),

/***/ "./src/FlappyBird/FlappyBird.ts":
/*!**************************************!*\
  !*** ./src/FlappyBird/FlappyBird.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Game_1 = __webpack_require__(/*! ../GameEngine/Game */ \"./src/GameEngine/Game.ts\");\r\nconst OverScene_1 = __webpack_require__(/*! ./Scenes/OverScene */ \"./src/FlappyBird/Scenes/OverScene.ts\");\r\nconst PauseScene_1 = __webpack_require__(/*! ./Scenes/PauseScene */ \"./src/FlappyBird/Scenes/PauseScene.ts\");\r\nconst PlayScene_1 = __webpack_require__(/*! ./Scenes/PlayScene */ \"./src/FlappyBird/Scenes/PlayScene.ts\");\r\nconst StartScene_1 = __webpack_require__(/*! ./Scenes/StartScene */ \"./src/FlappyBird/Scenes/StartScene.ts\");\r\nconst ScoreController_1 = __webpack_require__(/*! ./ScoreController */ \"./src/FlappyBird/ScoreController.ts\");\r\nclass FlappyBird extends Game_1.Game {\r\n    constructor() {\r\n        super();\r\n        this.scoreController = new ScoreController_1.ScoreController();\r\n    }\r\n}\r\nlet flappyBird = new FlappyBird();\r\nlet startScene = new StartScene_1.StartScene('gameArea', 'StartScene', flappyBird);\r\nlet playScene = new PlayScene_1.PlayScene('gameArea', 'PlayScene', flappyBird, flappyBird.scoreController);\r\nlet pauseScene = new PauseScene_1.PauseScene('gameArea', 'PauseScene', flappyBird);\r\nlet overScene = new OverScene_1.OverScene('gameArea', 'OverScene', flappyBird, flappyBird.scoreController);\r\nflappyBird.sceneManager.addScene('StartScene', startScene);\r\nflappyBird.sceneManager.addScene('PlayScene', playScene);\r\nflappyBird.sceneManager.addScene('PauseScene', pauseScene);\r\nflappyBird.sceneManager.addScene('OverScene', overScene);\r\nflappyBird.startGame();\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/FlappyBird.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Background.ts":
/*!*******************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Background.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Background = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass Background extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n    update(len) {\r\n        this.x -= 1;\r\n        if (this.x <= -1 * this.width) {\r\n            this.x = this.width * (len - 1);\r\n        }\r\n    }\r\n}\r\nexports.Background = Background;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Background.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Bird.ts":
/*!*************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Bird.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Bird = void 0;\r\nconst Sprite_1 = __webpack_require__(/*! ../../../GameEngine/Object/Sprite */ \"./src/GameEngine/Object/Sprite.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../../Contants */ \"./src/FlappyBird/Contants.ts\");\r\nconst Physic_1 = __webpack_require__(/*! ../../../GameEngine/Helpers/Physic */ \"./src/GameEngine/Helpers/Physic.ts\");\r\nclass Bird extends Sprite_1.Sprite {\r\n    constructor(x, y, name, w, h, numFrame) {\r\n        super(x, y, name, w, h, numFrame);\r\n        // Index of frame\r\n        this.idx = 0;\r\n        this.speed = 0;\r\n        this.gravity = 1000;\r\n        this.FLY_SPEED = -400;\r\n        this.CHANGE_FRAME_BIRD = 150;\r\n        this.isFalling = false;\r\n        this.Physic = new Physic_1.Physic();\r\n    }\r\n    changeFrame() {\r\n        this.idx += 1;\r\n        if (this.idx >= this.numFrame) {\r\n            this.idx = 0;\r\n        }\r\n        this.imgKey = this.frames[this.idx];\r\n    }\r\n    update(delta) {\r\n        const dt = delta / 1000;\r\n        this.y = this.Physic.calDistance(this.y, this.speed, this.gravity, dt);\r\n        // Check max height flying\r\n        if (this.y <= 5) {\r\n            this.y = 5;\r\n        }\r\n        this.speed = this.Physic.calSpeed(this.speed, this.gravity, dt);\r\n        // Update rotation\r\n        if (this.speed < 0) {\r\n            this.rotation -= 650 * (dt);\r\n            if (this.rotation < -20) {\r\n                this.rotation = -20;\r\n            }\r\n        }\r\n        // Rotate clockwise\r\n        if (this.speed >= 0) {\r\n            this.rotation += 300 * (dt);\r\n            if (this.rotation > 90) {\r\n                this.rotation = 90;\r\n            }\r\n        }\r\n        this.changeFrameCount += delta;\r\n        if (this.changeFrameCount >= this.CHANGE_FRAME_BIRD) {\r\n            this.changeFrame();\r\n            this.changeFrameCount = 0;\r\n        }\r\n    }\r\n    flyUp() {\r\n        if (!this.isFalling) {\r\n            this.speed = this.FLY_SPEED;\r\n        }\r\n    }\r\n    falling() {\r\n        this.isFalling = true;\r\n        this.depth = 5;\r\n    }\r\n    reset() {\r\n        this.x = Contants_1.Constants.CANVAS_W / 5;\r\n        this.y = Contants_1.Constants.CANVAS_H / 2;\r\n        this.imgKey = this.frames[0];\r\n        this.idx = 0;\r\n        this.speed = -200;\r\n        this.rotation = 0;\r\n        this.isFalling = false;\r\n        this.depth = 0;\r\n    }\r\n}\r\nexports.Bird = Bird;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Bird.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Crab.ts":
/*!*************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Crab.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Crab = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass Crab extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n    update(canw) {\r\n        this.x -= 1.5;\r\n        if (this.x <= -30) {\r\n            this.x = canw;\r\n        }\r\n    }\r\n}\r\nexports.Crab = Crab;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Crab.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/FlappyImg.ts":
/*!******************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/FlappyImg.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.FlappyImg = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass FlappyImg extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n}\r\nexports.FlappyImg = FlappyImg;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/FlappyImg.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Over.ts":
/*!*************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Over.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Over = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass Over extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n}\r\nexports.Over = Over;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Over.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Pause.ts":
/*!**************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Pause.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Pause = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass Pause extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n}\r\nexports.Pause = Pause;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Pause.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Pipe.ts":
/*!*************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Pipe.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Pipe = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../../Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass Pipe extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name, pos) {\r\n        super(x, y, w, h, name);\r\n        this.isRunning = false;\r\n        let p = pos ? true : false;\r\n        if (p) {\r\n            this.pos = 'top';\r\n            this.width = Contants_1.Constants.PIPE_TOP_W;\r\n            this.height = Contants_1.Constants.PIPE_TOP_H;\r\n        }\r\n        else {\r\n            this.pos = 'bottom';\r\n            this.width = Contants_1.Constants.PIPE_BOT_W;\r\n            this.height = Contants_1.Constants.PIPE_BOT_H;\r\n        }\r\n    }\r\n    genNewTop(canvas_w, idx) {\r\n        let ranY = Math.floor(Math.random() * Contants_1.Constants.PIPE_H) - Contants_1.Constants.PIPE_H + 5;\r\n        if (ranY <= -Contants_1.Constants.PIPE_H + 40) {\r\n            ranY += 30;\r\n        }\r\n        this.x = canvas_w;\r\n        this.y = ranY;\r\n        return ranY;\r\n    }\r\n    changeBottomPipe(canvas_w, y) {\r\n        this.x = canvas_w;\r\n        this.y = Contants_1.Constants.PIPE_H + y + Contants_1.Constants.SPACE_BET_P;\r\n    }\r\n    update(delta) {\r\n        if (this.isRunning) {\r\n            this.x -= 4 * (delta / 16.67);\r\n        }\r\n    }\r\n    isPassed() {\r\n        if (this.x <= 80 && this.x >= 78 && this.pos == 'top') {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n}\r\nexports.Pipe = Pipe;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Pipe.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/PlayBtn.ts":
/*!****************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/PlayBtn.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PlayBtn = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass PlayBtn extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n}\r\nexports.PlayBtn = PlayBtn;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/PlayBtn.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/ImgObject/Restart.ts":
/*!****************************************************!*\
  !*** ./src/FlappyBird/Object/ImgObject/Restart.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RestartBtn = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ../../../GameEngine/Object/ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass RestartBtn extends ImgObject_1.ImgObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h, name);\r\n    }\r\n}\r\nexports.RestartBtn = RestartBtn;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/ImgObject/Restart.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/Score.ts":
/*!****************************************!*\
  !*** ./src/FlappyBird/Object/Score.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Score = void 0;\r\nconst TextObject_1 = __webpack_require__(/*! ../../GameEngine/Object/TextObject */ \"./src/GameEngine/Object/TextObject.ts\");\r\nclass Score extends TextObject_1.TextObject {\r\n    constructor(x, y, w, h) {\r\n        super(x, y, w, h);\r\n        this.final = '';\r\n    }\r\n    updateScore(score, isHighest) {\r\n        if (isHighest) {\r\n            this.final = this.content;\r\n        }\r\n        else {\r\n            this.final = this.content + score;\r\n        }\r\n    }\r\n    render(ctx, scene) {\r\n        ctx.font = this.font;\r\n        ctx.fillStyle = this.style;\r\n        ctx.fillText(this.final, this.x, this.y);\r\n    }\r\n}\r\nexports.Score = Score;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/Score.ts?");

/***/ }),

/***/ "./src/FlappyBird/Object/TextObject/HighestText.ts":
/*!*********************************************************!*\
  !*** ./src/FlappyBird/Object/TextObject/HighestText.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.HighestText = void 0;\r\nconst Score_1 = __webpack_require__(/*! ../Score */ \"./src/FlappyBird/Object/Score.ts\");\r\nclass HighestText extends Score_1.Score {\r\n    constructor(x, y, w, h) {\r\n        super(x, y, w, h);\r\n        this.highestScore = 0;\r\n        this.setTextStyle(\"45px Arial\", \"#FF5B00\");\r\n        this.setContent('Highest Score: ');\r\n    }\r\n}\r\nexports.HighestText = HighestText;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Object/TextObject/HighestText.ts?");

/***/ }),

/***/ "./src/FlappyBird/Scenes/OverScene.ts":
/*!********************************************!*\
  !*** ./src/FlappyBird/Scenes/OverScene.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.OverScene = void 0;\r\nconst Over_1 = __webpack_require__(/*! ../Object/ImgObject/Over */ \"./src/FlappyBird/Object/ImgObject/Over.ts\");\r\nconst Restart_1 = __webpack_require__(/*! ../Object/ImgObject/Restart */ \"./src/FlappyBird/Object/ImgObject/Restart.ts\");\r\nconst Scene_1 = __webpack_require__(/*! ../../GameEngine/Scene */ \"./src/GameEngine/Scene.ts\");\r\nclass OverScene extends Scene_1.Scene {\r\n    constructor(areaId, name, game, scoreController) {\r\n        super(areaId, name, game);\r\n        this.scoreController = scoreController;\r\n        this.overImg = new Over_1.Over(350, 100, 300, 100, 'over');\r\n        this.highestText = this.scoreController.highestText;\r\n        this.restartBtn = new Restart_1.RestartBtn(390, 270, 220, 90, 'restart');\r\n        this.objs.push(this.overImg);\r\n        this.objs.push(this.highestText);\r\n        this.objs.push(this.restartBtn);\r\n        this.inputHandler();\r\n    }\r\n    update(time, delta) {\r\n        this.highestText.updateScore(this.scoreController.getHighest());\r\n    }\r\n    inputHandler() {\r\n        this.inputManager.onEnterDown(this.replayGame.bind(this), 'OverScene');\r\n        this.inputManager.onClickBtn(this.replayGame.bind(this), 'OverScene');\r\n        document.addEventListener('click', (e) => {\r\n            let x = e.clientX;\r\n            let y = e.clientY;\r\n            if (this.inputManager.getButtonClick(x, y, 390, 270, 220, 90) && this.sceneName == this.sceneManager.getCurrentName()) {\r\n                this.inputManager.enQueue('Click');\r\n            }\r\n        });\r\n    }\r\n    replayGame() {\r\n        this.highestText.updateScore(0, 1);\r\n        this.sceneManager.changeScene('PlayScene');\r\n    }\r\n    render(scene) {\r\n        super.render(scene);\r\n    }\r\n}\r\nexports.OverScene = OverScene;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Scenes/OverScene.ts?");

/***/ }),

/***/ "./src/FlappyBird/Scenes/PauseScene.ts":
/*!*********************************************!*\
  !*** ./src/FlappyBird/Scenes/PauseScene.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PauseScene = void 0;\r\nconst Scene_1 = __webpack_require__(/*! ../../GameEngine/Scene */ \"./src/GameEngine/Scene.ts\");\r\nconst Pause_1 = __webpack_require__(/*! ../Object/ImgObject/Pause */ \"./src/FlappyBird/Object/ImgObject/Pause.ts\");\r\nconst TextObject_1 = __webpack_require__(/*! ../../GameEngine/Object/TextObject */ \"./src/GameEngine/Object/TextObject.ts\");\r\nclass PauseScene extends Scene_1.Scene {\r\n    constructor(areaId, name, game) {\r\n        super(areaId, name, game);\r\n        this.pauseImg = new Pause_1.Pause(340, 80, 400, 300, 'pause');\r\n        this.contText = new TextObject_1.TextObject(400, 420, 200, 200);\r\n        this.contText.setTextStyle(\"45px Arial\", \"#FF5B00\");\r\n        this.contText.setContent('Press Space!');\r\n        this.objs.push(this.pauseImg);\r\n        this.objs.push(this.contText);\r\n        this.inputHandler();\r\n    }\r\n    update(time, delta) {\r\n    }\r\n    inputHandler() {\r\n        this.inputManager.onSpaceDown(this.resumeGame.bind(this), 'PauseScene');\r\n    }\r\n    resumeGame() {\r\n        this.sceneManager.changeScene('PlayScene');\r\n    }\r\n    render(scene) {\r\n        super.render(scene);\r\n    }\r\n}\r\nexports.PauseScene = PauseScene;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Scenes/PauseScene.ts?");

/***/ }),

/***/ "./src/FlappyBird/Scenes/PlayScene.ts":
/*!********************************************!*\
  !*** ./src/FlappyBird/Scenes/PlayScene.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PlayScene = void 0;\r\nconst Background_1 = __webpack_require__(/*! ../Object/ImgObject/Background */ \"./src/FlappyBird/Object/ImgObject/Background.ts\");\r\nconst Bird_1 = __webpack_require__(/*! ../Object/ImgObject/Bird */ \"./src/FlappyBird/Object/ImgObject/Bird.ts\");\r\nconst Pipe_1 = __webpack_require__(/*! ../Object/ImgObject/Pipe */ \"./src/FlappyBird/Object/ImgObject/Pipe.ts\");\r\nconst Scene_1 = __webpack_require__(/*! ../../GameEngine/Scene */ \"./src/GameEngine/Scene.ts\");\r\nconst Crab_1 = __webpack_require__(/*! ../Object/ImgObject/Crab */ \"./src/FlappyBird/Object/ImgObject/Crab.ts\");\r\nconst Collision_1 = __webpack_require__(/*! ../Collision */ \"./src/FlappyBird/Collision.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass PlayScene extends Scene_1.Scene {\r\n    constructor(areaId, name, game, scoreController) {\r\n        super(areaId, name, game);\r\n        this.isOver = false;\r\n        this.isCollided = false;\r\n        this.pipeIdx = 0;\r\n        this.countPipeRun = 0;\r\n        this.backgounds = [];\r\n        this.pipes = [];\r\n        this.scoreController = scoreController;\r\n        // Init bird sprite\r\n        this.bird = new Bird_1.Bird(Contants_1.Constants.CANVAS_W / 5, Contants_1.Constants.CANVAS_H / 2, 'bird1', Contants_1.Constants.BIRD_WIDTH, Contants_1.Constants.BIRD_HEIGHT, 4);\r\n        // Init background\r\n        this.initBackgrounds();\r\n        // Init crab\r\n        this.crab = new Crab_1.Crab(Contants_1.Constants.CANVAS_W - 200, Contants_1.Constants.CANVAS_H - 80, 50, 50, 'crab');\r\n        // Init list of pipes\r\n        this.initPipes();\r\n        this.Collide = new Collision_1.Collision();\r\n        this.initGame();\r\n        console.log('Playingggg');\r\n        this.inputHandler();\r\n    }\r\n    initBackgrounds() {\r\n        for (let i = 0; i < 3; i++) {\r\n            let bg = new Background_1.Background(Contants_1.Constants.CANVAS_W * i, 0, Contants_1.Constants.CANVAS_W, Contants_1.Constants.CANVAS_H, 'bg');\r\n            this.backgounds.push(bg);\r\n        }\r\n    }\r\n    initPipes() {\r\n        // Gen 5 couple of pipes top-bottom\r\n        for (let i = 0; i < 4; i++) {\r\n            let ranY = Math.floor(Math.random() * Contants_1.Constants.PIPE_H) - Contants_1.Constants.PIPE_H - 10;\r\n            let topPipe = new Pipe_1.Pipe(Contants_1.Constants.CANVAS_W, ranY, 0, 0, 'pipe_down', 1);\r\n            let bottomPipe = new Pipe_1.Pipe(Contants_1.Constants.CANVAS_W, ranY + Contants_1.Constants.PIPE_H + Contants_1.Constants.SPACE_BET_P, 0, 0, 'pipe_up');\r\n            this.pipes.push(topPipe);\r\n            this.pipes.push(bottomPipe);\r\n        }\r\n    }\r\n    initGame() {\r\n        this.addObjs(this.backgounds);\r\n        this.objs.push(this.crab);\r\n        this.objs.push(this.bird);\r\n        this.addObjs(this.pipes);\r\n        this.objs.push(this.scoreController.getScoreText());\r\n    }\r\n    reset() {\r\n        this.isOver = false;\r\n        this.isCollided = false;\r\n        this.pipeIdx = 0;\r\n        this.countPipeRun = 0;\r\n        this.scoreController.resetScore();\r\n        this.pipes = [];\r\n        this.objs = [];\r\n        // Reset bird\r\n        this.bird.reset();\r\n        // Reset score\r\n        this.scoreController.resetScore();\r\n        // Init list of pipes\r\n        this.initPipes();\r\n        this.initGame();\r\n    }\r\n    update(time, delta) {\r\n        if (!this.isCollided && !this.isOver) {\r\n            this.updateBackground();\r\n            this.bird.update(delta);\r\n            this.updatePipe(delta);\r\n            this.crab.update(Contants_1.Constants.CANVAS_W);\r\n            this.updateScore();\r\n            this.scoreController.updateCurText();\r\n            this.checkCollision();\r\n        }\r\n        else if (this.isCollided) {\r\n            this.bird.falling();\r\n            this.bird.update(delta);\r\n            this.checkReachGround();\r\n        }\r\n        else {\r\n            this.reset();\r\n            this.sceneManager.changeScene('OverScene');\r\n        }\r\n    }\r\n    updateBackground() {\r\n        this.backgounds.forEach((bg) => {\r\n            bg.update(this.backgounds.length);\r\n        });\r\n    }\r\n    updatePipe(delta) {\r\n        this.pipes.forEach((p) => {\r\n            p.update(delta);\r\n            if (p.isPassed()) {\r\n                this.scoreController.incScore();\r\n            }\r\n        });\r\n        this.countPipeRun += delta;\r\n        if (this.countPipeRun >= Contants_1.Constants.PIPE_TIME) {\r\n            this.countPipeRun = 0;\r\n            this.runNextPipe();\r\n        }\r\n    }\r\n    runNextPipe() {\r\n        this.pipes[this.pipeIdx].isRunning = true;\r\n        let newY = this.pipes[this.pipeIdx].genNewTop(Contants_1.Constants.CANVAS_W, this.pipeIdx);\r\n        this.pipes[this.pipeIdx + 1].isRunning = true;\r\n        this.pipes[this.pipeIdx + 1].changeBottomPipe(Contants_1.Constants.CANVAS_W, newY);\r\n        this.pipeIdx += 2;\r\n        if (this.pipeIdx >= 7) {\r\n            this.pipeIdx = 0;\r\n        }\r\n    }\r\n    updateScore() {\r\n        this.scoreController.setHighest();\r\n    }\r\n    pauseGame() {\r\n        this.sceneManager.changeScene('PauseScene');\r\n    }\r\n    inputHandler() {\r\n        this.inputManager.onSpaceDown(this.bird.flyUp.bind(this.bird), 'PlayScene');\r\n        this.inputManager.onClickBtn(this.bird.flyUp.bind(this.bird), 'PlayScene');\r\n        this.inputManager.onKeyPDown(this.pauseGame.bind(this), 'PlayScene');\r\n        document.addEventListener('click', (e) => {\r\n            if (this.sceneName == this.sceneManager.getCurrentName()) {\r\n                this.inputManager.enQueue('Click');\r\n            }\r\n        });\r\n    }\r\n    render(scene) {\r\n        super.render(scene);\r\n    }\r\n    checkReachGround() {\r\n        if (this.bird.y >= Contants_1.Constants.CANVAS_H - 80) {\r\n            this.isOver = true;\r\n            this.isCollided = false;\r\n        }\r\n    }\r\n    checkCollision() {\r\n        // Collision with ground\r\n        if (this.bird.y >= Contants_1.Constants.CANVAS_H - 80) {\r\n            this.isOver = true;\r\n        }\r\n        // Collison with pipes\r\n        this.pipes.forEach((p) => {\r\n            if (this.Collide.isCollided(this.bird, p)) {\r\n                this.isCollided = true;\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.PlayScene = PlayScene;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Scenes/PlayScene.ts?");

/***/ }),

/***/ "./src/FlappyBird/Scenes/StartScene.ts":
/*!*********************************************!*\
  !*** ./src/FlappyBird/Scenes/StartScene.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.StartScene = void 0;\r\nconst Background_1 = __webpack_require__(/*! ../Object/ImgObject/Background */ \"./src/FlappyBird/Object/ImgObject/Background.ts\");\r\nconst FlappyImg_1 = __webpack_require__(/*! ../Object/ImgObject/FlappyImg */ \"./src/FlappyBird/Object/ImgObject/FlappyImg.ts\");\r\nconst PlayBtn_1 = __webpack_require__(/*! ../Object/ImgObject/PlayBtn */ \"./src/FlappyBird/Object/ImgObject/PlayBtn.ts\");\r\nconst Scene_1 = __webpack_require__(/*! ../../GameEngine/Scene */ \"./src/GameEngine/Scene.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass StartScene extends Scene_1.Scene {\r\n    constructor(areaId, name, game) {\r\n        super(areaId, name, game);\r\n        this.backgounds = [];\r\n        // Init background\r\n        for (let i = 0; i < 3; i++) {\r\n            let bg = new Background_1.Background(Contants_1.Constants.CANVAS_W * i, 0, Contants_1.Constants.CANVAS_W, Contants_1.Constants.CANVAS_H, 'bg');\r\n            this.backgounds.push(bg);\r\n        }\r\n        this.flappyImg = new FlappyImg_1.FlappyImg(355, 100, 300, 100, 'flappy');\r\n        this.playBtn = new PlayBtn_1.PlayBtn(415, 180, 180, 180, 'playbtn');\r\n        this.addObjs(this.backgounds);\r\n        this.objs.push(this.flappyImg);\r\n        this.objs.push(this.playBtn);\r\n        this.inputHandler();\r\n    }\r\n    update(time, delta) {\r\n        this.updateBackground(delta);\r\n    }\r\n    updateBackground(delta) {\r\n        for (let i = 0; i < this.backgounds.length; i++) {\r\n            this.backgounds[i].update(this.backgounds.length);\r\n        }\r\n    }\r\n    inputHandler() {\r\n        this.inputManager.onEnterDown(this.startGame.bind(this), 'StartScene');\r\n        this.inputManager.onClickBtn(this.startGame.bind(this), 'StartScene');\r\n        document.addEventListener('click', (e) => {\r\n            let x = e.clientX;\r\n            let y = e.clientY;\r\n            if (this.inputManager.getButtonClick(x, y, 415, 120, 180, 180) && this.sceneName == this.sceneManager.getCurrentName()) {\r\n                this.inputManager.enQueue('Click');\r\n            }\r\n        });\r\n    }\r\n    startGame() {\r\n        this.sceneManager.changeScene('PlayScene');\r\n    }\r\n    render(scene) {\r\n        super.render(scene);\r\n    }\r\n}\r\nexports.StartScene = StartScene;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/Scenes/StartScene.ts?");

/***/ }),

/***/ "./src/FlappyBird/ScoreController.ts":
/*!*******************************************!*\
  !*** ./src/FlappyBird/ScoreController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ScoreController = void 0;\r\nconst Score_1 = __webpack_require__(/*! ./Object/Score */ \"./src/FlappyBird/Object/Score.ts\");\r\nconst HighestText_1 = __webpack_require__(/*! ./Object/TextObject/HighestText */ \"./src/FlappyBird/Object/TextObject/HighestText.ts\");\r\nclass ScoreController {\r\n    constructor() {\r\n        this.curScore = 0;\r\n        this.highest = 0;\r\n        this.highestText = new HighestText_1.HighestText(335, 245, 0, 0);\r\n        this.scoreText = new Score_1.Score(10, 50, 0, 0);\r\n        this.scoreText.setTextStyle(\"30px Arial\", \"#ffffff\");\r\n        this.scoreText.setContent(\"Score: \");\r\n    }\r\n    setHighest() {\r\n        this.highest = Math.max(this.curScore, this.highest);\r\n        this.highestText.updateScore(this.highest);\r\n    }\r\n    getHighest() {\r\n        return this.highest;\r\n    }\r\n    getScoreText() {\r\n        return this.scoreText;\r\n    }\r\n    updateCurText() {\r\n        this.scoreText.updateScore(this.curScore);\r\n    }\r\n    resetScore() {\r\n        this.curScore = 0;\r\n        this.updateCurText();\r\n    }\r\n    incScore() {\r\n        this.curScore += 1;\r\n    }\r\n}\r\nexports.ScoreController = ScoreController;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/FlappyBird/ScoreController.ts?");

/***/ }),

/***/ "./src/GameEngine/Game.ts":
/*!********************************!*\
  !*** ./src/GameEngine/Game.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Game = void 0;\r\nconst InputHandler_1 = __webpack_require__(/*! ./Helpers/InputHandler */ \"./src/GameEngine/Helpers/InputHandler.ts\");\r\nconst SceneManager_1 = __webpack_require__(/*! ./SceneManager */ \"./src/GameEngine/SceneManager.ts\");\r\nconst Loader_1 = __webpack_require__(/*! ./Loader */ \"./src/GameEngine/Loader.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../FlappyBird/Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass Game {\r\n    constructor() {\r\n        this.lastTime = window.performance.now();\r\n        this.sceneManager = new SceneManager_1.SceneManager();\r\n        this.inputManager = new InputHandler_1.InputHandler();\r\n        this.inputManager.sceneManager = this.sceneManager;\r\n        this.loader = new Loader_1.Loader();\r\n    }\r\n    loadAssets() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const promises = [];\r\n            for (let i = 0; i < Contants_1.Constants.ImgKeys.length; i++) {\r\n                const loadImagePromise = this.loader.loadImage(Contants_1.Constants.ImgKeys[i]);\r\n                promises.push(loadImagePromise);\r\n            }\r\n            yield Promise.all(promises);\r\n        });\r\n    }\r\n    startGame() {\r\n        this.loadAssets().then(() => {\r\n            this.start();\r\n        });\r\n    }\r\n    start() {\r\n        requestAnimationFrame(() => this.loop());\r\n    }\r\n    loop() {\r\n        const time = window.performance.now();\r\n        const delta = time - this.lastTime;\r\n        this.inputManager.processInput();\r\n        this.sceneManager.getCurrentScene().update(time, delta);\r\n        this.sceneManager.getCurrentScene().render(this.sceneManager.getCurrentScene());\r\n        this.lastTime = time;\r\n        requestAnimationFrame(() => this.loop());\r\n    }\r\n}\r\nexports.Game = Game;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Game.ts?");

/***/ }),

/***/ "./src/GameEngine/Helpers/InputHandler.ts":
/*!************************************************!*\
  !*** ./src/GameEngine/Helpers/InputHandler.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.InputHandler = void 0;\r\nclass InputHandler {\r\n    constructor() {\r\n        this.queue = [];\r\n        this.callbacks = {};\r\n        this.listenEvent();\r\n    }\r\n    listenEvent() {\r\n        window.addEventListener('keydown', (e) => {\r\n            if (e.code == 'Space') {\r\n                this.queue.push('Space');\r\n            }\r\n            if (e.code == 'Enter') {\r\n                this.queue.push('Enter');\r\n            }\r\n            if (e.code == 'KeyP') {\r\n                this.queue.push('KeyP');\r\n            }\r\n        });\r\n    }\r\n    enQueue(event) {\r\n        this.queue.push(event);\r\n    }\r\n    processInput() {\r\n        for (const key of this.queue) {\r\n            this.callbacks[key].forEach(c => {\r\n                if (c[0] == this.sceneManager.getCurrentName()) {\r\n                    c[1]();\r\n                }\r\n            });\r\n        }\r\n        this.queue = [];\r\n    }\r\n    onSpaceDown(callback, sceneName) {\r\n        this.callbacks['Space'] = this.callbacks['Space'] || [];\r\n        this.callbacks['Space'].push([sceneName, callback]);\r\n    }\r\n    onEnterDown(callback, sceneName) {\r\n        this.callbacks['Enter'] = this.callbacks['Enter'] || [];\r\n        this.callbacks['Enter'].push([sceneName, callback]);\r\n    }\r\n    onClickBtn(callback, sceneName) {\r\n        this.callbacks['Click'] = this.callbacks['Click'] || [];\r\n        this.callbacks['Click'].push([sceneName, callback]);\r\n    }\r\n    onKeyPDown(callback, sceneName) {\r\n        this.callbacks['KeyP'] = this.callbacks['KeyP'] || [];\r\n        this.callbacks['KeyP'].push([sceneName, callback]);\r\n    }\r\n    onKeyCDown(callback, sceneName) {\r\n        this.callbacks['KeyC'] = this.callbacks['KeyC'] || [];\r\n        this.callbacks['KeyC'].push([sceneName, callback]);\r\n    }\r\n    getButtonClick(x, y, x1, y1, w, h) {\r\n        if (x >= x1 && x <= x1 + w && y >= y1 && y <= y1 + h) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n}\r\nexports.InputHandler = InputHandler;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Helpers/InputHandler.ts?");

/***/ }),

/***/ "./src/GameEngine/Helpers/Physic.ts":
/*!******************************************!*\
  !*** ./src/GameEngine/Helpers/Physic.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Physic = void 0;\r\nclass Physic {\r\n    constructor() { }\r\n    calDistance(y0, v0, a, t) {\r\n        // y = y0 + v0 * t + 1/2 * a * t^2;\r\n        return y0 + v0 * t + 0.5 * a * (t ** 2);\r\n    }\r\n    calSpeed(v0, a, t) {\r\n        // v = v0 + a * t;\r\n        return v0 + a * t;\r\n    }\r\n}\r\nexports.Physic = Physic;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Helpers/Physic.ts?");

/***/ }),

/***/ "./src/GameEngine/Loader.ts":
/*!**********************************!*\
  !*** ./src/GameEngine/Loader.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Loader = void 0;\r\nclass Loader {\r\n    constructor() {\r\n        this.library = new Map();\r\n    }\r\n    getImage(key) {\r\n        return this.library.get(key);\r\n    }\r\n    loadImage(key) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return new Promise((resolve, reject) => {\r\n                if (!this.library.has(key)) {\r\n                    let img = new Image();\r\n                    img.src = 'images/' + key + '.png';\r\n                    img.onload = function () {\r\n                        resolve();\r\n                    };\r\n                    img.onerror = reject;\r\n                    this.library.set(key, img);\r\n                }\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.Loader = Loader;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Loader.ts?");

/***/ }),

/***/ "./src/GameEngine/Object/GameObject.ts":
/*!*********************************************!*\
  !*** ./src/GameEngine/Object/GameObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GameObject = void 0;\r\nclass GameObject {\r\n    constructor(x, y, w, h) {\r\n        this.rotation = 0;\r\n        this.depth = 0;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = w;\r\n        this.height = h;\r\n    }\r\n    render(ctx, scene) { }\r\n}\r\nexports.GameObject = GameObject;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Object/GameObject.ts?");

/***/ }),

/***/ "./src/GameEngine/Object/ImgObject.ts":
/*!********************************************!*\
  !*** ./src/GameEngine/Object/ImgObject.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ImgObject = void 0;\r\nconst GameObject_1 = __webpack_require__(/*! ./GameObject */ \"./src/GameEngine/Object/GameObject.ts\");\r\nconst Contants_1 = __webpack_require__(/*! ../../FlappyBird/Contants */ \"./src/FlappyBird/Contants.ts\");\r\nclass ImgObject extends GameObject_1.GameObject {\r\n    constructor(x, y, w, h, name) {\r\n        super(x, y, w, h);\r\n        this.imgKey = name;\r\n    }\r\n    render(ctx, scene) {\r\n        ctx.save();\r\n        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);\r\n        ctx.rotate(this.rotation * Contants_1.Constants.TO_RADIANS);\r\n        ctx.drawImage(scene.loader.getImage(this.imgKey), -(this.width / 2), -(this.height / 2), this.width, this.height);\r\n        ctx.restore();\r\n    }\r\n}\r\nexports.ImgObject = ImgObject;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Object/ImgObject.ts?");

/***/ }),

/***/ "./src/GameEngine/Object/Sprite.ts":
/*!*****************************************!*\
  !*** ./src/GameEngine/Object/Sprite.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Sprite = void 0;\r\nconst ImgObject_1 = __webpack_require__(/*! ./ImgObject */ \"./src/GameEngine/Object/ImgObject.ts\");\r\nclass Sprite extends ImgObject_1.ImgObject {\r\n    constructor(x, y, name, w, h, numFrame) {\r\n        super(x, y, w, h, name);\r\n        this.frames = [];\r\n        this.idx = 0;\r\n        this.numFrame = 0;\r\n        this.changeFrameCount = 0;\r\n        this.numFrame = numFrame ? numFrame : 1;\r\n        this.imgName = name.slice(0, name.length - 1);\r\n        this.initFrames();\r\n        this.imgKey = this.frames[this.idx];\r\n    }\r\n    initFrames() {\r\n        for (let i = 1; i <= this.numFrame; i++) {\r\n            let key = this.imgName + i;\r\n            this.frames.push(key);\r\n        }\r\n    }\r\n}\r\nexports.Sprite = Sprite;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Object/Sprite.ts?");

/***/ }),

/***/ "./src/GameEngine/Object/TextObject.ts":
/*!*********************************************!*\
  !*** ./src/GameEngine/Object/TextObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TextObject = void 0;\r\nconst GameObject_1 = __webpack_require__(/*! ./GameObject */ \"./src/GameEngine/Object/GameObject.ts\");\r\nclass TextObject extends GameObject_1.GameObject {\r\n    constructor(x, y, w, h) {\r\n        super(x, y, w, h);\r\n        this.font = '';\r\n        this.style = '';\r\n        this.content = '';\r\n    }\r\n    setTextStyle(font, style) {\r\n        this.font = font;\r\n        this.style = style;\r\n    }\r\n    setContent(content) {\r\n        this.content = content;\r\n    }\r\n    render(ctx, scene) {\r\n        ctx.font = this.font;\r\n        ctx.fillStyle = this.style;\r\n        ctx.fillText(this.content, this.x, this.y);\r\n    }\r\n}\r\nexports.TextObject = TextObject;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Object/TextObject.ts?");

/***/ }),

/***/ "./src/GameEngine/Renderer.ts":
/*!************************************!*\
  !*** ./src/GameEngine/Renderer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Renderer = void 0;\r\nclass Renderer {\r\n    constructor(areaId) {\r\n        this.canvas = document.getElementById(areaId);\r\n        this.ctx = this.canvas.getContext('2d');\r\n    }\r\n    render(scene) {\r\n        // this.ctx.clearRect(0, 0, 1000, 500)\r\n        scene.objs.sort((a, b) => { return a.depth - b.depth; }).forEach((obj) => {\r\n            obj.render(this.ctx, scene);\r\n        });\r\n    }\r\n}\r\nexports.Renderer = Renderer;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Renderer.ts?");

/***/ }),

/***/ "./src/GameEngine/Scene.ts":
/*!*********************************!*\
  !*** ./src/GameEngine/Scene.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Scene = void 0;\r\nconst Renderer_1 = __webpack_require__(/*! ../GameEngine/Renderer */ \"./src/GameEngine/Renderer.ts\");\r\nclass Scene {\r\n    constructor(areaId, sceneName, game) {\r\n        this.objs = [];\r\n        this.Renderer = new Renderer_1.Renderer(areaId);\r\n        this.sceneName = sceneName;\r\n        this.game = game;\r\n        this.inputManager = this.game.inputManager;\r\n        this.loader = this.game.loader;\r\n        // console.log(this.loader)\r\n        // this.loadAssets().then(() => startGame())\r\n    }\r\n    // async loadAssets() {\r\n    //     // await this.game.load.addToLibrary()\r\n    //     return\r\n    // }\r\n    addObjs(objs) {\r\n        objs.forEach((obj) => {\r\n            this.objs.push(obj);\r\n            obj.scene = this;\r\n        });\r\n    }\r\n    inputHandler() { }\r\n    update(time, delta) { }\r\n    render(scene) {\r\n        this.Renderer.render(scene);\r\n    }\r\n}\r\nexports.Scene = Scene;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/Scene.ts?");

/***/ }),

/***/ "./src/GameEngine/SceneManager.ts":
/*!****************************************!*\
  !*** ./src/GameEngine/SceneManager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.SceneManager = void 0;\r\nclass SceneManager {\r\n    constructor() {\r\n        this.scenes = new Map();\r\n        this.curName = 'StartScene';\r\n    }\r\n    addScene(name, scene) {\r\n        this.scenes.set(name, scene);\r\n        scene.sceneManager = this;\r\n    }\r\n    getCurrentScene() {\r\n        return this.scenes.get(this.curName);\r\n    }\r\n    getCurrentName() {\r\n        return this.curName;\r\n    }\r\n    changeScene(name) {\r\n        this.curName = name;\r\n    }\r\n}\r\nexports.SceneManager = SceneManager;\r\n\n\n//# sourceURL=webpack://WebpackTut/./src/GameEngine/SceneManager.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/FlappyBird/FlappyBird.ts");
/******/ 	
/******/ })()
;