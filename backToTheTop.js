// ==UserScript==
// @name         BackToTheTop
// @namespace    https://github.com/AchooLuv
// @version      0.1
// @description  Steam好友动态回到顶部(原生JavaScript)!
// @author       AchooLuv
// @match        https://steamcommunity.com/id/
// @grant        none
// ==/UserScript==

(function _bTT() {
        'use strict';
        var eventObject = {
            addOnload: function (fn) {
                if (fn == null) {
                    fn = document;
                }
                var oldOnload = window.onload;
                if (window.onload != 'function') {
                    window.onload = fn;
                } else {
                    window.onload = function () {
                        oldOnload();
                        fn();
                    }
                }
            },
            addHander: function (ele, type, hander) {
                if (ele.addEventListerner) {
                    ele.addEventListerner(type, hander, false);
                } else if (ele.attachEvent) {
                    ele.attachEvent('on' + type, hander);
                } else {
                    ele['on' + type] = hander;
                }
            }
        };

        function toTop() {
            var timer = null,
                isTop = true,
                clientHeight = document.documentElement.clientHeight || document.clientHeight,
                targetTag = document.getElementById('ModalContentContainer'),
                _i = document.createElement('i'),
                _top = document.createElement('a');
        _top.setAttribute('href', 'javascript:;');
        _top.style.cssText = 'position:fixed;bottom:8%;right:22.5%;display:none;width:40px;height:40px;background:#1f6083;border-radius:50%;overflow:hidden'; //响应改用百分比
        targetTag.appendChild(_top);
        eventObject.addHander(window, 'scroll', function () {
            var _aTop = document.documentElement.scrollTop || document.body.scrollTop;
            _aTop >= clientHeight ? _top.style.display = 'block' : _top.style.display = 'none';
            if (!isTop) {
                clearInterval(timer);
            }
            isTop = false;
        });
        eventObject.addHander(_top, 'click', function () {
            timer = setInterval(function () {
                var _aTop = document.documentElement.scrollTop || document.body.scrollTop,
                    speed = Math.floor(-_aTop / 50);
                document.documentElement.scrollTop = document.body.scrollTop = _aTop + speed;
                isTop = true;
                if (_aTop == 0) {
                    clearInterval(timer);
                }
            });
        }, 50);
    }
    toTop();
})();