import FontFace from './FontFace';
import Glyph from './Glyph';
import ImageLoader from '../Assets/ImageLoader';
import TextAlign from './TextAlign';
import Vector from '../Math/Vector';

export default class Font {

    private position = Vector.null();
    private align = TextAlign.left;
    private _width = new Map<string, number>();
    private _wrap: number|null = null;

    private glyphs: Glyph[];

    constructor(
        private readonly fontFace: FontFace,
    ) {
        this.glyphs = fontFace.glyphs.flat();
    }

    at(position: Vector): this {
        this.position = position;

        return this;
    }

    wrap(width: number): this {
        this._wrap = width;
        return this;
    }

    alignLeft(): this {
        this.align = TextAlign.left;

        return this;
    }

    alignRight(): this {
        this.align = TextAlign.right;

        return this;
    }

    alignCenter(): this {
        this.align = TextAlign.center;

        return this;
    }

    draw(text: string): void {
        let position = new Vector(this.xStart(text), this.position.y);

        let lineWidth = 0;
        for (let i = 0; i < text.length; i++) {
            const glyph = this.getGlyph(text[i]);
            const isNewWordStart = i > 0 && this.getGlyph(text[i]).char !== ' ' && this.getGlyph(text[i - 1]).char === ' ';
            let upcomingWordWidth = 0;

            for (let j = 0; i + j < text.length && text[i + j] !== ' '; j++) {
                upcomingWordWidth += this.getGlyph(text[i + j]).width;
            }
            if (this._wrap !== null && isNewWordStart && lineWidth + upcomingWordWidth > this._wrap) {
                lineWidth = 0;
                position = new Vector(this.xStart(text), position.y + this.fontFace.height);
            } else {
                lineWidth += glyph.width + 1;
            }
            ImageLoader.instance.fromName(
                this.fontFace.image,
                this.getGlyphPosition(glyph),
                new Vector(glyph.width, this.fontFace.height),
                position,
            ).draw();
            position = position.addX(glyph.width + 1);
        }
    }

    private xStart(text: string): number {
        switch (this.align) {
            case TextAlign.left:
                return this.position.x;

            case TextAlign.right:
                if (this._wrap === null) {
                    return this.position.subtractX(this.getWidth(text)).x;
                } else {
                    return Math.min(this.position.subtractX(this.getWidth(text)).x, this._wrap);
                }

            case TextAlign.center:
                if (this._wrap === null) {
                    return this.position.subtractX(Math.floor(this.getWidth(text) / 2)).x;
                } else {
                    return Math.min(this.position.subtractX(Math.floor(this.getWidth(text) / 2)).x, this._wrap);
                }
        }

        throw new Error(`Invalid text align: "${this.align}".`);
    }

    private getGlyph(char: string): Glyph {
        if (char.length !== 1) {
            throw new Error('Can only get a glyph for a single char.');
        }

        if (this.glyphs.filter(glyph => glyph.char === char).length === 0) {
            throw new Error(`Char "${char}" does not exist in font face "${this.fontFace.constructor.name}".`);
        }

        return this.glyphs.filter(glyph => glyph.char === char)[0];
    }

    getGlyphPosition(glyph: Glyph): Vector {
        for (let i = 0; i < this.fontFace.glyphs.length; i++) {
            const glyphs = this.fontFace.glyphs[i];
            if (glyphs.includes(glyph)) {
                let x = 0;
                for (const g of glyphs) {
                    if (g.char === glyph.char) {
                        return new Vector(x, this.fontFace.height * i);
                    }
                    x += g.width + 1;
                }
            }
        }

        throw new Error(`Could not find glyph position of "${glyph.char}" in font face "${this.fontFace.constructor.name}".`);
    }

    getWidth(text: string): number {
        if (!this._width.has(text)) {
            let width = 0;
            for (let i = 0; i < text.length; i++) {
                width += this.getGlyph(text[i]).width;
                if (i < text.length - 1) {
                    width++;
                }
            }
            this._width.set(text, width);
        }

        return this._width.get(text);
    }

    getHeight(): number {
        return this.fontFace.height;
    }
}
