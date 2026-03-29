import { MoodBoardEl } from "./moodboardel.js";
export class Moodboard {
    constructor(selector, options = {}) {
        this.layoutElements = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.elements = document.querySelectorAll(selector);
        this.coverage = options.coverage || 0.2;
        this.variation = options.variation || 0.2;
        this.resizeDelay = options.resizeDelay ?? 300;
        this.init();
    }
    init() {
        this.instantiateLayoutElements();
        this.initLayout();
        this.setupResizeListener();
    }
    instantiateLayoutElements() {
        this.elements.forEach(el => {
            this.layoutElements.push(new MoodBoardEl(el));
        });
    }
    initLayout() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.positionLayoutElements();
    }
    setupResizeListener() {
        window.addEventListener('resize', () => {
            window.clearTimeout(this.resizeTimer);
            this.resizeTimer = window.setTimeout(() => {
                this.initLayout();
            }, this.resizeDelay);
        });
    }
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    positionLayoutElements() {
        this.layoutElements.forEach((el) => {
            const coverage = this.coverage / this.layoutElements.length;
            el.position(coverage, this);
        });
    }
}
//# sourceMappingURL=moodboard.js.map