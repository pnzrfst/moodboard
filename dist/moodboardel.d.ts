import { Moodboard } from "./moodboard.js";
export declare class MoodBoardEl {
    private el;
    private originalWidth;
    private originalHeight;
    private ready;
    constructor(element: HTMLElement);
    private initialize;
    position(coverage: number, layout: Moodboard): Promise<void>;
    private getLeft;
    private getTop;
    private getWidthAndHeight;
}
//# sourceMappingURL=moodboardel.d.ts.map