import { Moodboard } from "./moodboard.js";
export class MoodBoardEl {
    constructor(element) {
        this.originalWidth = 0;
        this.originalHeight = 0;
        this.el = element;
        this.ready = this.initialize();
    }
    initialize() {
        const src = this.el.getAttribute('src');
        return new Promise((resolve) => {
            if (!src)
                return resolve();
            const image = new Image();
            image.onload = () => {
                this.originalHeight = image.height;
                this.originalWidth = image.width;
                resolve();
            };
            image.src = src;
        });
    }
    async position(coverage, layout) {
        await this.ready;
        const dmn = this.getWidthAndHeight(coverage, layout);
        const left = this.getLeft(dmn.width, layout);
        const top = this.getTop(dmn.height, layout);
        this.el.style.width = dmn.width + 'px';
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
        this.el.style.position = 'absolute';
    }
    getLeft(width, layout) {
        return Moodboard.randomNumber(0, layout.width - width);
    }
    getTop(height, layout) {
        return Moodboard.randomNumber(0, layout.height - height);
    }
    getWidthAndHeight(coverage, layout) {
        const totalCoverage = layout.width * layout.height;
        let area = coverage * totalCoverage;
        const variation = area * layout.variation;
        area = Moodboard.randomNumber(area - variation, area + variation);
        const ratio = this.originalWidth / this.originalHeight;
        const height = Math.sqrt(area / ratio);
        const width = area / height;
        return { width: width, height: height };
    }
}
//# sourceMappingURL=moodboardel.js.map