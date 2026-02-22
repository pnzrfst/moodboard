import { Moodboard } from "./moodboard.js";

export class MoodBoardEl {
    private el: HTMLElement;

    private originalWidth: number = 0;
    private originalHeight: number = 0;
    private ready : Promise<void>;

    constructor(element: HTMLElement){
        this.el = element
        this.ready = this.initialize();
        
    }


    private initialize(): Promise<void> {
        const src = this.el.getAttribute('src');
        
        return new Promise<void>((resolve) => {
            if(!src) return resolve();

            const image = new Image();
            image.onload = () => {
                this.originalHeight = image.height;
                this.originalWidth = image.width;
                resolve();
            };
            image.src = src;
        })

        
    }

    public async position(coverage: number, layout: Moodboard): Promise<void>{
        await this.ready

        const dmn = this.getWidthAndHeight(coverage, layout);
        const left = this.getLeft(dmn.width, layout);
        const top = this.getTop(dmn.height, layout);

        this.el.style.width = dmn.width + 'px';
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
        this.el.style.position = 'absolute';
    }

    private getLeft(width: number, layout: Moodboard){
        return Moodboard.randomNumber(0, layout.width - width);
    }

    private getTop(height: number, layout: Moodboard){
        return Moodboard.randomNumber(0, layout.height - height);
    }

    private getWidthAndHeight(coverage: number, layout: Moodboard){
        const totalCoverage = layout.width * layout.height;
        let area = coverage * totalCoverage;
        const variation = area * layout.variation;
        area = Moodboard.randomNumber(area - variation, area + variation);
        const ratio = this.originalWidth / this.originalHeight

        const height = Math.sqrt(area / ratio);
        const width = area / height;

        return { width: width, height: height};
    }
}

