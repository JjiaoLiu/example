/**
 * Created by Administrator on 2017/5/16 0016.
 */
"use strict";
// $返回一个Base对象
var $ = function (args) {
    return new Base(args)
};
// 在构造函数上操作elements
function Base(args) {
    this.elements = [];
    if (typeof args == "string") {
        switch (args.charAt(0)) {
            case "#":
                this.elements.push(this.getId(args.substring(1)));
                break;
            case ".":
                this.elements = this.getClass(args.substring(1));
                break;
            default:
                this.elements = this.getTag(args);
        }
    } else if (typeof args == "object") { //---- this
        if (args != undefined) {
            this.elements[0] = args;
        }
    }
}
Base.prototype.getId = function (id) {
    return document.getElementById(id);
};
Base.prototype.getClass = function (className, parentNode) {
    var node = null;
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            temps.push(all[i]);
        }
    }
    return temps;
};
Base.prototype.getTag = function (tag, parentNode) {
    var node = null;
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i])
    }
    return temps;
};
Base.prototype.getElement = function (index) {
    var element = this.elements[index];
    this.elements = [];
    this.elements[0] = element;
    return this;
};
function getDom(args) {
    var elements = [];
    if (typeof args == "string") {
        switch (args.charAt(0)) {
            case "#":
                return document.getElementById(args.substring(1));
                break;
            case ".":
                var all = document.getElementsByTagName("*");
                for (var i = 0; i < all.length; i++) {
                    if (all[i].className == args.substring(1)) {
                        elements.push(all[i]);
                    }
                }
                break;
            default:
                var tags = document.getElementsByTagName(args);
                for (var i = 0; i < tags.length; i++) {
                    elements.push(tags[i])
                }
        }
    }
    return elements;
}
//权重有问题
Base.prototype.find = function (str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case "#":
                childElements.push(this.getId(str.substring(1)));
                break;
            case ".":
                var temps = this.getClass(str.substring(1), this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
                break;
            default:
                var temps = this.getTag(str, this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
};
Base.prototype.css = function (attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            return getStyle(this.elements[i], attr) + 'px';
        }
        this.elements[i].style[attr] = value;
    }
    return this;
};
Base.prototype.html = function (str) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!arguments.length) {
            return this.elements[i].innerHTML
        }
        this.elements[i].innerHTML = str;
    }
    return this;
};
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], "click", fn);
    }
    return this;
};
Base.prototype.addClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className += " " + className;
        }
    }
    return this;
};
Base.prototype.removeClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), "");
        }
    }
    return this;
};
Base.prototype.hover = function (over, out) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], "mouseover", over);
        addEvent(this.elements[i], "mouseout", out);
    }
    return this;
};
Base.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = "none";
    }
    return this;
};
Base.prototype.show = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = "block";
    }
    return this;
};
//使用方法：.layer("layerMain","layerClose","rgba(0,0,0,0.6)",999);
function layer(layerMain, layerClose, bgColor, zIndex) {
    var layer = null;
    layer = document.createElement("div");
    layer.className = "layer";
    document.body.appendChild(layer);
    var $layerMain = $(layerMain);
    var $layerClose = $(layerClose);
    var top = (getInner().height - parseInt($layerMain.css("height"))) / 2 + "px";
    var left = (getInner().width - parseInt($layerMain.css("width"))) / 2 + "px";
    $layerMain.css("position", "absolute")
        .css("display", "block")
        .css("z-index", parseInt(zIndex) + 1)
        .css("top", top)
        .css("left", left);
    $(".layer").css("position", "absolute")
        .css("z-index", zIndex)
        .css("top", "0px")
        .css("left", "0px")
        .css("bottom", "0px")
        .css("right", "0px")
        .css("background", bgColor);
    $layerClose.css("cursor", "pointer");
    addEvent(getDom(layerClose)[0], "click", closeLayer);
    addEvent(document, "scroll", scrollFalse);
    $layerClose.click(function () {
        removeEvent(getDom(layerClose)[0], "click", closeLayer);
        removeEvent(document, "scroll", scrollFalse);
    });
    function closeLayer() {
        document.body.removeChild(layer);
        $layerMain.css("display", "none");
    }
};
Base.prototype.resize = function (fn) {
    addEvent(window, "resize", fn);
    return this;
};
Base.prototype.drag = function (dragDom) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.position = "absolute";
        addEvent(this.elements[i], "mousedown", function (e) {
            var _this = this;
            if (_this.innerHTML.trim() == "") e.preventDefault();
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;
            if (e.target.tagName == dragDom.toUpperCase()) {
                addEvent(document, "mousemove", move);
                addEvent(document, "mouseup", up);
            } else {
                removeEvent(document, "mousemove", move);
                removeEvent(document, "mouseup", up);
            }
            function move(e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                if (left < 0) {
                    left = 0;
                } else if (left > getInner().width - _this.offsetWidth) {
                    left = getInner().width - _this.offsetWidth;
                }
                if (top < 0) {
                    top = 0;
                } else if (top > getInner().height - _this.offsetHeight) {
                    top = getInner().height - _this.offsetHeight;
                }
                _this.style.left = left + "px";
                _this.style.top = top + "px";
                if (typeof _this.setCapture != "undefined") _this.setCapture();
            }

            function up() {
                removeEvent(document, "mousemove", move);
                removeEvent(document, "mouseup", up);
                if (typeof _this.releaseCapture != "undefined") _this.releaseCapture();
            }
        });
    }
    return this;
};
window.timer = null;
Base.prototype.animate = function (obj) {
    clearInterval(window.timer);
    //参数
    var attr = obj['attr'];
    var step = obj['step'] == undefined ? 10 : obj['step'];
    var target = obj['target'];
    var duration = obj['duration'] == undefined ? 50 : obj['duration'];
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        if (getStyle(element, attr) > target) {
            step = -step;
        }
        timer = setInterval(function () {
            element.style[attr] = getStyle(element, attr) + step + 'px';
            if ((getStyle(element, attr) + step >= obj['target'] && step > 0 ) || (getStyle(element, attr) + step <= obj['target'] && step < 0 )) {
                element.style[attr] = target + "px";
                clearInterval(timer);
            }
        }, duration)
    }
    return this;
};
function getInner() {
    if (window.innerWidth) {
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    } else if ((document.body) && (document.body.clientHeight)) {
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}
function getEvent(event) {
    return event || window.event
}
function preDef(event) {
    var e = getEvent(event);
    if (typeof e.preventDefault != "indefined") {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
addEvent.ID = 1;
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false)
    } else {
        //创建一个存放事件的哈希表
        if (!obj.events) obj.events = {};
        //第一次执行时执行
        if (!obj.events[type]) {
            // 创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //把第一次的事件处理函数线存储到第一个位置上
            if (obj["on" + type]) obj.events[type][0] = fn;
        } else {
            //同一个注册函数进行屏蔽
            if (addEvent.equal(obj.events[type], fn)) return false;
        }
        //从第二次开始使用计数器存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj["on" + type] = addEvent.exec;
    }
}
function removeEvent(obj, type, fn) {
    if (typeof removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else {
        if (obj.events) {
            for (var i in obj.events[type]) {
                if (obj.events[type][i] == fn) {
                    delete obj.events[type][i];
                }
            }
        }
    }
}
//执行事件处理函数
addEvent.exec = function (event) {
    var e = event || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es) {
        es[i].call(this, e);
    }
};
//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
    for (var i in es) {
        if (es[i] == fn) return true;
    }
    return false;
}
//把IE常用的event对象配对到W3C中
addEvent.fixEvent = function (event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopBubble = addEvent.fixEvent.stopBubble;
    event.target = event.srcElement;
    return event;
};
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false;
};
addEvent.fixEvent.stopBubble = function () {
    this.cancelBubble = true;
};
//滚动条清零
function scrollFalse() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
//浏览器检测
function getState() {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    document.write(ua.match(/msie ([\d.]+)/));
}
function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {
        value = parseInt(window.getComputedStyle(element, null)[attr]);
    } else if (typeof element.currentStyle != 'undefined') {
        value = parseInt(element.currentStyle[attr]);
    }
    return value;
}
//兼容
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
