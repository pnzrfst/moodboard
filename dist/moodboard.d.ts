import type { MoodBoardOptions } from "./types.js";
export declare class Moodboard {
    private elements;
    private layoutElements;
    private resizeTimer?;
    coverage: number;
    variation: number;
    resizeDelay?: number;
    width: number;
    height: number;
    constructor(selector: string, options?: MoodBoardOptions);
    private init;
    private instantiateLayoutElements;
    private initLayout;
    private setupResizeListener;
    static randomNumber(min: number, max: number): number;
    private positionLayoutElements;
}
//# sourceMappingURL=moodboard.d.ts.map