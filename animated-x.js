(function (window) {

  window.jeAnimatedX = function (options) {

    var containerClassName = 'x-container';
    var barClassName = 'x-bar';

    var barHeight = options.barHeight || 4;
    var barGap = options.barGap || 3;
    var element = options.element;
    var barCount = options.barCount || 5;

    addClass(element, containerClassName);

    appendArrayOfElements(
      element,
      constructBars(barCount, barClassName)
    );

    injectStyle(
      getXContainerStyles(barHeight, barGap)
    );

    injectStyle(
      getActiveStyles(
        middleAlignmentOffset(element.offsetHeight, barHeight)
      )
    );

    if (element.addEventListener) {
      element.addEventListener(
        'click', 
        getOnClickListener(element, 'x-active')
      );
    } else {
      element.attachEvent('onclick', getOnClickListener(element, 'x-active'))
    }

  };

  function getOnClickListener (element, className) {
    return function () {
      toggleClass(element, className);
    }
  }

  function constructBars (number, className) {
    var bars = [];
    for (var i = 0 ; i < number; i++) {
      bars.push(createBar(className));
    }
    return bars;
  }

  function appendArrayOfElements (parentElement, elements) {
    for (var i = 0 ; i < elements.length ; i++) {
      var element = elements[i];
      parentElement.appendChild(element);
    };
  }

  function addClass (el, className) {
    el.className = el.className + ' ' + className;
  }

  function removeClass (el, className) {
    el.className = el.className
      .replace(className, '')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '');
  }

  function hasClass (el, className) {
    return new RegExp(className).test(el.className);
  }

  function toggleClass (el, className) {
    if (hasClass(el, className)) {
      removeClass(el, className);
    } else {
      addClass(el, className);
    }
  }
  function createBar (className) {
    var bar = document.createElement('div');
    bar.className = className;
    return bar;
  }

  function injectStyle (styleString) {
    var styleElement = document.createElement('style');
    styleElement.type = "text/css";

    if (typeof styleElement.styleSheet === 'object') {
      styleElement.styleSheet.cssText = styleString
    } else {
      styleElement.innerHTML = styleString;
    }

    var firstStyleElement = document.querySelector('head style');
    document.querySelector('head')
      .insertBefore(styleElement, firstStyleElement);  
  }

  function middleAlignmentOffset (containerHeight, childHeight) {
    return (containerHeight / 2) - (childHeight / 2);
  }

  function getXContainerStyles (height, gap) {
    return (
      '.x-container {' +
      '  position: relative;' +
      '  cursor: pointer;' +
      '}' + 
      '.x-container.x-active .x-bar:not(:first-child):not(:last-child) {' +
      '  opacity: 0;' +
      '}' + 
      '.x-container .x-bar {' +
      '  position: relative;' +
      '  opacity: 1;' +
      '  top: 0px;' +
      '  -webkit-transition: all .45s;' +
      '  -moz-transition: all .45s;' +
      '  -ms-transition: all .45s;' +
      '  -o-transition: all .45s;' +
      '  transition: all .45s;' +
      '  background: black;' +
      '  height: ' + height + 'px;' +
      '  width: 100%;' +
      '  margin-bottom: ' + gap + 'px;' +
      '}'
    );
  }

  function getActiveStyles (middleOffset) {
    return (
      '.x-container.x-active .x-bar:first-child {' +
      '  -webkit-transform: rotate(45deg);' +
      '  -moz-transform: rotate(45deg);' +
      '  -ms-transform: rotate(45deg);' +
      '  -o-transform: rotate(45deg);' +
      '  transform: rotate(45deg);' +
      '  top: ' + middleOffset + 'px' +
      '}' + 
      '.x-container.x-active .x-bar:last-child {' +
      '  -webkit-transform: rotate(-45deg);' +
      '  -moz-transform: rotate(-45deg);' +
      '  -ms-transform: rotate(-45deg);' +
      '  -o-transform: rotate(-45deg);' +
      '  transform: rotate(-45deg);' +
      '  top: ' + (-1 * middleOffset) + 'px' +
      '}'
    );
  }

})(window);