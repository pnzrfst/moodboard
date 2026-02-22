import { MoodBoardEl } from "./moodboardel.js";
import type { MoodBoardOptions } from "./types.js";

export class Moodboard{

    private elements: NodeListOf<HTMLElement>
    private layoutElements: MoodBoardEl[] = [];
    private resizeTimer?: number;

    public coverage: number;
    public variation: number;
    public resizeDelay?: number;
    public width: number = window.innerWidth;
    public height: number = window.innerHeight;
    

    constructor(selector: string, options: MoodBoardOptions = {}){
        this.elements = document.querySelectorAll(selector);
        
        this.coverage = options.coverage || 0.2;
        this.variation = options.variation || 0.2;
        this.resizeDelay = options.resizeDelay ?? 300;

        this.init();
    }

    private init (): void {
        this.instantiateLayoutElements();
        this.initLayout();
        this.setupResizeListener();
    }

    private instantiateLayoutElements(): void {
        this.elements.forEach(el => {
            this.layoutElements.push(new MoodBoardEl(el))
        })
    }

    private initLayout(): void {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.positionLayoutElements();
    }

    private setupResizeListener(): void {
        window.addEventListener('resize', () => {
            window.clearTimeout(this.resizeTimer);
            this.resizeTimer = window.setTimeout(() => {
                this.initLayout();
            }, this.resizeDelay);
        });
    }

    public static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1 ) + min);
    }

    private positionLayoutElements(): void{
        this.layoutElements.forEach((el) => {
            const coverage = this.coverage / this.layoutElements.length;

            el.position(coverage, this);

        })
    }
}