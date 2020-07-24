import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser';

import { html, component } from 'haunted';

import { CastleScene } from './castlescene.js';

class WorkZoneDefenseGame {
    constructor(parent) {
        this.game = new Game(
            WebGL(),
            Size(800, 420),
            Parent(parent),
            BackgroundColor(0x2d2d2d),
            Scenes(CastleScene)
        );
    }
}

function GameComponent() {
    const gameDiv = document.createElement('div');
    new WorkZoneDefenseGame(gameDiv);
    return html`${gameDiv}`;
}

customElements.define('game-main', component(GameComponent));
