import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';

import { AddChild } from '@phaserjs/phaser/display';
import { ImageFile } from '@phaserjs/phaser/loader/files';
import { Sprite } from '@phaserjs/phaser/gameobjects';
import { StaticWorld } from '@phaserjs/phaser/world';
import { On } from '@phaserjs/phaser/events';
import { PICO8 } from '@phaserjs/phaser/textures/palettes/PICO8';
import { PixelTexture } from '@phaserjs/phaser/textures/types/PixelTexture';
import { Mouse } from '@phaserjs/phaser/input/mouse/Mouse';
import { SetInteractive } from '@phaserjs/phaser/input/SetInteractive';

import { html, component } from 'haunted';

class Demo extends Scene {
    constructor () {
        super();

        const world = new StaticWorld(this);
        const texture = PixelTexture({
            data: [
                '..9..9..',
                '..9999..',
                '.AAAAAA.',
                '.A3F6FA.',
                '.AFFFFA.',
                '.FEEEEAA',
                '.EEEEEEA',
                '..E..E..',
            ],
            pixelWidth: 4,
            pixelHeight: 4,
            palette: PICO8,
        });
        const princess = new Sprite(640, 100, texture);
        SetInteractive(princess);

        const mouse = new Mouse(this.game.renderer.canvas);
        On(mouse, 'pointerdown', () => {
            if (mouse.hitTest(princess)) {
                this.isDragging = true;
            }
        });
        On(mouse, 'pointermove', (x, y) => {
            if (this.isDragging) {
                princess.setPosition(x, y);
            }
        });
        On(mouse, 'pointerup', () => {
            this.isDragging = false;
        });

        AddChild(world, princess);

        ImageFile('logo', 'assets/sprites/logo.png')
            .load().then(() => {
            const logo = new Sprite(400, 300, 'logo');

            On(this, 'update', () => logo.rotation += 0.01);

            AddChild(world, logo);
        });
    }

    create() {
    }
}

class WorkZoneDefenseGame {
    constructor(parent) {
        this.game = new Game(
            WebGL(),
            Size(800, 600),
            Parent(parent),
            BackgroundColor(0x2d2d2d),
            Scenes(Demo)
        );
    }
}

export function GameComponent() {
    const gameDiv = document.createElement('div');
    new WorkZoneDefenseGame(gameDiv);
    return html`${gameDiv}`;
}

customElements.define('game-main', component(GameComponent));
