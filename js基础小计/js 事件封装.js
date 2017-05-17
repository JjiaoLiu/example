/*   * addEventListener:����DomԪ�ص��¼�   *   * target����������   * type�������������ͣ���click,mouseover   * func����������   */
function addEventHandler(target, type, func) {
    if (target.addEventListener) {    //����IE9���ȸ�ͻ��
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func;
    }
}
/*   * removeEventHandler:�Ƴ�DomԪ�ص��¼�   *   * target����������   * type�������������ͣ���click,mouseover   * func����������   */
function removeEventHandler(target, type, func) {
    if (target.removeEventListener) {    //����IE9���ȸ�ͻ��
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
        target.detachEvent("on" + type, func);
    } else {
        delete target["on" + type];
    }
}
var eventOne = function () {
    alert("��һ�������¼�");
};
function eventTwo() {
    alert("�ڶ��������¼�");
}
window.onload = function () {
    var bindEventBtn = document.getElementById("bindEvent");   //����eventOne�¼�
    addEventHandler(bindEventBtn, "click", eventOne);   //����eventTwo�¼�
    addEventHandler(bindEventBtn, "click", eventTwo);   //����������¼�
    addEventHandler(bindEventBtn, "click", function () {
        alert("�����������¼�");
    });   //ȡ����һ�������¼�
    removeEventHandler(bindEventBtn, "click", eventOne);   //ȡ���ڶ��������¼�
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
//<input type="button" value="����" id="bindEvent">    <input type="button" value="����2" id="yuanEvent">
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


