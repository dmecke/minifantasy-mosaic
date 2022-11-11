import Glyph from './Glyph';

export default interface FontFace {
    readonly image: string;
    readonly glyphs: Glyph[][];
    readonly height: number;
}
