(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const modal = require('..')
const bel = require('bel')
const csjs = require('csjs-inject')
const { newAccountOpt, runPlanOpt } = require('options')

function demoApp() {
    const recipients = []
    const createNewAccount = modal(newAccountOpt( createAccountProtocol('create-account') ), createAccountProtocol('create-new-account'))
    const runPlan = modal( runPlanOpt( runPlanProtocol('run-plan') ), runPlanProtocol('run-plan') )
    const app = bel`
    <div class="${css.container}">
        <section>
            <h1>Step modal</h1>
            ${createNewAccount}
        </section>
        <section>
            <h1>Default modal</h1>
            ${runPlan}
        </section>
        
    </div>`

    return app

    function runPlanProtocol(name) {
        return protocol(name)
    }

    function createAccountProtocol(name) {
        return protocol(name)
    }

    function protocol(name) {
        return sender => {
            recipients[name] = sender
            return (msg) => {
                console.log( msg );
            }
        }
    }
}

const css = csjs`
:root {
  --color-white: #FFF;
  --color-black: #000;
  --color-blue: #006FFF;
  --color-red: #FE1016;
  --color-orange: #FFA72A;
  --color-ultra-red: #FC708B;
  --color-flame: #E64B19;
  --color-verdigris: #33A9A9;
  --color-maya-blue: #72C3FC;
  --color-slate-blue: #695AD1;
  --color-blue-jeans: #3CB0FB;
  --color-dodger-blue: #378BF4;
  --color-slimy-green: #1C9100;
  --color-green-pigment: #109B36;
  --color-chrome-yellow: #FFA700;
  --color-bright-yellow-crayola: #FFA72A;
  --color-purple: #B700FF;
  --color-medium-purple: #B066FF;
  --color-grey33: #333;
  --color-grey66: #666;
  --color-grey70: #707070;
  --color-grey88: #888;
  --color-greyA2: #A2A2A2;
  --color-greyC3: #C3C3C3;
  --color-greyCB: #CBCBCB;
  --color-greyD8: #D8D8D8;
  --color-greyD9: #D9D9D9;
  --color-greyE2: #E2E2E2;
  --color-greyEB: #EBEBEB;
  --color-greyED: #EDEDED;
  --color-greyEF: #EFEFEF;
  --color-greyF2: #F2F2F2;
  --color-green: #109B36;
  --transparent: transparent;
  --define-font: *---------------------------------------------*;
  --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
  --size12: 1.2rem;
  --size14: 1.4rem;
  --size16: 1.6rem;
  --size18: 1.8rem;
  --size20: 2rem;
  --size22: 2.2rem;
  --size24: 2.4rem;
  --size26: 2.6rem;
  --size28: 2.8rem;
  --size30: 3rem;
  --size32: 3.2rem;
  --size36: 3.6rem;
  --size40: 4rem;
  --weight100: 100;
  --weight300: 300;
  --weight400: 400;
  --weight600: 600;
  --weight800: 800;
  --define-primary: *---------------------------------------------*;
  --primary-color: var(--color-black);
  --primary-bgColor: var(--color-white);
  --primary-font: Arial, sens-serif;
  --primary-font-size: var(--size16);
  --primary-input-radius: 8px;
}
* {
    box-sizing: border-box;
}
html {
    font-size: 62.5%;
}
body {
    margin: 0;
    padding: 0;
    font-size: var(--primary-font-size);
    font-family: var(--primary-font);
}
.container {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 90%;
    justify-content: center;
    margin-top: 20px;
}
`

document.body.append( demoApp() )
},{"..":30,"bel":6,"csjs-inject":9,"options":4}],2:[function(require,module,exports){
const bel = require('bel')
const icon = require('../../src/node_modules/icon')

module.exports = createAccount

function createAccount(protocol) {
    const sender = protocol( get )
    let address = 'hyper://'
    const input = bel`<input type="text" name="custom address" arial-label="Custom address" aria-required="true" value="${address}">`
    const customAddress = bel`<div class="col2 address">${input}</div>`
    const show1 = new icon({name: 'show'})
    const show2 = new icon({name: 'show'})
    const showButton1 = bel`<button role="button" data-state="hide" aria-label="show password" aria-live="assertive" onclick=${(e) => toggleIcon(showButton1, 'password')}>${show1}</button>`
    const showButton2 = bel`<button role="button" data-state="hide" aria-label="show password" aria-live="assertive" onclick=${(e) => toggleIcon(showButton2, 'confirm password')}>${show2}</button>`
    const createAccountElement = bel`
    <div class="form-field" data-step="create-account" aria-label="Create new account">
        <div class="row">
            <label for="chain network">Chain network</label>
            <select role="select" aria-label="Chain network" aria-live="assertive" data-state="main net" onchange=${(e) => handleOnChnage(e.target, e.target.value)}>
                <option role="option" aria-posinset="1" selected>Main net</option>
                <option role="option" aria-posinset="2">Test net</option>
                <option role="option" aria-posinset="3">Custom</option>
            </select>
        </div>
        <div class="row">
            <label for="address">Address</label>
            <span class="address" aria-label="Address">1MCsCUDzzJoGKHgBf2dE76BEWg3emZd9SS</span>
        </div>
        <div class="row">
            <label for="account">Account name</label>
            <input role="input" type="text" name="account" aria-label="Account name" aria-required="true">
        </div>
        <div class="row">
            <label for="password">Password</label>
            <div class="col2">
                <input role="input" type="password" name="password" aria-label="Password" aria-required="true">
                ${showButton1}
            </div>
            <span class="limit">min 8 chars</span>
        </div>
        <div class="row">
            <label for="confirm password">Confirm password</label>
            <div class="col2">
                <input role="input" type="password" name="confirm password" aria-label="Confirm password" aria-required="true">
                ${showButton2}
            </div>
        </div>
    </div>
    `
    return createAccountElement

    function handleOnChnage(target, val) {
        customAddress.remove()
        if (val === 'Custom') {
            target.dataset.state = val.toLowerCase()
            const parent = target.parentElement
            parent.append(customAddress)
        }
    }

    function toggleIcon(el, target) {
        const iconHide = new icon({name: 'hide'})
        const iconShow = new icon({name: 'show'})
        const state = el.dataset.state === 'hide' ? 'show' : 'hide'
        const toggleIcon = state === 'hide' ? iconShow : iconHide 
        const type = state === 'show' ? 'text' : 'password'
        const label = state === 'show' ? 'hide password' : 'show password'
        el.dataset.state = state
        el.ariaLabel = label
        el.replaceChild(toggleIcon, el.querySelector('.icon'))
        createAccountElement.querySelector(`[name="${target}"]`).type = type
        sender({flow: 'create-account', state, body: target })
    }

    function get (msg) {
        console.log(msg);
    }
}

},{"../../src/node_modules/icon":34,"bel":6}],3:[function(require,module,exports){
const bel = require('bel')

module.exports = runPlan

function runPlan (plan = null, protocol) {
    const send = protocol (get)
    const cancelButton = bel`<button class="btn" data-action="cancel" aria-label="Cancel" onclick="${() => handleCancel()}">Cancel</button>`
    const confirmButton = bel`<button class="btn" data-action="confirm" aria-label="Confirm" onclick="${() => handleConfirm()}">Confirm</button>`
    const el = bel`
    <section class="row" data-action="run-plan" aria-label="run plan"> 
        <p>
            Do you determine to be a sponsor for <strong>${plan}</strong>?<br/>
            This action will be continuous paying via your schedule.
        </p>
        <div class="actions" role="action">
            ${cancelButton}${confirmButton}
        </div>
    </section>`

    return el

    function handleCancel () {
        console.log('cancel');
    }

    function handleConfirm () {
        console.log('confirm');
    }

    function get (msg) {
        console.log( msg );
    }
}
},{"bel":6}],4:[function(require,module,exports){
const createAccount = require('./CreateAccount')
const runPlan = require('./RunPlan')

const newAccountOpt = (protocol) => {
    return {
        name: 'create new account',
        header: 'Create new account',
        body: createAccount( protocol ),
        ui: 'step-modal',
        theme: {
            // style: `
            // :host(i-modal[data-ui="custom"]) {
            //     --modal-bgColor: hsl(29, 100%, 70%)
            // }
            // `,
            // props: {
            //     bgColor: 'var(--color-greyE2)'
            // },
            header: {
                style: `
                /* :host(i-header[data-ui="step-modal"]) {
                    --modal-header-bgColor: hsl(202, 100%, 50%);
                } */
                :host(i-header[data-ui="custom"]) {
                    --modal-header-bgColor: hsl(29, 100%, 50%);
                    --modal-header-padding: 20px;
                }
                :host(i-header[data-ui="custom"]) h1 {
                    --modal-header-color: hsl(50, 100%, 50%);
                }
                `,
                // props: {
                //     size: 'var(--size28)',
                //     color: 'var(--color-black)',
                //     bgColor: 'var(--color-purple)'
                // }
            },
            body: {
                style: `
                :host(i-body[data-ui="custom"]) {
                    background-color: hsl(330, 2%, 22%);
                    padding: 30px 20px;
                }
                :host(i-body[data-ui="custom"]) label {
                    color: hsl(0, 0%, 100%);
                }
                :host(i-body[data-ui="custom"]) span {
                    color: hsl(0, 0%, 60%);
                }
                :host(i-body[data-ui="custom"]) .row:focus-within label {
                    --label-focus: hsl(29, 100%, 58%);
                }
                :host(i-body[data-ui="custom"]) input[name="address"]:disabled {
                    color: hsl(0, 0%, 60%);
                }
                :host(i-body[data-ui="custom"]) input:focus, 
                :host(i-body[data-ui="custom"]) .col2:focus-within,
                :host(i-body[data-ui="custom"]) select:focus {
                    --shadow-blur: 12px;
                    --shadow-color: hsla(50, 100%, 50%, 0.5);
                }
                `,
                // props: {
                //     size: 'var(--size14)',
                //     labelSize: 'var(--size12)',
                //     labelColor: 'var(--color-blue)',
                //     labelFocusColor: 'var(--color-purple)',
                //     inputColor: 'var(--color-black)',
                //     inputBorderColor: 'var(--color-blue)',
                //     inputFocusColor: 'var(--color-purple)',
                //     borderColor: 'var(--color-medium-purple)',
                // }
            }
        }
    }
}

const runPlanOpt = (protocol) => {
    return {
        name: 'run plan',
        header: 'Your small step is our big step',
        body: runPlan('plan1', protocol),
        ui: 'default'
    }
}

module.exports = { newAccountOpt, runPlanOpt }
},{"./CreateAccount":2,"./RunPlan":3}],5:[function(require,module,exports){
var trailingNewlineRegex = /\n[\s]+$/
var leadingNewlineRegex = /^\n[\s]+/
var trailingSpaceRegex = /[\s]+$/
var leadingSpaceRegex = /^[\s]+/
var multiSpaceRegex = /[\n\s]+/g

var TEXT_TAGS = [
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'data', 'dfn', 'em', 'i',
  'kbd', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'amp', 'small', 'span',
  'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr'
]

var VERBATIM_TAGS = [
  'code', 'pre', 'textarea'
]

module.exports = function appendChild (el, childs) {
  if (!Array.isArray(childs)) return

  var nodeName = el.nodeName.toLowerCase()

  var hadText = false
  var value, leader

  for (var i = 0, len = childs.length; i < len; i++) {
    var node = childs[i]
    if (Array.isArray(node)) {
      appendChild(el, node)
      continue
    }

    if (typeof node === 'number' ||
      typeof node === 'boolean' ||
      typeof node === 'function' ||
      node instanceof Date ||
      node instanceof RegExp) {
      node = node.toString()
    }

    var lastChild = el.childNodes[el.childNodes.length - 1]

    // Iterate over text nodes
    if (typeof node === 'string') {
      hadText = true

      // If we already had text, append to the existing text
      if (lastChild && lastChild.nodeName === '#text') {
        lastChild.nodeValue += node

      // We didn't have a text node yet, create one
      } else {
        node = document.createTextNode(node)
        el.appendChild(node)
        lastChild = node
      }

      // If this is the last of the child nodes, make sure we close it out
      // right
      if (i === len - 1) {
        hadText = false
        // Trim the child text nodes if the current node isn't a
        // node where whitespace matters.
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          // The very first node in the list should not have leading
          // whitespace. Sibling text nodes should have whitespace if there
          // was any.
          leader = i === 0 ? '' : ' '
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, leader)
            .replace(leadingSpaceRegex, ' ')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

    // Iterate over DOM nodes
    } else if (node && node.nodeType) {
      // If the last node was a text node, make sure it is properly closed out
      if (hadText) {
        hadText = false

        // Trim the child text nodes if the current node isn't a
        // text node or a code node
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')

          // Remove empty text nodes, append otherwise
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        // Trim the child nodes if the current node is not a node
        // where all whitespace must be preserved
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingSpaceRegex, ' ')
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

      // Store the last nodename
      var _nodeName = node.nodeName
      if (_nodeName) nodeName = _nodeName.toLowerCase()

      // Append the node to the DOM
      el.appendChild(node)
    }
  }
}

},{}],6:[function(require,module,exports){
var hyperx = require('hyperx')
var appendChild = require('./appendChild')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = [
  'autofocus', 'checked', 'defaultchecked', 'disabled', 'formnovalidate',
  'indeterminate', 'readonly', 'required', 'selected', 'willvalidate'
]

var COMMENT_TAG = '!--'

var SVG_TAGS = [
  'svg', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix',
  'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood',
  'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage',
  'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight',
  'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter',
  'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src',
  'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image',
  'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph',
  'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS.indexOf(key) !== -1) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  appendChild(el, children)
  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"./appendChild":5,"hyperx":28}],7:[function(require,module,exports){
(function (global){(function (){
'use strict';

var csjs = require('csjs');
var insertCss = require('insert-css');

function csjsInserter() {
  var args = Array.prototype.slice.call(arguments);
  var result = csjs.apply(null, args);
  if (global.document) {
    insertCss(csjs.getCss(result));
  }
  return result;
}

module.exports = csjsInserter;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"csjs":12,"insert-css":29}],8:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":11}],9:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":7,"./get-css":8}],10:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":16}],11:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":20}],12:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs();
module.exports.csjs = csjs;
module.exports.noScope = csjs({ noscope: true });
module.exports.getCss = require('./get-css');

},{"./csjs":10,"./get-css":11}],13:[function(require,module,exports){
'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};

},{}],14:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

module.exports = function createExports(classes, keyframes, compositions) {
  var keyframesObj = Object.keys(keyframes).reduce(function(acc, key) {
    var val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  var exports = Object.keys(classes).reduce(function(acc, key) {
    var val = classes[key];
    var composition = compositions[key];
    var extended = composition ? getClassChain(composition) : [];
    var allClasses = [key].concat(extended);
    var unscoped = allClasses.map(function(name) {
      return classes[name] ? classes[name] : name;
    });
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
}

function getClassChain(obj) {
  var visited = {}, acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(function(key) {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}

},{"./composition":15}],15:[function(require,module,exports){
'use strict';

module.exports = {
  makeComposition: makeComposition,
  isComposition: isComposition,
  ignoreComposition: ignoreComposition
};

/**
 * Returns an immutable composition object containing the given class names
 * @param  {array} classNames - The input array of class names
 * @return {Composition}      - An immutable object that holds multiple
 *                              representations of the class composition
 */
function makeComposition(classNames, unscoped, isAnimation) {
  var classString = classNames.join(' ');
  return Object.create(Composition.prototype, {
    classNames: { // the original array of class names
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    unscoped: { // the original array of class names
      value: Object.freeze(unscoped),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: { // space-separated class string for use in HTML
      value: classString,
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: { // comma-separated, period-prefixed string for use in CSS
      value: classNames.map(function(name) {
        return isAnimation ? name : '.' + name;
      }).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    toString: { // toString() method, returns class string for use in HTML
      value: function() {
        return classString;
      },
      configurable: false,
      writeable: false,
      enumerable: false
    }
  });
}

/**
 * Returns whether the input value is a Composition
 * @param value      - value to check
 * @return {boolean} - whether value is a Composition or not
 */
function isComposition(value) {
  return value instanceof Composition;
}

function ignoreComposition(values) {
  return values.reduce(function(acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function(name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});
}

/**
 * Private constructor for use in `instanceof` checks
 */
function Composition() {}

},{}],16:[function(require,module,exports){
'use strict';

var extractExtends = require('./css-extract-extends');
var composition = require('./composition');
var isComposition = composition.isComposition;
var ignoreComposition = composition.ignoreComposition;
var buildExports = require('./build-exports');
var scopify = require('./scopeify');
var cssKey = require('./css-key');
var extractExports = require('./extract-exports');

module.exports = function csjsTemplate(opts) {
  opts = (typeof opts === 'undefined') ? {} : opts;
  var noscope = (typeof opts.noscope === 'undefined') ? false : opts.noscope;

  return function csjsHandler(strings, values) {
    // Fast path to prevent arguments deopt
    var values = Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
      values[i - 1] = arguments[i];
    }
    var css = joiner(strings, values.map(selectorize));
    var ignores = ignoreComposition(values);

    var scope = noscope ? extractExports(css) : scopify(css, ignores);
    var extracted = extractExtends(scope.css);
    var localClasses = without(scope.classes, ignores);
    var localKeyframes = without(scope.keyframes, ignores);
    var compositions = extracted.compositions;

    var exports = buildExports(localClasses, localKeyframes, compositions);

    return Object.defineProperty(exports, cssKey, {
      enumerable: false,
      configurable: false,
      writeable: false,
      value: extracted.css
    });
  }
}

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function(str, i) {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

},{"./build-exports":14,"./composition":15,"./css-extract-extends":17,"./css-key":18,"./extract-exports":19,"./scopeify":25}],17:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;

module.exports = function extractExtends(css) {
  var found, matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[3];
    var extended = match[4];

    // remove from output css
    var index = match.index + match[1].length + match[2].length;
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + " " + acc.css.slice(index + len + 1);

    var extendedClasses = splitter(extended);

    extendedClasses.forEach(function(className) {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css: css,
    compositions: {}
  });

};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}

},{"./composition":15}],18:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],19:[function(require,module,exports){
'use strict';

var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = extractExports;

function extractExports(css) {
  return {
    css: css,
    keyframes: getExport(css, keyframesRegex),
    classes: getExport(css, classRegex)
  };
}

function getExport(css, regex) {
  var prop = {};
  var match;
  while((match = regex.exec(css)) !== null) {
    var name = match[2];
    prop[name] = name;
  }
  return prop;
}

},{"./regex":22}],20:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":18}],21:[function(require,module,exports){
'use strict';

/**
 * djb2 string hash implementation based on string-hash module:
 * https://github.com/darkskyapp/string-hash
 */

module.exports = function hashStr(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0;
};

},{}],22:[function(require,module,exports){
'use strict';

var findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source;
var findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;
var ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

var classRegex = new RegExp(findClasses + ignoreComments, 'g');
var keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');

module.exports = {
  classRegex: classRegex,
  keyframesRegex: keyframesRegex,
  ignoreComments: ignoreComments,
};

},{}],23:[function(require,module,exports){
var ignoreComments = require('./regex').ignoreComments;

module.exports = replaceAnimations;

function replaceAnimations(result) {
  var animations = Object.keys(result.keyframes).reduce(function(acc, key) {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  var unscoped = Object.keys(animations);

  if (unscoped.length) {
    var regexStr = '((?:animation|animation-name)\\s*:[^};]*)('
      + unscoped.join('|') + ')([;\\s])' + ignoreComments;
    var regex = new RegExp(regexStr, 'g');

    var replaced = result.css.replace(regex, function(match, preamble, name, ending) {
      return preamble + animations[name] + ending;
    });

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    }
  }

  return result;
}

},{"./regex":22}],24:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":13,"./hash-string":21}],25:[function(require,module,exports){
'use strict';

var fileScoper = require('./scoped-name');
var replaceAnimations = require('./replace-animations');
var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = scopify;

function scopify(css, ignores) {
  var makeScopedName = fileScoper(css);
  var replacers = {
    classes: classRegex,
    keyframes: keyframesRegex
  };

  function scopeCss(result, key) {
    var replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      var scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  var result = Object.keys(replacers).reduce(scopeCss, {
    css: css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}

},{"./regex":22,"./replace-animations":23,"./scoped-name":24}],26:[function(require,module,exports){
module.exports = svg

function svg(opts) {
    var { css = null, path }  = opts
    
    const el = document.createElement('div')
    
    async function load(done) {
        const res = await fetch(path)
        const parse = document.createElement('div')

        if (res.status == 200) {
            let graphic = await res.text()
            parse.innerHTML = graphic
            return done(null, parse.children[0])
        }
        throw new Error(res.status)
    }

    load((err, svg) => {
        if (err) console.error(err)
        if (css) el.className = css
        el.append(svg)
    })
    
    return el
}   
},{}],27:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],28:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else if (xstate === COMMENT && opts.comments) {
          reg += String(arg)
        } else if (xstate !== COMMENT) {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      if (opts.createFragment) return opts.createFragment(tree[2])
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else if (x === null || x === undefined) return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":27}],29:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],30:[function(require,module,exports){
const bel = require('bel')
const iheader = require('i-header')
const ibody = require('i-body')
const nocontent = require('i-nocontent')
const styleSheet = require('supportCSSStyleSheet')
const icon = require('icon')

// const myElement = require('test')
module.exports = component

function component({name = 'modal', flow, header, body = nocontent(), ui = 'default', theme }, protocol) {
    const widget = 'ui-modal'
    const sender = protocol( get )
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var { color, bgColor, borderWidth, borderStyle, borderColor, padding } = theme.props
    }
    // const send = protocol( get )
    function layout(style) {
        const modal = document.createElement('i-modal')
        const root = modal.attachShadow({mode: 'closed'})
        modal.dataset.ui = ui
        const closeIcon = new icon({name: 'cross'})
        const close = bel`<button role="button" data-ui="close" aria-label="close modal" aria-controls="close modal" onclick="${() => handleClose(modal)}">${closeIcon}</button>`
        const el = bel`
        <div role="dialog" class="i-modal" aria-label="${ui}">
            ${ui === 'help-modal' ? close : null}
            ${iheader({label: 'create new account', content: header, ui, theme: theme ? theme.header : void 0 })}
            ${ibody({label: 'modal body', content: body === '' ? nocontent() : body, ui, theme: theme ? theme.body : void 0 })}
        </div>`
        styleSheet(root, style)
        root.append(el)
        return modal
    }

    function handleClose (modal) {
        modal.remove()
        return sender({flow: flow ? `${flow}/${widget}/${ui}` : `${widget}/${ui}`, from: name, type: 'closed'})
    }

    function get(m) {
        console.log(m)
    }

    // @TODO: fix svg unvisible on iphone 06/11/2021
    const style = `
    :host(i-modal) {
        position: relative;
        display: grid;
    }
    :host(i-modal) button {
        cursor: pointer;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    :host(i-modal) button > .icon {
        width: 8px;
        height: 8px;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    :host(i-modal) svg {
        width: 100%;
        height: auto;
    }
    :host(i-modal) .i-modal {
        --modal-color: ${color ? color : 'var(--primary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-width: ${borderWidth ? borderWidth : '0px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-black)'};
        --modal-border: var(--modal-border-width) var(--modal-border-style) var(--modal-border-color);
        --modal-padding: ${padding ? padding : '0'};
        padding: var(--modal-padding);
        color: var(--modal-color);
        background-color: var(--modal-bgColor);
        border: var(--modal-border);
    }
    :host(i-modal) .i-modal:focus, :host(i-modal) .i-modal:focus-within {
        --outline-border-width: 4px; 
        --outline-style: ridge;
        --outline-color: var(--color-greyE2);
        --outline: var(--outline-border-width) var(--outline-style) var(--outline-color);
        outline: var(--outline);
    }
    :host(i-modal[data-ui="default"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primiary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-width: ${borderWidth ? borderWidth : '1px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-black)'};
        --modal-border: var(--modal-border-width) var(--modal-border-style) var(--modal-border-color);
        --modal-padding: ${padding ? padding : '30px 34px'};
    }
    :host(i-modal[data-ui="step-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primiary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-padding: ${padding ? padding : '0'};
    }
    :host(i-modal[data-ui="action-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primiary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-top-width: ${borderWidth ? borderWidth : '8px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-black)'};
        --modal-border-top: var(--modal-border-top-width) var(--modal-border-style) var(--modal-border-color);
        --modal-padding: ${padding ? padding : '25px 50px'};
        border-top: var(--modal-border-top);
    }
    :host(i-modal[data-ui="action-modal"]) .i-modal:focus, :host(i-modal[data-ui="action-modal"]) .i-modal:focus-within {
        box-shadow: 0 -6px 10px hsla(0, 0%, 0%, .5);
        outline: none;
    }
    :host(i-modal[data-ui="help-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primiary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-greyE2)'};
        --modal-border-width: ${borderWidth ? borderWidth : '1px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border: var(--modal-border-width) var(--modal-border-style) var(--modal-border-color);
        --modal-padding: ${padding ? padding : '15px 20px'};
        box-shadow: 15px 20px 30px hsla(0, 0%, 0%, .3);
        outline: none;
    }
    :host(i-modal[data-ui="help-modal"]) .i-modal:focus, :host(i-modal[data-ui="help-modal"]) .i-modal:focus-within {
        outline: none;
    }
    :host(i-modal) button[data-ui="close"] {
        position: absolute;
        right: -7px;
        top: -7px;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        background-color: var(--color-white);
        border: none;
        box-shadow: 0px 3px 6px hsla(0, 0%, 0%, 0.16);
    }
    
    ${customStyle}
    `
    return layout(style)
}
},{"bel":6,"i-body":31,"i-header":32,"i-nocontent":33,"icon":34,"supportCSSStyleSheet":35}],31:[function(require,module,exports){
const styleSheet = require('./supportCSSStyleSheet')
module.exports = body

function body ({label, content, ui, theme}) {
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {size, color, bgColor, borderWidth, borderStyle, borderColor, labelSize, labelColor, labelFocusColor, inputColor, inputFocusColor, inputBgColor, inputBorderWidth, inputBorderStyle, inputBorderColor, inputPadding, badgeSize, badgeColor, badgeBgColor, badgeWeight, shadowBlur, shadowColor, limitSize, limitColor} = theme.props
    }
    // UI view
    function layout (style) {
        const e = document.createElement('i-body')
        const root = e.attachShadow({mode: 'closed'})
        e.dataset.ui = ui
        styleSheet(root, style)
        root.append(content)
        return e
    }

    const style = `
    :host(i-body) {
        --modal-body-color: ${color ? color : 'var(--color-grey88)'};
        --modal-body-bgColor: ${bgColor ? bgColor : 'transparent'};
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr;
        background-color: var(--modal-body-bgColor);
        align-items: center;
        color: var(--modal-body-color);
    }
    :host(i-body) button {
        cursor: pointer;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    :host(i-body) button > .icon {
        width: 24px;
        height: 24px;
    }
    :host(i-body) svg {
        width: 100%;
        height: auto;
    }
    :host(i-body) .form-field {
        display: grid;
        gap: 20px;
    }
    :host(i-body) .row {
        --color: ${color ? color : 'var(--primary-color)'};
        --size: ${size ? size : 'var(--size14)'};
        display: grid;
        color: var(--color);
        font-size: var(--size);
        word-break: break-all;
    }
    :host(i-body) .row:focus-within label {
        --label-focus: ${labelFocusColor ? labelFocusColor : 'var(--color-black)'};
        color: var(--label-focus);
    }
    :host(i-body) label {
        --label-color: ${labelColor ? labelColor : 'var(--color-grey66)'};
        --label-size: ${ labelSize ? labelSize : 'var(--size14)'};
        grid-row-start: 1;
        align-self: center;
        color: var(--label-color);
        font-size: var(--label-size);
        line-height: 1.5;
        transition: color .25s linear;
    }
    :host(i-body) input {
        --input-color: ${inputColor ? inputColor : 'var(--color-black)'};
        --input-size: ${size ? size : 'var(--size14)'};
        --input-border-width: ${inputBorderWidth ? inputBorderWidth : '1px'};
        --input-border-style: ${inputBorderStyle ? inputBorderStyle : 'solid'};
        --input-border-color: ${inputBorderColor ? inputBorderColor : 'var(--color-greyCB)'};
        --input-border: var(--input-border-width) var(--input-border-color) var(--input-border-style);
        --input-radius: var(--primary-input-radius);
        --input-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        --input-padding: ${inputPadding ? inputPadding : '6px'};
        grid-column-start: 2;
        color: var(--input-color);
        font-size: var(--input-size);
        line-height: inherit;
        border: var(--input-border);
        border-radius: var(--input-radius);
        padding: var(--input-padding);
        background-color: var(--input-bgColor);
        transition: border .6s, background-color .6s, box-sahdow .6s linear;
    }
    :host(i-body) .col2.address {
        grid-row-start: 2;
        grid-column-end: 3;
        grid-template-columns: auto;
    }
    :host(i-body) .address {
        word-break: break-all;
    }
    :host(i-body) .limit {
        --limit-size: ${limitSize ? limitSize : 'var(--size12)'};
        --limit-color: ${limitColor ? limitColor : 'var(--color-grey88)'};
        align-self: center;
        font-size: var(--limit-size);
        color: var(--limit-color);
    }
    :host(i-body) input[name="address"]:disabled {
        color: var(--color-black);
        border: none;
        background-color: transparent;
    }
    :host(i-body) input:focus {
        --input-focus: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : 'hsla(0, 0%, 0%, .5)'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) var(--shadow-color);
        -webkit-appearance: none; 
        appearance: none;
        border-color: var(--input-focus);
        box-shadow: var(--shadow); 
        outline: none;
    }
    :host(i-body) .col2 {
        --col-border-width: ${inputBorderWidth ? inputBorderWidth : '1px'};
        --col-border-style: ${inputBorderStyle ? inputBorderStyle : 'solid'};
        --col-border-color: ${inputBorderColor ? inputBorderColor : 'var(--color-greyCB)'};
        --col-border: var(--col-border-width) var(--col-border-style) var(--col-border-color);
        --col-radius: var(--primary-input-radius);
        --col-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr) 50px;
        border: var(--col-border);
        border-radius: var(--col-radius);
        background-color: var(--col-bgColor);
    }
    :host(i-body) .col2:focus-within {
        --focus-color: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : 'hsla(0, 0%, 0%, .5)'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) var(--shadow-color);
        border-color: var(--focus-color);
        box-shadow: var(--shadow);
    }
    :host(i-body) .col2 input {
        --input-radius: var(--primary-input-radius);
        border: none;
        grid-column-start: span 2;
        border-radius: var(--input-radius);
        background-color: transparent;
        box-shadow: none;
        padding: 4px;
    }
    :host(i-body) .col2 button {
        grid-column-start: 3;
        grid-column-end: 4;
        padding: 0;
    }
    :host(i-body) div[data-step="create-account"] > .row {
        gap: 10px;
        grid-template-rows: auto;
        grid-template-columns: 120px auto minmax(auto, 80px);
    }
    :host(i-body) select {
        --select-size: ${ size ? size : 'var(--size14)'};
        --select-border-width: ${inputBorderWidth ? inputBorderWidth : '1px'};
        --select-border-style: ${inputBorderStyle ? inputBorderStyle : 'solid'};
        --select-border-color: ${inputBorderColor ? inputBorderColor : 'var(--color-greyCB)'};
        --select-border: var(--select-border-width) var(--select-border-style) var(--select-border-color);
        --select-radius: var(--primary-input-radius);
        --select-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        --select-padding: ${inputPadding ? inputPadding : '6px'};
        width: 100%;
        font-size: var(--select-size);
        border: var(--select-border);
        border-radius: var(--select-radius);
        padding: var(--select-padding);
        -webkit-appearance: none; 
        appearance: none;
        background-color: var(--select-bgColor);
        transition: border .6s, background-color .6s, box-sahdow .6s linear;
    }
    :host(i-body) select:focus {
        --focus-color: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : 'hsla(0, 0%, 0%, .5)'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) var(--shadow-color);
        border-color: var(--focus-color);
        box-shadow: var(--shadow);
        outline: none;
    }
    :host(i-body[data-ui="default"]) {
        --modal-body-color: ${color ? color : 'var(--primary-color)'};
    }
    :host(i-body[data-ui="default"]) .row {
        justify-content: center;
        line-height: 22px;
    }
    :host(i-body[data-ui="step-modal"]) {
        --modal-body-border-width: ${borderWidth ? borderWidth : '1px'};
        --modal-body-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-body-border-color: ${borderColor ? borderColor : 'var(--color-greyCB)'};
        --modal-body-border: var(--modal-body-border-width) var(--modal-body-border-style) var(--modal-body-border-color);
        --modal-body-padding: 30px 10px 30px 30px;
        border: var(--modal-body-border);
        padding: var(--modal-body-padding);
    }
    :host(i-body[data-ui="action-modal"]) {}
    :host(i-body[data-ui="help-modal"]) {
        --modal-body-size: ${size ? size : 'var(--size14)'};
        --modal-body-color: ${color ? color : 'var(--color-grey33)'};
        font-size: var(--modal-body-size);
        color: var(--modal-body-color);
    }
    :host(i-body[data-ui="help-modal"]) .badge {
        --badgeSize: ${badgeSize ? badgeSize : 'var(--size14)'};
        --badgeWeight: ${badgeWeight ? badgeWeight : 'var(--weight800)'};
        --badgeColor: ${badgeColor ? badgeColor : 'var(--color-white)'};
        --badgeBgColor: ${badgeBgColor ? badgeBgColor : 'var(--primary-color)'};
        font-size: var(--badgeSize);
        font-weight: var(--badgeWeight);
        color: var(--badgeColor);
        background-color: var(--badgeColor);
    }
    :host(i-body) .col2 button {
        background-color: transparent;
        border: none;
    }
    :host(i-body) .col2 button .down {
        transform: rotate(-90deg);
    }
    :host(i-body) .actions {
        display: flex;
        justify-content: center;
    }

    @media (max-width: 640px) {
        :host(i-body) .form-field {
            gap: 10px;
        }
        :host(i-body) div[data-step="create-account"] > .row {
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
        }
        :host(i-body) div[data-step="create-account"] .limit {
            grid-row-start: 3;
            justify-self: right;
        }
        :host(i-body) label {
            grid-row-start: 1;
        }
        :host(i-body) input {
            grid-row-start: 2;
            grid-column-start: 1;
        }
        :host(i-body) select {
            grid-row-start: 2;
            grid-column-start: span 2;
        }
        :host(i-body) .col2 {
            grid-row-start: 2;
        }
        :host(i-body) .col2.address {
            grid-row-start: 3;
            grid-column-start: span 2;
        }
        :host(i-body) .col2 input {
            grid-row-start: 1;
        }
    }
    ${customStyle}
    `
    return layout(style)
}
},{"./supportCSSStyleSheet":35}],32:[function(require,module,exports){
const bel = require('bel')
const styleSheet = require('./supportCSSStyleSheet')
module.exports = header

function header({label, content, ui, theme}) {
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) { 
        var {size, color, bgColor, padding, marginBottom} = theme.props
    }
    // UI view
    function layout(style) {
        // create custom html tag element
        const e = document.createElement('i-header')
        const root = e.attachShadow({mode: 'closed'})
        const h1 = bel`<h1 aria-label="${label}">${content}</h1>`
        e.dataset.ui = ui
        styleSheet(root, style)
        root.append(h1)
        return e 
    }
    
    const style = `
    :host(i-header) {
        display: grid;
        justify-content: center;
        --modal-header-bgColor: ${bgColor ? bgColor : 'transparent'};
        --modal-header-padding: ${padding ? padding : '0'};
        background-color: var(--modal-header-bgColor);
        padding: var(--modal-header-padding);
    }
    :host(i-header) h1 {
        --modal-header-color: ${color ? color : 'var(--primary-color)'};
        --modal-header-size: ${size ? size : 'var(--size22)'};
        color: var(--modal-header-color);
        font-size: var(--modal-header-size);
        margin: 0;
    }
    :host(i-header[data-ui="default"]) {
    }
    :host(i-header[data-ui="step-modal"]) {
        --modal-header-bgColor: ${bgColor ? bgColor : 'var(--color-greyF2)'};
        --modal-header-padding: ${padding ? padding : '20px 0'};
    }
    :host(i-header[data-ui="action-modal"]) {
        margin-bottom: 30px;
    }
    :host(i-header[data-ui="help-modal"]) {
        margin-bottom: 12px;
    }
    :host(i-header[data-ui="help-modal"]) h1 {
        --modal-header-size: ${size ? size : 'var(--size16)'};
    }
    ${customStyle}
    `
    return layout(style)
}


},{"./supportCSSStyleSheet":35,"bel":6}],33:[function(require,module,exports){
module.exports = nocontent

function nocontent () {
    const e = document.createElement('i-nocontent')
    const shadowRoot = e.attachShadow({mode: "closed"})
    const content = '<p>Please add content</p>'

    const support = (() => {
        try {
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(style)
            shadowRoot.adoptedStyleSheets = [sheet]
            shadowRoot.innerHTML = content
            return true 
        } catch (error) { 
            const injectStyle = `<style>${style}</style>`
            shadowRoot.innerHTML = `${injectStyle}${content}`
            return false
        }
    })()
    return e
}

const style = `
:host(i-nocontent) {
    text-align: center;
}
`
},{}],34:[function(require,module,exports){
const svg = require('datdot-ui-graphic')
function icon ({classname, name}) {
    const el = svg({css: classname ? `icon ${classname}` : 'icon', path: `./svg/${name}.svg`})
    return el
}
module.exports = icon

},{"datdot-ui-graphic":26}],35:[function(require,module,exports){
module.exports = supportCSSStyleSheet
function supportCSSStyleSheet (root, style) {
    return (() => {
        try {
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(style)
            root.adoptedStyleSheets = [sheet]
            return true 
        } catch (error) { 
            const injectStyle = `<style>${style}</style>`
            root.innerHTML = `${injectStyle}`
            return false
        }
    })()
}
},{}]},{},[1]);
