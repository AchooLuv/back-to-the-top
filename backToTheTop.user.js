// ==UserScript==
// @name         BackToTheTop
// @namespace    https://github.com/AchooLuv/Back-To-The-Top
// @version      0.1
// @description  Steam全站回到顶部脚本(原生JavaScript)!
// @author       AchooLuv
// @include      http*://steamcommunity.com/*
// @include      http*://store.steampowered.com/*
// @grant        none
// ==/UserScript==

(function _bTT() {
    'use strict';
    var eventObject = {
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
            targetTag = document.getElementById('global_header'),
            _style = document.createElement('style'),
            _i = document.createElement('i'),
            _top = document.createElement('a');
        _style.innerHTML = `
        @font-face {
            font-family: 'iconfont';  /* project id 979749 */
            src: url('//at.alicdn.com/t/font_979749_6dqwoqp866g.eot');
            src: url('//at.alicdn.com/t/font_979749_6dqwoqp866g.eot?#iefix') format('embedded-opentype'),
            url('//at.alicdn.com/t/font_979749_6dqwoqp866g.woff') format('woff'),
            url('//at.alicdn.com/t/font_979749_6dqwoqp866g.ttf') format('truetype'),
            url('//at.alicdn.com/t/font_979749_6dqwoqp866g.svg#iconfont') format('svg');
          }
        .iconfont{
        font-family:"iconfont" !important;
        font-size:40px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}`;
        document.body.insertBefore(_style, document.body.firstElementChild);
        _i.setAttribute('class', 'iconfont');
        _i.style.cssText = 'display:block;width:100%;height:100%;color:white;';
        _i.innerHTML = '&#xe6a8;';
        _top.appendChild(_i);

        _top.setAttribute('href', 'javascript:;');
        _top.style.cssText = 'position:fixed;bottom:8%;right:20%;display:none;width:40px;height:40px;border-radius:50%;overflow:hidden;z-index:9999;'; //响应改用百分比
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