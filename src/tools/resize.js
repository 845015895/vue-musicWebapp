/**
 * 实现屏幕适配
 */



function Resize() {
    this.fontSize = Number(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px', ''));
    this.init();
}

Resize.prototype = {
    setFontSize: function () {
        let domEle = document.documentElement;
        let domWidth = domEle.getBoundingClientRect().width;
        if (domWidth > 500) {
            domWidth = 500;
        }
        let fontSize = domWidth / 20;
        domEle.style.fontSize = fontSize + "px";
        let htmlFontSize = Number(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px', ''));
        if (fontSize !== htmlFontSize) {
            domEle.style.fontSize = fontSize * (fontSize / htmlFontSize) + "px";
        }
        this.fontSize = fontSize;
    },
    
    ready: function () {
        let timeCode;
        let self = this;
        window.addEventListener("resize", function () {
            clearTimeout(timeCode);
            timeCode = setTimeout(self.setFontSize.bind(self), 300);
        }, false);
    },
    
    init: function () {
        this.setFontSize();
        this.ready();
    },
    
    px2rem: function (px) {
        return 20 / 375 * px;
    },
    
    rem2px: function (rem) {
        return rem * this.fontSize;
    },
    
    resetPx: function (px) {
        return this.rem2px(this.px2rem(px));
    }
    
};

export default new Resize();