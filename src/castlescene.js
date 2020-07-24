import { Scene } from '@phaserjs/phaser';

import { AddChild } from '@phaserjs/phaser/display';
import { ImageFile } from '@phaserjs/phaser/loader/files';
import { Sprite } from '@phaserjs/phaser/gameobjects';
import { StaticWorld } from '@phaserjs/phaser/world';
import { On } from '@phaserjs/phaser/events';
import { PICO8 } from '@phaserjs/phaser/textures/palettes/PICO8';
import { PixelTexture } from '@phaserjs/phaser/textures/types/PixelTexture';
import { Mouse } from '@phaserjs/phaser/input/mouse/Mouse';
import { SetInteractive } from '@phaserjs/phaser/input/SetInteractive';

export class CastleScene extends Scene {
    constructor () {
        super();

        const world = new StaticWorld(this);
        const princessTexture = PixelTexture({
            data: [
                '..9..9..',
                '..9999..',
                '.AAAAAA.',
                '.A3F3FA.',
                '.AFFFFA.',
                '.FEEEEAA',
                '.EEEEEEA',
                '..E..E..',
            ],
            pixelWidth: 4,
            pixelHeight: 4,
            palette: PICO8,
        });
        const princessSprite = new Sprite(120, 100, princessTexture);
        const princeTexture = PixelTexture({
            data: [
                '..9..9..',
                '..9999..',
                '.AAAAAA.',
                '.A3F3FA.',
                '.AFFFFA.',
                '.FDDDDF.',
                '..DDDD..',
                '..E..E..',
            ],
            pixelWidth: 4,
            pixelHeight: 4,
            palette: PICO8,
        });
        const princeSprite = new Sprite(640, 100, princeTexture);

        AddChild(world, princessSprite);
        AddChild(world, princeSprite);
        SetInteractive(princeSprite);
        SetInteractive(princessSprite);

        const mouse = new Mouse(this.game.renderer.canvas);
        On(mouse, 'pointerdown', () => {
            if (mouse.hitTest(princeSprite)) {
                this.isPrinceDragging = true;
            }
            if (mouse.hitTest(princessSprite)) {
                this.isPrincessDragging = true;
            }
        });
        On(mouse, 'pointermove', (x, y) => {
            if (this.isPrinceDragging) {
                princeSprite.setPosition(x, y);
            }
            if (this.isPrincessDragging) {
                princessSprite.setPosition(x, y);
            }
        });
        On(mouse, 'pointerup', () => {
            this.isPrincessDragging = false;
            this.isPrinceDragging = false;
        });

        ImageFile('logo', 'assets/sprites/logo.png')
            .load().then(() => {
            const logo = new Sprite(400, 300, 'logo');

            On(this, 'update', () => logo.rotation += 0.01);

            AddChild(world, logo);
        });
    }
}
