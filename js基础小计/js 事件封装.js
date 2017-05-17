/*   * addEventListener:监听Dom元素的事件   *   * target：监听对象   * type：监听函数类型，如click,mouseover   * func：监听函数   */
function addEventHandler(target, type, func) {
    if (target.addEventListener) {    //监听IE9，谷歌和火狐
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func;
    }
}
/*   * removeEventHandler:移除Dom元素的事件   *   * target：监听对象   * type：监听函数类型，如click,mouseover   * func：监听函数   */
function removeEventHandler(target, type, func) {
    if (target.removeEventListener) {    //监听IE9，谷歌和火狐
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
        target.detachEvent("on" + type, func);
    } else {
        delete target["on" + type];
    }
}
var eventOne = function () {
    alert("第一个监听事件");
};
function eventTwo() {
    alert("第二个监听事件");
}
window.onload = function () {
    var bindEventBtn = document.getElementById("bindEvent");   //监听eventOne事件
    addEventHandler(bindEventBtn, "click", eventOne);   //监听eventTwo事件
    addEventHandler(bindEventBtn, "click", eventTwo);   //监听本身的事件
    addEventHandler(bindEventBtn, "click", function () {
        alert("第三个监听事件");
    });   //取消第一个监听事件
    removeEventHandler(bindEventBtn, "click", eventOne);   //取消第二个监听事件
    removeEventHandler(bindEventBtn, "click", eventTwo);
};
function Handle(event) {
    event = event || window.event;
    if (event.stopPropagation)
        event.stopPropagation();
    else event.cancelBubble = true;

}
function someHandle(event) {
    event = event || window.event;
    if (event.preventDefault)
        event.preventDefault();
    else event.returnValue = false;
}
//window.event? window.event.cancelBubble = true : e.stopPropagation();
//window.event? window.event.returnValue = false : e.preventDefault();
//<input type="button" value="测试" id="bindEvent">    <input type="button" value="测试2" id="yuanEvent">
function bubble() {
    var temp;
    for (var i = 0; i < this.length - 1; i++) {
        for (var j = 0; j < this.length - i - 1; j++) {
            if (this[j] > this[j + 1]) {
                temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
}

function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) {month = "0" + month}
    if (date < 10) {date = "0" + date}
    if (hour < 10) {hour = "0" + hour}
    if (minute < 10) {minute = "0" + minute}
    if (second < 10) {second = "0" + second}
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}


