/**
 * Created by Administrator on 2017/5/16 0016.
 */
"use strict";
var $ = function (_this) {
    return new Base(_this)
};
function Base(_this) {
    this.elements = [];
    if (_this != undefined) {
        this.elements[0] = _this;
    }
}
// dom
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this;
};
Base.prototype.getClass = function (className, idName) {
    var node = null;
    node = arguments.length == 2 ? document.getElementById(idName) : document;
    var all = node.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            this.elements.push(all[i]);
        }
    }
    return this;
};
Base.prototype.getTag = function (tag) {
    var tags = document.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        this.elements.push(tags[i])
    }
    return this;
};
Base.prototype.getElement = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};
// dom
Base.prototype.css = function (attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            if (typeof window.getComputedStyle != 'undefined') {//w3c
                return window.getComputedStyle(this.elements[i], null)[attr];
            } else if (typeof this.elements[i].currentStyle != 'undefined') {//ie
                return this.elements[i].currentStyle[attr];
            }
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
function layer(layerMain,layerClose,bgColor,zIndex) {
    var layer = null;
    layer = document.createElement("div");
    layer.className = "layer";
    document.body.appendChild(layer);
    var $layerMain = $().getClass(layerMain);
    var $layerClose = $().getClass(layerClose);
    var top = (getInner().height - parseInt($layerMain.css("height"))) / 2 + "px";
    var left = (getInner().width - parseInt($layerMain.css("width"))) / 2 + "px";
    $layerMain.css("position", "absolute")
        .css("display", "block")
        .css("z-index", parseInt(zIndex) + 1)
        .css("top", top)
        .css("left", left);
    $().getClass("layer").css("position", "absolute")
        .css("z-index", zIndex)
        .css("top", "0px")
        .css("left", "0px")
        .css("bottom", "0px")
        .css("right", "0px")
        .css("background", bgColor);
    $layerClose.css("cursor", "pointer");
    addEvent(getClassDom(layerClose)[0],"click",closeLayer);
    console.log("addEvent");
    $layerClose.click(function () {
        removeEvent(getClassDom(layerClose)[0],"click",closeLayer);
    });
    function closeLayer() {
        document.body.removeChild(layer);
        $layerMain.css("display", "none")
    }
};
Base.prototype.resize = function (fn) {
    addEvent(window, "resize", fn);
    return this;
};
Base.prototype.drag = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.position = "absolute";
        addEvent(this.elements[i], "mousedown", function (e) {
           if(this.innerHTML.trim() == "") e.preventDefault();
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;
            if(e.target.tagName == "H2"){
                addEvent(document, "mousemove", move);
                addEvent(document, "mouseup", up);
            }else{
                removeEvent(document,"mousemove",move);
                removeEvent(document,"mouseup",up);
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
                if(typeof _this.setCapture != "undefined") _this.setCapture();
            }
            function up() {
                removeEvent(document,"mousemove",move);
                removeEvent(document,"mouseup",up);
                if(typeof _this.releaseCapture != "undefined") _this.releaseCapture();
            }
        });
    }
    return this;
};
// dom
function getIdDom(id) {
    return document.getElementById(id);
}
function getClassDom(className, idName) {
    var node = null;
    var elements = [];
    node = arguments.length == 2 ? document.getElementById(idName) : document;
    var all = node.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            elements.push(all[i])
        }
    }
    return elements;
}
function getTagDom(tag) {
    return document.getElementsByTagName(tag);
}
function getElementDom(obj, num) {
    var elements = null;
    elements = obj[num];
    return elements;
}
// dom
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
    if(typeof e.preventDefault != "indefined"){
        e.preventDefault();
    }else{
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
        obj["on"+type]=addEvent.exec;
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
//兼容
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}