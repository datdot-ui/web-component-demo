(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__filename){(function (){
const modal = require('..')
const bel = require('bel')
const csjs = require('csjs-inject')
const logs = require('../src/node_modules/logs')
const actions = require('actions')
const file = require('path').basename(__filename)
const { newAccountOpt, planPlayOpt, transferOpt, helpOpt } = require('options')

function demoApp() {
    // save protocol callbacks
    const recipients = []
    // logs must be initialized first before components
    const logList = logs(protocol('logs'))
    // modal templates
    const createNewAccount = modal(newAccountOpt( createAccountProtocol('create-account') ), createAccountProtocol('create-new-account'))
    const planPlay = modal(planPlayOpt( planPlayProtocol('plan-play') ), planPlayProtocol('plan-play') )
    const transfer = modal(transferOpt( transferProtocol('transfer') ), transferProtocol('transfer'))
    const help = modal(helpOpt( helpProtocol('help') ), helpProtocol('help'))
    const demo = bel`
    <div class="demo">
        ${appendElement({title: 'Default', item: planPlay})}
        ${appendElement({title: 'Step', item: createNewAccount})}
        ${appendElement({title: 'Action', item: transfer})}
        ${appendElement({title: 'Help', item: help})}
    </div>`
    const container = bel`
    <div class="${css.container}">
        ${actions( protocol('actions') )}
        ${demo}
    </div>
    `

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${container}${logList}
    </div>`

    return app

    function appendElement({title, item}) {
        const el = bel`
        <section class="${title.toLowerCase()}">
            <h1>${title} modal</h1>
            ${item}
        </section>`
        return el
    }
    function helpProtocol (name) {
        return protocol(name)
    }

    function planPlayProtocol (name) {
        return protocol(name)
    }

    function createAccountProtocol (name) {
        return protocol(name)
    }

    function transferProtocol (name) {
        return protocol(name)
    }

    function handleActions(name, body) {
        const items = [...demo.children]
        items.map( item => {
            item.ariaHidden = true
            if (item.classList.contains(body) ) item.ariaHidden = false
            if (body === 'all') item.ariaHidden = false
        })
    }

    function handleDebugMode (app, state) {
        if (state === 'true') {
            app.dataset.state = 'debug'
            recipients['logs']({from: 'debug', flow: 'demo', type: 'opened', fn: 'handleDebugMode', file, line: 75})
        } else {
            app.dataset.state = 'view'
            recipients['logs']({from: 'debug', flow: 'demo', type: 'closed', fn: 'handleDebugMode', file, line: 78})
        }
        
    }

    function handleClickProtocol (msg) {
        const {from, flow, state, body, file, line} = msg
        if (flow === 'actions' && from === 'debug') return handleDebugMode(app, state)
        if (flow === 'actions') return handleActions(from, body)
    }
    
    function protocol (name) {
        return sender => {
            recipients[name] = sender
            return (msg) => {
                const {page, from, flow, type, file, line} = msg
                console.log( `type: ${type}, file: ${file}, line: ${line}`);
                recipients['logs'](msg)
                if (type === 'click') return handleClickProtocol(msg)
            }
        }
    }
}

const css = csjs`
:root {
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-orange: 35, 100%, 58%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green-pigment: 136, 81%, 34%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --color-green: 136, 81%, 34%;
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
.wrap {
    display: grid;
}
[data-state="view"] i-log {
    visibility: hidden;
}
[data-state="debug"] {
    grid-template-rows: auto;
    grid-template-columns: 60vw auto;
}
.container {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 90%;
    justify-content: center;
    padding: 20px 0 80px 0;
    background-color: var(--color-white);
}
[aria-hidden="true"] {
    display: none;
}
@media (max-width: 960px) {
    [data-state="debug"] {
        grid-template-rows: auto;
        grid-template-columns: auto;
        padding-bottom: 28vh;
    }
}
`

document.body.append( demoApp() )
}).call(this)}).call(this,"/demo/demo.js")
},{"..":35,"../src/node_modules/logs":40,"actions":6,"bel":9,"csjs-inject":12,"options":7,"path":33}],2:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const icon = require('../../src/node_modules/icon')
const file = require('path').basename(__filename)

module.exports = createAccount

function createAccount ({page, flow = 'layout', name = 'create-new-account'}, protocol) {
    const sender = protocol( get )
    sender({page, from: name , flow, type: 'ready', fn: 'createAccount', file, line: 9 })
    let address = 'hyper://'
    const input = bel`<input type="text" name="custom address" arial-label="Custom address" aria-required="true" value="${address}">`
    const customAddress = bel`<div class="col3 address">${input}</div>`
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
            <div class="col3">
                <input role="input" type="password" name="password" aria-label="Password" aria-required="true">
                ${showButton1}
            </div>
            <span class="limit">min 8 chars</span>
        </div>
        <div class="row">
            <label for="confirm password">Confirm password</label>
            <div class="col3">
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
        sender({from: target, flow: 'create-account/button', type: 'click', body: state, fn: 'toggleIcon', file, line: 74})
    }

    function get (msg) {
        console.log(msg);
    }
}

}).call(this)}).call(this,"/demo/node_modules/CreateAccount.js")
},{"../../src/node_modules/icon":39,"bel":9,"path":33}],3:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const icon = require('../../src/node_modules/icon')
const file = require('path').basename(__filename)

module.exports = help

function help ({page, flow = 'layout', name = 'plan-summary-list'}, protocol) {
    const sender = protocol (get)
    sender({page, from: name, flow, type: 'ready', fn: 'help', file, line: 9 })
    const arrowRightIcon = new icon({name: 'arrow-right'})
    const helpElement = bel`
    <section aria-current="Plan summary list">
        <p>In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem, id faucibus odio. Duis eu nisl ut ligula cursus molestie at at dolor. Nulla est justo, pellentesque vel lectus eget, fermentum varius dui. Morbi faucibus quam sed efficitur interdum. Suspendisse in pretium magna. Vivamus nec orci purus.</p>
        <footer>
            <span>1/1</span>
            <button role="button" class="btn" data-step="1" aria-label="Step button">Next ${arrowRightIcon}</button>
        </footer>
    </section>` 
    return helpElement

    function get (msg) {
        console.log( msg );
    }
}
}).call(this)}).call(this,"/demo/node_modules/Help.js")
},{"../../src/node_modules/icon":39,"bel":9,"path":33}],4:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const file = require('path').basename(__filename)

module.exports = planPlay

function planPlay ({name = null, flow = 'layout', page}, protocol) {
    const sender = protocol (get)
    sender({page, from: `plan-play/${name}`, flow, type: 'ready', fn: 'planPlay', file, line: 9 })
    const cancelButton = bel`<button class="btn" data-action="cancel" aria-label="Cancel" onclick="${() => handleCancel()}">Cancel</button>`
    const confirmButton = bel`<button class="btn" data-action="confirm" aria-label="Confirm" onclick="${() => handleConfirm()}">Confirm</button>`
    const el = bel`
    <section class="row" data-action="plan-play" aria-label="Plan play"> 
        <p>
            Do you determine to be a sponsor for <strong>${name}</strong>?<br/>
            This action will be continuous paying via your schedule.
        </p>
        <div class="actions" role="action">
            ${cancelButton}${confirmButton}
        </div>
    </section>`

    return el

    function handleCancel () {
        sender({from: `${name}/cancel`, flow: 'plan-play/button', type: 'click', fn: 'handleCancel', file, line: 25})
    }

    function handleConfirm () {
        sender({from: `${name}/confirm`, flow: 'plan-play/button', type: 'click', fn: 'handleConfirm', file, line: 29})
    }

    function get (msg) {
        console.log( msg );
    }
}
}).call(this)}).call(this,"/demo/node_modules/PlanPlay.js")
},{"bel":9,"path":33}],5:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const file = require('path').basename(__filename)

module.exports = transfer

function transfer ({account, page}, protocol) {
    const {name, address} = account
    const sender = protocol( get )
    sender({page, from: 'transfer', flow: 'layout', type: 'ready', fn: 'transfer', file, line: 9 })
    const accountName = name
    const transferTo = bel`<input role="input" type="text" aria-label="Transfer to account address" aria-require="true" value="12XV6KZCEwF9D1rsM8aCu21UP3z9t95ZCg">`
    const transferPrice = bel`<input role="input" type="number" aria-label="Price" aria-require="true" value="0">`
    const fee = 0.2
    const cancelButton = bel`<button class="btn" data-action="cancel" aria-label="Cancel" onclick="${() => handleCancel(cancelButton.dataset.action)}">Cancel</button>`
    const transferButton = bel`<button class="btn" data-action="transfer" aria-label="Transfer" onclick="${() => handleTransfer(transferButton.dataset.action)}">Transfer</button>`
    const transferElement = bel`
    <div class="form-field" data-action="transfer" aria-label="Transfer">
        <div class="row">
            <label for="from">From</label>
            <div class="info" aria-label="account name">
                <img role="img" class="avatar" aria-label="account avatar" src="data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PG1ldGFkYXRhPjxyZGY6UkRGPjxjYzpXb3JrPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGU+Qm90dHRzPC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPlBhYmxvIFN0YW5sZXk8L2RjOnRpdGxlPjwvY2M6QWdlbnQ+PC9kYzpjcmVhdG9yPjxkYzpzb3VyY2U+aHR0cHM6Ly9ib3R0dHMuY29tLzwvZGM6c291cmNlPjxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9ib3R0dHMuY29tLyIvPjxkYzpjb250cmlidXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPkZsb3JpYW4gS8O2cm5lcjwvZGM6dGl0bGU+PC9jYzpBZ2VudD48L2RjOmNvbnRyaWJ1dG9yPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48cmVjdCBmaWxsPSJ0cmFuc3BhcmVudCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHg9IjAiIHk9IjAiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCA2NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMgMTFIMTFWMzFIMTIuNEMxMC4xNTk4IDMxIDkuMDM5NjkgMzEgOC4xODQwNCAzMS40MzZDNy40MzEzOSAzMS44MTk1IDYuODE5NDcgMzIuNDMxNCA2LjQzNTk3IDMzLjE4NEM2IDM0LjAzOTcgNiAzNS4xNTk4IDYgMzcuNFYzOC42QzYgNDAuODQwMiA2IDQxLjk2MDMgNi40MzU5NyA0Mi44MTZDNi44MTk0NyA0My41Njg2IDcuNDMxMzkgNDQuMTgwNSA4LjE4NDA0IDQ0LjU2NEM5LjAzOTY5IDQ1IDEwLjE1OTggNDUgMTIuNCA0NUgxOFY1NS42QzE4IDU3Ljg0MDIgMTggNTguOTYwMyAxOC40MzYgNTkuODE2QzE4LjgxOTUgNjAuNTY4NiAxOS40MzE0IDYxLjE4MDUgMjAuMTg0IDYxLjU2NEMyMS4wMzk3IDYyIDIyLjE1OTggNjIgMjQuNCA2Mkg0Ny42QzQ5Ljg0MDIgNjIgNTAuOTYwMyA2MiA1MS44MTYgNjEuNTY0QzUyLjU2ODYgNjEuMTgwNSA1My4xODA1IDYwLjU2ODYgNTMuNTY0IDU5LjgxNkM1NCA1OC45NjAzIDU0IDU3Ljg0MDIgNTQgNTUuNlYyMC40QzU0IDE4LjE1OTggNTQgMTcuMDM5NyA1My41NjQgMTYuMTg0QzUzLjE4MDUgMTUuNDMxNCA1Mi41Njg2IDE0LjgxOTUgNTEuODE2IDE0LjQzNkM1MC45NjAzIDE0IDQ5Ljg0MDIgMTQgNDcuNiAxNEgyNC40QzIyLjE1OTggMTQgMjEuMDM5NyAxNCAyMC4xODQgMTQuNDM2QzE5LjQzMTQgMTQuODE5NSAxOC44MTk1IDE1LjQzMTQgMTguNDM2IDE2LjE4NEMxOCAxNy4wMzk3IDE4IDE4LjE1OTggMTggMjAuNFYzMUgxM1YxMVpNMTI2IDM0LjRDMTI2IDMyLjE1OTggMTI2IDMxLjAzOTcgMTI2LjQzNiAzMC4xODRDMTI2LjgxOSAyOS40MzE0IDEyNy40MzEgMjguODE5NSAxMjguMTg0IDI4LjQzNkMxMjkuMDQgMjggMTMwLjE2IDI4IDEzMi40IDI4SDE1NS42QzE1Ny44NCAyOCAxNTguOTYgMjggMTU5LjgxNiAyOC40MzZDMTYwLjU2OSAyOC44MTk1IDE2MS4xODEgMjkuNDMxNCAxNjEuNTY0IDMwLjE4NEMxNjIgMzEuMDM5NyAxNjIgMzIuMTU5OCAxNjIgMzQuNFY0NS42QzE2MiA0Ny44NDAyIDE2MiA0OC45NjAzIDE2MS41NjQgNDkuODE2QzE2MS4xODEgNTAuNTY4NiAxNjAuNTY5IDUxLjE4MDUgMTU5LjgxNiA1MS41NjRDMTU4Ljk2IDUyIDE1Ny44NCA1MiAxNTUuNiA1MkgxMzIuNEMxMzAuMTYgNTIgMTI5LjA0IDUyIDEyOC4xODQgNTEuNTY0QzEyNy40MzEgNTEuMTgwNSAxMjYuODE5IDUwLjU2ODYgMTI2LjQzNiA0OS44MTZDMTI2IDQ4Ljk2MDMgMTI2IDQ3Ljg0MDIgMTI2IDQ1LjZWMzQuNFoiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0ic2lkZXNBbnRlbm5hMDFNYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNiIgeT0iMTEiIHdpZHRoPSIxNTYiIGhlaWdodD0iNTEiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMgMTFIMTFWMzFIMTIuNEMxMC4xNTk4IDMxIDkuMDM5NjkgMzEgOC4xODQwNCAzMS40MzZDNy40MzEzOSAzMS44MTk1IDYuODE5NDcgMzIuNDMxNCA2LjQzNTk3IDMzLjE4NEM2IDM0LjAzOTcgNiAzNS4xNTk4IDYgMzcuNFYzOC42QzYgNDAuODQwMiA2IDQxLjk2MDMgNi40MzU5NyA0Mi44MTZDNi44MTk0NyA0My41Njg2IDcuNDMxMzkgNDQuMTgwNSA4LjE4NDA0IDQ0LjU2NEM5LjAzOTY5IDQ1IDEwLjE1OTggNDUgMTIuNCA0NUgxOFY1NS42QzE4IDU3Ljg0MDIgMTggNTguOTYwMyAxOC40MzYgNTkuODE2QzE4LjgxOTUgNjAuNTY4NiAxOS40MzE0IDYxLjE4MDUgMjAuMTg0IDYxLjU2NEMyMS4wMzk3IDYyIDIyLjE1OTggNjIgMjQuNCA2Mkg0Ny42QzQ5Ljg0MDIgNjIgNTAuOTYwMyA2MiA1MS44MTYgNjEuNTY0QzUyLjU2ODYgNjEuMTgwNSA1My4xODA1IDYwLjU2ODYgNTMuNTY0IDU5LjgxNkM1NCA1OC45NjAzIDU0IDU3Ljg0MDIgNTQgNTUuNlYyMC40QzU0IDE4LjE1OTggNTQgMTcuMDM5NyA1My41NjQgMTYuMTg0QzUzLjE4MDUgMTUuNDMxNCA1Mi41Njg2IDE0LjgxOTUgNTEuODE2IDE0LjQzNkM1MC45NjAzIDE0IDQ5Ljg0MDIgMTQgNDcuNiAxNEgyNC40QzIyLjE1OTggMTQgMjEuMDM5NyAxNCAyMC4xODQgMTQuNDM2QzE5LjQzMTQgMTQuODE5NSAxOC44MTk1IDE1LjQzMTQgMTguNDM2IDE2LjE4NEMxOCAxNy4wMzk3IDE4IDE4LjE1OTggMTggMjAuNFYzMUgxM1YxMVpNMTI2IDM0LjRDMTI2IDMyLjE1OTggMTI2IDMxLjAzOTcgMTI2LjQzNiAzMC4xODRDMTI2LjgxOSAyOS40MzE0IDEyNy40MzEgMjguODE5NSAxMjguMTg0IDI4LjQzNkMxMjkuMDQgMjggMTMwLjE2IDI4IDEzMi40IDI4SDE1NS42QzE1Ny44NCAyOCAxNTguOTYgMjggMTU5LjgxNiAyOC40MzZDMTYwLjU2OSAyOC44MTk1IDE2MS4xODEgMjkuNDMxNCAxNjEuNTY0IDMwLjE4NEMxNjIgMzEuMDM5NyAxNjIgMzIuMTU5OCAxNjIgMzQuNFY0NS42QzE2MiA0Ny44NDAyIDE2MiA0OC45NjAzIDE2MS41NjQgNDkuODE2QzE2MS4xODEgNTAuNTY4NiAxNjAuNTY5IDUxLjE4MDUgMTU5LjgxNiA1MS41NjRDMTU4Ljk2IDUyIDE1Ny44NCA1MiAxNTUuNiA1MkgxMzIuNEMxMzAuMTYgNTIgMTI5LjA0IDUyIDEyOC4xODQgNTEuNTY0QzEyNy40MzEgNTEuMTgwNSAxMjYuODE5IDUwLjU2ODYgMTI2LjQzNiA0OS44MTZDMTI2IDQ4Ljk2MDMgMTI2IDQ3Ljg0MDIgMTI2IDQ1LjZWMzQuNFoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjc2lkZXNBbnRlbm5hMDFNYXNrMCkiPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNzYiIGZpbGw9IiMyOUI2RjYiLz48cmVjdCB5PSIzOCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzOCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjIiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgMTJDMTQuMjA5MSAxMiAxNiAxMC4yMDkxIDE2IDhDMTYgNS43OTA4NiAxNC4yMDkxIDQgMTIgNEM5Ljc5MDg2IDQgOCA1Ljc5MDg2IDggOEM4IDEwLjIwOTEgOS43OTA4NiAxMiAxMiAxMloiIGZpbGw9IiNGRkVBOEYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzIDlDMTQuMTA0NiA5IDE1IDguMTA0NTcgMTUgN0MxNSA1Ljg5NTQzIDE0LjEwNDYgNSAxMyA1QzExLjg5NTQgNSAxMSA1Ljg5NTQzIDExIDdDMTEgOC4xMDQ1NyAxMS44OTU0IDkgMTMgOVoiIGZpbGw9IndoaXRlIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxLCAwKSI+PGcgZmlsdGVyPSJ1cmwoI3RvcEdsb3dpbmdCdWxiMDFGaWx0ZXIwKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAyNEMzMiAxNS4xNjM0IDM5LjE2MzQgOCA0OCA4SDUyQzYwLjgzNjYgOCA2OCAxNS4xNjM0IDY4IDI0VjMyQzY4IDM2LjQxODMgNjQuNDE4MyA0MCA2MCA0MEg0MEMzNS41ODE3IDQwIDMyIDM2LjQxODMgMzIgMzJWMjRaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L2c+PHBhdGggZD0iTTQ5IDExLjVDNTMuOTMxNSAxMS41IDU4LjM2NiAxMy42MjgxIDYxLjQzNTIgMTcuMDE2MiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5LjgyODQgMjlMNDAuODI4NCAyMEwzOCAyMi44Mjg0TDQ4IDMyLjgyODRWNDBINTJWMzIuOTcwNkw2Mi4xNDIxIDIyLjgyODRMNTkuMzEzNyAyMEw1MC4zMTM3IDI5SDQ5LjgyODRaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjgiLz48cmVjdCB4PSIyMiIgeT0iNDAiIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMiIgcng9IjEiIGZpbGw9IiMyOUI2RjYiLz48ZGVmcz48ZmlsdGVyIGlkPSJ0b3BHbG93aW5nQnVsYjAxRmlsdGVyMCIgeD0iMjQiIHk9IjAiIHdpZHRoPSI1MiIgaGVpZ2h0PSI0OCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMC41IDAiLz48ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+PGZlT2Zmc2V0Lz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjUgMCIvPjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QyX2lubmVyU2hhZG93Ii8+PC9maWx0ZXI+PC9kZWZzPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNSwgNDQpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMThDMCA4LjA1ODg4IDguMDU4ODggMCAxOCAwSDExMkMxMjEuOTQxIDAgMTMwIDguMDU4ODggMTMwIDE4VjQ1LjE0ODNDMTMwIDQ5LjY4MzEgMTI5LjIyOSA1NC4xODQ4IDEyNy43MiA1OC40NjExTDExMC4yMzkgMTA3Ljk5MUMxMDcuNjk5IDExNS4xODcgMTAwLjg5NiAxMjAgOTMuMjY0NyAxMjBIMzYuNzM1M0MyOS4xMDM2IDEyMCAyMi4zMDE0IDExNS4xODcgMTkuNzYxNCAxMDcuOTkxTDIuMjgwMzggNTguNDYxMUMwLjc3MTExNyA1NC4xODQ4IDAgNDkuNjgzMSAwIDQ1LjE0ODNMMCAxOFoiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0iZmFjZVNxdWFyZTAzTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMThDMCA4LjA1ODg4IDguMDU4ODggMCAxOCAwSDExMkMxMjEuOTQxIDAgMTMwIDguMDU4ODggMTMwIDE4VjQ1LjE0ODNDMTMwIDQ5LjY4MzEgMTI5LjIyOSA1NC4xODQ4IDEyNy43MiA1OC40NjExTDExMC4yMzkgMTA3Ljk5MUMxMDcuNjk5IDExNS4xODcgMTAwLjg5NiAxMjAgOTMuMjY0NyAxMjBIMzYuNzM1M0MyOS4xMDM2IDEyMCAyMi4zMDE0IDExNS4xODcgMTkuNzYxNCAxMDcuOTkxTDIuMjgwMzggNTguNDYxMUMwLjc3MTExNyA1NC4xODQ4IDAgNDkuNjgzMSAwIDQ1LjE0ODNMMCAxOFoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjZmFjZVNxdWFyZTAzTWFzazApIj48cmVjdCB4PSItMiIgeT0iLTIiIHdpZHRoPSIxMzQiIGhlaWdodD0iMTI0IiBmaWxsPSIjMDM5QkU1Ii8+dW5kZWZpbmVkPC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MiwgMTI0KSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOCAxMC4yMjIyQzE4IDIxLjc4NDUgMjQuNDc0MSAyOCAzOCAyOEM1MS41MTgyIDI4IDU4IDIxLjY2MTUgNTggMTAuMjIyMkM1OCA5LjQ5NjIyIDU3LjE3MzkgOCA1NSA4QzM5LjI3MDcgOCAyOS4xOTE3IDggMjEgOEMxOC45NDkgOCAxOCA5LjM4NDc5IDE4IDEwLjIyMjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjgiLz48bWFzayBpZD0ibW91dGhTbWlsaWUwMk1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIxOCIgeT0iOCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4IDEwLjIyMjJDMTggMjEuNzg0NSAyNC40NzQxIDI4IDM4IDI4QzUxLjUxODIgMjggNTggMjEuNjYxNSA1OCAxMC4yMjIyQzU4IDkuNDk2MjIgNTcuMTczOSA4IDU1IDhDMzkuMjcwNyA4IDI5LjE5MTcgOCAyMSA4QzE4Ljk0OSA4IDE4IDkuMzg0NzkgMTggMTAuMjIyMloiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjbW91dGhTbWlsaWUwMk1hc2swKSI+PHJlY3QgeD0iMzAiIHk9IjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOCwgNzYpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDQ4QzY1LjI1NDggNDggNzYgMzcuMjU0OCA3NiAyNEM3NiAxMC43NDUyIDY1LjI1NDggMCA1MiAwQzM4Ljc0NTIgMCAyOCAxMC43NDUyIDI4IDI0QzI4IDM3LjI1NDggMzguNzQ1MiA0OCA1MiA0OFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTIgNDRDNjMuMDQ1NyA0NCA3MiAzNS4wNDU3IDcyIDI0QzcyIDEyLjk1NDMgNjMuMDQ1NyA0IDUyIDRDNDAuOTU0MyA0IDMyIDEyLjk1NDMgMzIgMjRDMzIgMzUuMDQ1NyA0MC45NTQzIDQ0IDUyIDQ0WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHBhdGggZD0iTTY0LjU3MjYgMTUuODE1M0M2NC44NzQzIDE2LjI3NzkgNjUuNDkzOSAxNi40MDgyIDY1Ljk1NjUgMTYuMTA2NEM2Ni40MTkgMTUuODA0NiA2Ni41NDk0IDE1LjE4NSA2Ni4yNDc2IDE0LjcyMjVMNjQuNTcyNiAxNS44MTUzWk02MS41ODE1IDkuOTU1NDdDNjEuMTI1NiA5LjY0Mzg0IDYwLjUwMzMgOS43NjA4NCA2MC4xOTE3IDEwLjIxNjhDNTkuODggMTAuNjcyOCA1OS45OTcgMTEuMjk1IDYwLjQ1MyAxMS42MDY3TDYxLjU4MTUgOS45NTU0N1pNNTYuMzU2OCA5LjY0MjIyQzU2Ljg4NTQgOS44MDIzNyA1Ny40NDM3IDkuNTAzNzMgNTcuNjAzOSA4Ljk3NTE4QzU3Ljc2NCA4LjQ0NjYzIDU3LjQ2NTQgNy44ODgzMiA1Ni45MzY4IDcuNzI4MTZMNTYuMzU2OCA5LjY0MjIyWk00NS43MjA2IDguMTk3NjlDNDUuMjA3NCA4LjQwMTc5IDQ0Ljk1NjkgOC45ODMyNiA0NS4xNjEgOS40OTY0NUM0NS4zNjUxIDEwLjAwOTYgNDUuOTQ2NSAxMC4yNjAyIDQ2LjQ1OTcgMTAuMDU2MUw0NS43MjA2IDguMTk3NjlaTTQxLjc2MDMgMTMuMDM4OEM0Mi4xNjM4IDEyLjY2MTcgNDIuMTg1MiAxMi4wMjg5IDQxLjgwODEgMTEuNjI1NEM0MS40MzEgMTEuMjIxOSA0MC43OTgxIDExLjIwMDUgNDAuMzk0NyAxMS41Nzc2TDQxLjc2MDMgMTMuMDM4OFpNMzYuNDU2NyAxNy4xMDUyQzM2LjIzMjUgMTcuNjA5OSAzNi40NTk5IDE4LjIwMDggMzYuOTY0NiAxOC40MjVDMzcuNDY5NCAxOC42NDkyIDM4LjA2MDMgMTguNDIxOCAzOC4yODQ1IDE3LjkxNzFMMzYuNDU2NyAxNy4xMDUyWk02Ni4yNDc2IDE0LjcyMjVDNjUuMDIxMiAxMi44NDI3IDYzLjQzMyAxMS4yMjA4IDYxLjU4MTUgOS45NTU0N0w2MC40NTMgMTEuNjA2N0M2Mi4wODc1IDEyLjcyMzggNjMuNDkgMTQuMTU1OSA2NC41NzI2IDE1LjgxNTNMNjYuMjQ3NiAxNC43MjI1Wk01Ni45MzY4IDcuNzI4MTZDNTUuMzczMyA3LjI1NDM4IDUzLjcxNTUgNyA1Mi4wMDAxIDdWOUM1My41MTY5IDkgNTQuOTc5MyA5LjIyNDggNTYuMzU2OCA5LjY0MjIyTDU2LjkzNjggNy43MjgxNlpNNTIuMDAwMSA3QzQ5Ljc4NCA3IDQ3LjY2NDYgNy40MjQ1NiA0NS43MjA2IDguMTk3NjlMNDYuNDU5NyAxMC4wNTYxQzQ4LjE3MjQgOS4zNzQ5NiA1MC4wNDEzIDkgNTIuMDAwMSA5VjdaTTQwLjM5NDcgMTEuNTc3NkMzOC43Mzc4IDEzLjEyNjEgMzcuMzkwNiAxNS4wMDI5IDM2LjQ1NjcgMTcuMTA1MkwzOC4yODQ1IDE3LjkxNzFDMzkuMTA4IDE2LjA2MzMgNDAuMjk2OCAxNC40MDY2IDQxLjc2MDMgMTMuMDM4OEw0MC4zOTQ3IDExLjU3NzZaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjkiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDM0QzU3LjUyMjggMzQgNjIgMjkuNTIyOCA2MiAyNEM2MiAxOC40NzcyIDU3LjUyMjggMTQgNTIgMTRDNDYuNDc3MiAxNCA0MiAxOC40NzcyIDQyIDI0QzQyIDI5LjUyMjggNDYuNDc3MiAzNCA1MiAzNFoiIGZpbGw9IiNDNjA4MEMiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDI4QzU0LjIwOTEgMjggNTYgMjYuMjA5MSA1NiAyNEM1NiAyMS43OTA5IDU0LjIwOTEgMjAgNTIgMjBDNDkuNzkwOSAyMCA0OCAyMS43OTA5IDQ4IDI0QzQ4IDI2LjIwOTEgNDkuNzkwOSAyOCA1MiAyOFoiIGZpbGw9IiNFRTkzMzciLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDI1QzUyLjU1MjMgMjUgNTMgMjQuNTUyMyA1MyAyNEM1MyAyMy40NDc3IDUyLjU1MjMgMjMgNTIgMjNDNTEuNDQ3NyAyMyA1MSAyMy40NDc3IDUxIDI0QzUxIDI0LjU1MjMgNTEuNDQ3NyAyNSA1MiAyNVoiIGZpbGw9IiNGNUY5NEYiLz48L2c+PC9zdmc+">
                <span class="account-name" data-address="${address}">${name}</span>
            </div>
        </div>
        <div class="row">
            <label for="Transfer to">To</label>
            <div class="col2">
                <img role="img" class="avatar" aria-label="account avatar" src="data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PG1ldGFkYXRhPjxyZGY6UkRGPjxjYzpXb3JrPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGU+Qm90dHRzPC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPlBhYmxvIFN0YW5sZXk8L2RjOnRpdGxlPjwvY2M6QWdlbnQ+PC9kYzpjcmVhdG9yPjxkYzpzb3VyY2U+aHR0cHM6Ly9ib3R0dHMuY29tLzwvZGM6c291cmNlPjxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9ib3R0dHMuY29tLyIvPjxkYzpjb250cmlidXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPkZsb3JpYW4gS8O2cm5lcjwvZGM6dGl0bGU+PC9jYzpBZ2VudD48L2RjOmNvbnRyaWJ1dG9yPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48cmVjdCBmaWxsPSJ0cmFuc3BhcmVudCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHg9IjAiIHk9IjAiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCA2NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuOTgwOSAyMC45MTQxQzE0IDIyLjgzOTMgMTQgMjUuMzU5NSAxNCAzMC40VjQ1LjZDMTQgNTAuNjQwNSAxNCA1My4xNjA3IDE0Ljk4MDkgNTUuMDg1OUMxNS44NDM4IDU2Ljc3OTQgMTcuMjIwNiA1OC4xNTYyIDE4LjkxNDEgNTkuMDE5MUMyMC44MzkzIDYwIDIzLjM1OTUgNjAgMjguNCA2MEgzNS42QzQwLjY0MDUgNjAgNDMuMTYwNyA2MCA0NS4wODU5IDU5LjAxOTFDNDYuNzc5NCA1OC4xNTYyIDQ4LjE1NjIgNTYuNzc5NCA0OS4wMTkxIDU1LjA4NTlDNTAgNTMuMTYwNyA1MCA1MC42NDA1IDUwIDQ1LjZWMzAuNEM1MCAyNS4zNTk1IDUwIDIyLjgzOTMgNDkuMDE5MSAyMC45MTQxQzQ4LjE1NjIgMTkuMjIwNiA0Ni43Nzk0IDE3Ljg0MzggNDUuMDg1OSAxNi45ODA5QzQzLjE2MDcgMTYgNDAuNjQwNSAxNiAzNS42IDE2SDI4LjRDMjMuMzU5NSAxNiAyMC44MzkzIDE2IDE4LjkxNDEgMTYuOTgwOUMxNy4yMjA2IDE3Ljg0MzggMTUuODQzOCAxOS4yMjA2IDE0Ljk4MDkgMjAuOTE0MVpNMTMwLjk4MSAyMC45MTQxQzEzMCAyMi44MzkzIDEzMCAyNS4zNTk1IDEzMCAzMC40VjQ1LjZDMTMwIDUwLjY0MDUgMTMwIDUzLjE2MDcgMTMwLjk4MSA1NS4wODU5QzEzMS44NDQgNTYuNzc5NCAxMzMuMjIxIDU4LjE1NjIgMTM0LjkxNCA1OS4wMTkxQzEzNi44MzkgNjAgMTM5LjM2IDYwIDE0NC40IDYwSDE1MS42QzE1Ni42NCA2MCAxNTkuMTYxIDYwIDE2MS4wODYgNTkuMDE5MUMxNjIuNzc5IDU4LjE1NjIgMTY0LjE1NiA1Ni43Nzk0IDE2NS4wMTkgNTUuMDg1OUMxNjYgNTMuMTYwNyAxNjYgNTAuNjQwNSAxNjYgNDUuNlYzMC40QzE2NiAyNS4zNTk1IDE2NiAyMi44MzkzIDE2NS4wMTkgMjAuOTE0MUMxNjQuMTU2IDE5LjIyMDYgMTYyLjc3OSAxNy44NDM4IDE2MS4wODYgMTYuOTgwOUMxNTkuMTYxIDE2IDE1Ni42NCAxNiAxNTEuNiAxNkgxNDQuNEMxMzkuMzYgMTYgMTM2LjgzOSAxNiAxMzQuOTE0IDE2Ljk4MDlDMTMzLjIyMSAxNy44NDM4IDEzMS44NDQgMTkuMjIwNiAxMzAuOTgxIDIwLjkxNDFaIiBmaWxsPSIjMDA3NkRFIi8+PG1hc2sgaWQ9InNpZGVzU3F1YXJlTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjE0IiB5PSIxNiIgd2lkdGg9IjE1MiIgaGVpZ2h0PSI0NCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC45ODA5IDIwLjkxNDFDMTQgMjIuODM5MyAxNCAyNS4zNTk1IDE0IDMwLjRWNDUuNkMxNCA1MC42NDA1IDE0IDUzLjE2MDcgMTQuOTgwOSA1NS4wODU5QzE1Ljg0MzggNTYuNzc5NCAxNy4yMjA2IDU4LjE1NjIgMTguOTE0MSA1OS4wMTkxQzIwLjgzOTMgNjAgMjMuMzU5NSA2MCAyOC40IDYwSDM1LjZDNDAuNjQwNSA2MCA0My4xNjA3IDYwIDQ1LjA4NTkgNTkuMDE5MUM0Ni43Nzk0IDU4LjE1NjIgNDguMTU2MiA1Ni43Nzk0IDQ5LjAxOTEgNTUuMDg1OUM1MCA1My4xNjA3IDUwIDUwLjY0MDUgNTAgNDUuNlYzMC40QzUwIDI1LjM1OTUgNTAgMjIuODM5MyA0OS4wMTkxIDIwLjkxNDFDNDguMTU2MiAxOS4yMjA2IDQ2Ljc3OTQgMTcuODQzOCA0NS4wODU5IDE2Ljk4MDlDNDMuMTYwNyAxNiA0MC42NDA1IDE2IDM1LjYgMTZIMjguNEMyMy4zNTk1IDE2IDIwLjgzOTMgMTYgMTguOTE0MSAxNi45ODA5QzE3LjIyMDYgMTcuODQzOCAxNS44NDM4IDE5LjIyMDYgMTQuOTgwOSAyMC45MTQxWk0xMzAuOTgxIDIwLjkxNDFDMTMwIDIyLjgzOTMgMTMwIDI1LjM1OTUgMTMwIDMwLjRWNDUuNkMxMzAgNTAuNjQwNSAxMzAgNTMuMTYwNyAxMzAuOTgxIDU1LjA4NTlDMTMxLjg0NCA1Ni43Nzk0IDEzMy4yMjEgNTguMTU2MiAxMzQuOTE0IDU5LjAxOTFDMTM2LjgzOSA2MCAxMzkuMzYgNjAgMTQ0LjQgNjBIMTUxLjZDMTU2LjY0IDYwIDE1OS4xNjEgNjAgMTYxLjA4NiA1OS4wMTkxQzE2Mi43NzkgNTguMTU2MiAxNjQuMTU2IDU2Ljc3OTQgMTY1LjAxOSA1NS4wODU5QzE2NiA1My4xNjA3IDE2NiA1MC42NDA1IDE2NiA0NS42VjMwLjRDMTY2IDI1LjM1OTUgMTY2IDIyLjgzOTMgMTY1LjAxOSAyMC45MTQxQzE2NC4xNTYgMTkuMjIwNiAxNjIuNzc5IDE3Ljg0MzggMTYxLjA4NiAxNi45ODA5QzE1OS4xNjEgMTYgMTU2LjY0IDE2IDE1MS42IDE2SDE0NC40QzEzOS4zNiAxNiAxMzYuODM5IDE2IDEzNC45MTQgMTYuOTgwOUMxMzMuMjIxIDE3Ljg0MzggMTMxLjg0NCAxOS4yMjA2IDEzMC45ODEgMjAuOTE0MVoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjc2lkZXNTcXVhcmVNYXNrMCkiPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNzYiIGZpbGw9IiNGRjcwNDMiLz48cmVjdCB5PSIzOCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzOCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MSwgMCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTAgMTNDMzguOTU0MyAxMyAzMCAyMS45NTQzIDMwIDMzVjM2SDIxQzIwLjQ0NzcgMzYgMjAgMzYuNDQ3NyAyMCAzN1Y1MUMyMCA1MS41NTIzIDIwLjQ0NzcgNTIgMjEgNTJINzlDNzkuNTUyMyA1MiA4MCA1MS41NTIzIDgwIDUxVjM3QzgwIDM2LjQ0NzcgNzkuNTUyMyAzNiA3OSAzNkg3MFYzM0M3MCAyMS45NTQzIDYxLjA0NTcgMTMgNTAgMTNaIiBmaWxsPSIjNTlDNEZGIi8+PG1hc2sgaWQ9InRvcEJ1bGIwMU1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIyMCIgeT0iMTMiIHdpZHRoPSI2MCIgaGVpZ2h0PSIzOSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MCAxM0MzOC45NTQzIDEzIDMwIDIxLjk1NDMgMzAgMzNWMzZIMjFDMjAuNDQ3NyAzNiAyMCAzNi40NDc3IDIwIDM3VjUxQzIwIDUxLjU1MjMgMjAuNDQ3NyA1MiAyMSA1Mkg3OUM3OS41NTIzIDUyIDgwIDUxLjU1MjMgODAgNTFWMzdDODAgMzYuNDQ3NyA3OS41NTIzIDM2IDc5IDM2SDcwVjMzQzcwIDIxLjk1NDMgNjEuMDQ1NyAxMyA1MCAxM1oiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjdG9wQnVsYjAxTWFzazApIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUyIiBmaWxsPSIjRkY3MDQzIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MCAzNkM1Mi4yMDkxIDM2IDU0IDM1LjAyOCA1NCAzMS43MTQzQzU0IDI4LjQwMDYgNTIuMjA5MSAyNCA1MCAyNEM0Ny43OTA5IDI0IDQ2IDI4LjQwMDYgNDYgMzEuNzE0M0M0NiAzNS4wMjggNDcuNzkwOSAzNiA1MCAzNloiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjIwIiB5PSIxMyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIzIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48cGF0aCBkPSJNNTAgMTQuNUM0OS40NDc3IDE0LjUgNDkgMTQuOTQ3NyA0OSAxNS41QzQ5IDE2LjA1MjMgNDkuNDQ3NyAxNi41IDUwIDE2LjVWMTQuNVpNNjEuNjk0MSAyMS42ODc1QzYyLjA2NDkgMjIuMDk2OCA2Mi42OTczIDIyLjEyODEgNjMuMTA2NiAyMS43NTczQzYzLjUxNTkgMjEuMzg2NSA2My41NDcxIDIwLjc1NDEgNjMuMTc2MyAyMC4zNDQ4TDYxLjY5NDEgMjEuNjg3NVpNNjUuNzU5NSAyNC4wNDczQzY1LjUwMzUgMjMuNTU3OSA2NC44OTkzIDIzLjM2ODYgNjQuNDA5OSAyMy42MjQ2QzYzLjkyMDUgMjMuODgwNiA2My43MzEzIDI0LjQ4NDggNjMuOTg3MyAyNC45NzQyTDY1Ljc1OTUgMjQuMDQ3M1pNNjUuNDI0OCAyOC45NTU5QzY1LjU0MDQgMjkuNDk1OSA2Ni4wNzE5IDI5Ljg0IDY2LjYxMTkgMjkuNzI0NEM2Ny4xNTIgMjkuNjA4OCA2Ny40OTYxIDI5LjA3NzMgNjcuMzgwNSAyOC41MzczTDY1LjQyNDggMjguOTU1OVpNNTAgMTYuNUM1NC42Mzc1IDE2LjUgNTguODA2NSAxOC40OTk5IDYxLjY5NDEgMjEuNjg3NUw2My4xNzYzIDIwLjM0NDhDNTkuOTI1NiAxNi43NTYzIDU1LjIyNTYgMTQuNSA1MCAxNC41VjE2LjVaTTYzLjk4NzMgMjQuOTc0MkM2NC42MzU3IDI2LjIxMzkgNjUuMTIzOSAyNy41NTAxIDY1LjQyNDggMjguOTU1OUw2Ny4zODA1IDI4LjUzNzNDNjcuMDQxMSAyNi45NTE4IDY2LjQ5MDQgMjUuNDQ0OCA2NS43NTk1IDI0LjA0NzNMNjMuOTg3MyAyNC45NzQyWiIgZmlsbD0id2hpdGUiLz48L2c+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LCA0NCkiPjxyZWN0IHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIiByeD0iMTgiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0iZmFjZVNxdWFyZTAxTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIj48cmVjdCB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEyMCIgcng9IjE4IiBmaWxsPSJ3aGl0ZSIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2ZhY2VTcXVhcmUwMU1hc2swKSI+PHJlY3QgeD0iLTIiIHk9Ii0yIiB3aWR0aD0iMTM0IiBoZWlnaHQ9IjEyNCIgZmlsbD0iI0Y0NTExRSIvPnVuZGVmaW5lZDwvZz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIsIDEyNCkiPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjM2IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjI0IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjQ4IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjYwIiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOCwgNzYpIj48cmVjdCB5PSI0IiB3aWR0aD0iMTA0IiBoZWlnaHQ9IjQyIiByeD0iNCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHJlY3QgeD0iMjgiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjOEJEREZGIi8+PHJlY3QgeD0iNjYiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjOEJEREZGIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSA0SDI5TDEyIDQ2SDRMMjEgNFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjwvZz48L3N2Zz4=">
                ${transferTo}
            </div>
        </div>
        <div class="row">
            <label for="price">$</label>
            ${transferPrice}
        </div>
        <div class="row">
            <label for="fee">Fee</label>
            <div class="fee">${fee}</div>
        </div>
        <div class="row">
            <div class="actions" role="action">
                ${cancelButton}${transferButton}
            </div>
        </div>
    </div>
    `

    return transferElement

    function handleCancel (name) {
        sender({from: name, flow: 'transfer / button', type: 'click', fn: 'handleCancel', file, line: 50})
    }
    function handleTransfer (name) {
        const body = {sender: accountName, address: account, toAccount: transferTo.value, price: transferPrice.value, fee}
        sender({from: name, flow: 'transfer / button', type: 'click', body, fn: 'handleTransfer', file, line: 54})
    }
    function get (msg) {
        console.log( msg );
    }
}
}).call(this)}).call(this,"/demo/node_modules/Transfer.js")
},{"bel":9,"path":33}],6:[function(require,module,exports){
(function (__filename){(function (){
const styleSheet = require('../../src/node_modules/supportCSSStyleSheet')
const bel = require('bel')
const file = require('path').basename(__filename)
const icon = require('../../src/node_modules/icon')

module.exports = actions

function actions (protocol) {
    const sender = protocol (get)
    const e = document.createElement('i-actions')
    const root = e.attachShadow({mode: 'closed'})
    const debugIcon = new icon({name: 'debug'})
    const showAllButton = bel`<button role="button" aria-current="true" aria-label="Show all" class="btn" data-active="true" data-item="all">Show all modals</button>`
    const planPlayButton = bel`<button role="button" aria-label="Plan play" class="btn" data-active="false" data-item="default modal">Plan play</button>`
    const createButton = bel`<button role="button" aria-label="Create new account" class="btn" data-active="false" data-item="step modal">Create new account</button>`
    const transferButton = bel`<button role="button" aria-label="Transfer" class="btn" data-active="false" data-item="action modal">Transfer</button>`
    const helpButton = bel`<button role="button" aria-label="Help" class="btn" data-active="false" data-item="help modal">Help</button>`
    const actionBar = bel`<div class="actions" onclick="${(e) => handleTabs(e, actionBar)}">${showAllButton}${planPlayButton}${createButton}${transferButton}${helpButton}</div>`
    const deubgButton = bel`<button role="button" aria-label="Debug mode" class="btn debug" data-debug="true" onclick=${()=> debugModeOpen(deubgButton)}>${debugIcon}</button>`
    // style loades first
    styleSheet(root, style)
    // shadow loades second
    root.append(actionBar, deubgButton)
    return e

    function debugModeOpen (b) {
        b.dataset.debug =  b.dataset.debug === 'false' ? 'true' : 'false'
        sender({from: 'debug', flow: 'actions', type: 'click', state: b.dataset.debug, fn: 'debugModeOpen', file, line: 28})
    }

    function handleTabs (e, target) {
        const current = e.target.textContent
        const buttons = [...target.children]
        buttons.map( b => {
            if (b.dataset.active === true) return
            b.dataset.active = false
            b.removeAttribute('aria-current')
            if (current === b.textContent) {
                b.dataset.active = true
                b.setAttribute('aria-current', true)
                sender({from: `${current} button`, flow: 'actions', type: 'click', fn: 'handleTabs', body: b.dataset.item.split(' ')[0], file, line: 41})
            } 
       })
    }

    function get (msg) {
        console.log( msg )
    }
}

const style = `
:host(i-actions) .actions {
    display: grid;
    grid-template-rows: 44px;
    grid-auto-flow: column;
    gap: 8px;
}
:host(i-actions) button {
    --button-size: var(--size14);
    --button-color: var(--primary-color);
    --button-bgColor: var(--color-greyEF);
    --button-padding: 6px 12px;
    font-size: var(--button-size);
    color: hsl( var(--button-color) );
    background-color: hsl( var(--button-bgColor) );
    padding: var(--button-padding);
    border: none;
    border-radius: 4px;
    transition: color .25s, background-color .25s linear;
    cursor: pointer;
}
:host(i-actions) button[data-active="true"] {
    --button-color: var(--color-white);
    --button-bgColor: var(--color-black);
    cursor: default;
}
:host(i-actions) .debug {
    --button-bgColor: var(--color-black);
    --button-padding: 4px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
    border-radius: 0;
}
:host(i-actions) .debug .icon {
    width: 24px;
    height: 24px;
}
:host(i-actions) .debug svg {
    width: 100%;
    height: auto;
}
:host(i-actions) .debug svg g {
    --svg-fill: var(--color-grey88);
    fill: hsl( var(--svg-fill) );
}
:host(i-actions) .debug[data-debug="true"] {
    --button-bgColor: var(--color-red);
}
:host(i-actions) .debug[data-debug="true"] svg g {
    --svg-fill: var(--color-black);
}
`
}).call(this)}).call(this,"/demo/node_modules/actions.js")
},{"../../src/node_modules/icon":39,"../../src/node_modules/supportCSSStyleSheet":41,"bel":9,"path":33}],7:[function(require,module,exports){
const createAccount = require('./CreateAccount')
const planPlay = require('PlanPlay')
const transfer = require('./Transfer')
const help = require('./Help')

const newAccountOpt = (protocol) => {
    return {
        name: 'create new account',
        header: 'Create new account',
        body: createAccount( {page: 'USER', name: this.name}, protocol ),
        ui: 'step-modal',
        theme: {
            style: `
            :host(i-modal[data-ui="custom"]) .i-modal {
                --modal-bgColor: 29, 100%, 70%;
                --modal-padding: 20px;
            }
            `,
            props: {
                // bgColor: 'var(--color-blue)'
            },
            header: {
                // style: `
                // /* :host(i-header[data-ui="step-modal"]) {
                //     --modal-header-bgColor: 202, var(--r);
                // } */
                // :host(i-header[data-ui="custom"]) {
                //     --modal-header-bgColor: 29, var(--r);
                //     --modal-header-padding: 20px;
                // }
                // :host(i-header[data-ui="custom"]) h1 {
                //     --modal-header-color: 50, var(--r);
                // }
                // `,
                // props: {
                //     size: 'var(--size28)',
                //     color: 'var(--color-white)',
                //     bgColor: 'var(--color-purple)',
                //     padding: '15px;'
                // }
            },
            body: {
                // style: `
                // :host(i-body[data-ui="step-modal"]) {
                //     --modal-body-bgColor: 200, var(--r);
                // }
                // :host(i-body[data-ui="custom"]) {
                //     background-color: hsl(330, 2%, 22%);
                //     padding: 30px 20px;
                // }
                // :host(i-body[data-ui="custom"]) label {
                //     color: hsl(var(--color-black));
                // }
                // :host(i-body[data-ui="custom"]) span {
                //     color: hsl(0, 0%, 60%);
                // }
                // :host(i-body[data-ui="custom"]) .row:focus-within label {
                //     --label-focus: 29, 100%, 58%;
                // }
                // :host(i-body[data-ui="custom"]) input[name="address"]:disabled {
                //     color: hsl(0, 0%, 60%);
                // }
                // :host(i-body[data-ui="custom"]) input:focus, 
                // :host(i-body[data-ui="custom"]) .col2:focus-within,
                // :host(i-body[data-ui="custom"]) select:focus {
                //     --shadow-blur: 12px;
                //     --shadow-color: hsla(50, 100%, 50%, 0.5);
                // }
                // `,
                // props: {
                //     size: 'var(--size14)',
                //     labelSize: 'var(--size12)',
                //     labelColor: 'var(--color-white)',
                //     labelFocusColor: 'var(--color-purple)',
                //     inputColor: 'var(--color-black)',
                //     inputBorderColor: 'var(--color-blue)',
                //     inputFocusColor: 'var(--color-purple)',
                //     borderColor: 'var(--color-flame)',
                //     borderWidth: '20px',
                // }
            }
        }
    }
}

const planPlayOpt = (protocol) => {
    const obj =  {
        name: 'plan1',
        header: 'Your small step is our big step',
        body: planPlay({name: 'Plan1', page: 'PLAN'}, protocol),
    }
    return obj
}

const transferOpt = (protocol) => {
    const obj = {
        name: 'transfer',
        header: 'Transfer',
        body: transfer({account: {name: 'Host', address: '1LKSTwS7AoGUJqLfF4webRBHvzQ7qFHU8C'}, page: 'PLAN'}, protocol),
        ui: 'action-modal'
    }
    return obj
}

const helpOpt = (protocol) => {
    return {
        name: 'help',
        header: 'Plan summary list',
        body: help({page: 'USER', name: 'plan-summary-list'}, protocol),
        ui: 'help-modal',
        theme: {
            // style: `
            // :host(i-modal[data-ui="help-modal"]) .i-modal {
            //     --modal-bgColor: 50, var(--r);
            // }
            // `,
            // props: {
            //     bgColor: 'var(--color-greyE2)'
            // },
            // body:{
                // style:  `
                // :host(i-body[data-ui="help-modal"]) {
                //     --modal-body-bgColor: var(--color-blue);
                // }
                // `,
            //     props: {
            //         color: 'var(--color-white)',
            //         bgColor: 'var(--color-purple)'
            //     }
            // }
        }
        
    }
}

module.exports = { newAccountOpt, planPlayOpt, transferOpt, helpOpt }
},{"./CreateAccount":2,"./Help":3,"./Transfer":5,"PlanPlay":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./appendChild":8,"hyperx":31}],10:[function(require,module,exports){
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
},{"csjs":15,"insert-css":32}],11:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":14}],12:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":10,"./get-css":11}],13:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":19}],14:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":23}],15:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs();
module.exports.csjs = csjs;
module.exports.noScope = csjs({ noscope: true });
module.exports.getCss = require('./get-css');

},{"./csjs":13,"./get-css":14}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./composition":18}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./build-exports":17,"./composition":18,"./css-extract-extends":20,"./css-key":21,"./extract-exports":22,"./scopeify":28}],20:[function(require,module,exports){
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

},{"./composition":18}],21:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],22:[function(require,module,exports){
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

},{"./regex":25}],23:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":21}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./regex":25}],27:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":16,"./hash-string":24}],28:[function(require,module,exports){
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

},{"./regex":25,"./replace-animations":26,"./scoped-name":27}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":30}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":34}],34:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],35:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const iheader = require('i-header')
const ibody = require('i-body')
const nocontent = require('i-nocontent')
const styleSheet = require('supportCSSStyleSheet')
const icon = require('icon')
const file = require('path').basename(__filename)

// const myElement = require('test')
module.exports = component

function component({page, name = 'modal', flow = 'ui-modal', header, body = nocontent(), ui = 'default', theme }, protocol) {
    const sender = protocol( get )
    sender({page, from: name, flow, type: 'ready', fn: 'component', file, line: 15 })
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var { color, bgColor, borderWidth, borderStyle, borderColor, padding } = theme.props
    }
    function layout(style) {
        const modal = document.createElement('i-modal')
        const root = modal.attachShadow({mode: 'closed'})
        modal.dataset.ui = ui
        const closeIcon = new icon({name: 'cross'})
        const close = bel`<button role="button" data-ui="close" aria-label="close modal" aria-controls="close modal" onclick="${() => handleClose(modal)}">${closeIcon}</button>`
        const role =  ui === 'step-modal' || ui === 'action-modal' ? 'contentinfo' : 'dialog'
        const el = bel`
        <div role="${role}" class="i-modal" aria-label="${ui}">
            ${ui === 'help-modal' ? close : null}
            ${iheader({label: 'create new account', content: header, ui, theme: theme ? theme.header : void 0 })}
            ${ibody({label: 'modal body', content: body === '' ? nocontent() : body, ui, theme: theme ? theme.body : void 0 })}
        </div>`
        // style loades first
        styleSheet(root, style)
        // shadow loades second
        root.append(el)
        return modal
    }

    function handleClose (modal) {
        modal.remove()
        sender({flow: `${flow}/${ui}`, from: name, type: 'closed', file, fn: 'handleClose', line: 43})
    }

    function get(m) {
        console.log(m)
    }

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
        color: hsl( var(--modal-color) );
        background-color: hsl( var(--modal-bgColor) );
        border: var(--modal-border);
    }
    :host(i-modal) .i-modal:focus, :host(i-modal) .i-modal:focus-within {
        --outline-border-width: 4px; 
        --outline-style: ridge;
        --outline-color: var(--color-greyE2);
        --outline: var(--outline-border-width) var(--outline-style) hsl( var(--outline-color) );
        outline: var(--outline);
    }
    :host(i-modal[data-ui="default"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-width: ${borderWidth ? borderWidth : '1px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-black)'};
        --modal-border: var(--modal-border-width) var(--modal-border-style) hsl( var(--modal-border-color) );
        --modal-padding: ${padding ? padding : '30px 34px'};
    }
    :host(i-modal[data-ui="step-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-padding: ${padding ? padding : '0'};
    }
    :host(i-modal[data-ui="action-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primary-color)'};
        --modal-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --modal-border-top-width: ${borderWidth ? borderWidth : '8px'};
        --modal-border-style: ${borderStyle ? borderStyle : 'solid'};
        --modal-border-color: ${borderColor ? borderColor : 'var(--color-black)'};
        --modal-border-top: var(--modal-border-top-width) var(--modal-border-style) hsl( var(--modal-border-color) );
        --modal-padding: ${padding ? padding : '25px 50px'};
        border-top: var(--modal-border-top);
    }
    :host(i-modal[data-ui="action-modal"]) .i-modal:focus, :host(i-modal[data-ui="action-modal"]) .i-modal:focus-within {
        box-shadow: 0 -6px 10px hsla(0, 0%, 0%, .5);
        outline: none;
    }
    :host(i-modal[data-ui="help-modal"]) .i-modal {
        --modal-color: ${color ? color : 'var(--primary-color)'};
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
        --bgColor: var(--color-white);
        position: absolute;
        right: -7px;
        top: -7px;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        background-color: hsl(var(--bgColor));
        border: none;
        box-shadow: 0px 3px 6px hsla(0, 0%, 0%, 0.16);
    }
    
    ${customStyle}
    `
    return layout(style)
}
}).call(this)}).call(this,"/src/index.js")
},{"bel":9,"i-body":36,"i-header":37,"i-nocontent":38,"icon":39,"path":33,"supportCSSStyleSheet":41}],36:[function(require,module,exports){
const styleSheet = require('./supportCSSStyleSheet')
module.exports = body

function body ({content, ui, theme}) {
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {
            size, color, bgColor, 
            borderWidth, borderStyle, borderColor, 
            labelSize, labelColor, labelFocusColor, 
            inputColor, inputFocusColor, inputBgColor, 
            inputBorderWidth, inputBorderStyle, inputBorderColor, inputPadding, 
            shadowBlur, shadowColor, limitSize, limitColor, 
            avatarSize
        } = theme.props
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
        --modal-body-size: ${size ? size : 'var(--size14)'};
        --modal-body-color: ${color ? color : 'var(--color-grey88)'};
        --modal-body-bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --opacity: 0;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr;
        background-color: hsla( var(--modal-body-bgColor), var(--opacity) );
        align-items: center;
        color: hsl( var(--modal-body-color) );
        font-size: var(--modal-body-size);
    }
    :host(i-body) button {
        cursor: pointer;
        display: grid;
        justify-content: center;
        align-items: center;
        padding: 4px 10px;
    }
    :host(i-body) button > .icon {
        width: 24px;
        height: 24px;
    }
    :host(i-body) img, svg {
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
        color: hsl( var(--color) );
        font-size: var(--size);
        word-break: break-all;
    }
    :host(i-body) .row:focus-within label {
        --label-focus: ${labelFocusColor ? labelFocusColor : 'var(--color-black)'};
        color: hsl( var(--label-focus) );
    }
    :host(i-body) label {
        --label-color: ${labelColor ? labelColor : 'var(--color-grey66)'};
        --label-size: ${ labelSize ? labelSize : 'var(--size14)'};
        grid-row-start: 1;
        align-self: center;
        color: hls( var(--label-color) );
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
        --input-border: var(--input-border-width) var(--input-border-style) hsl( var(--input-border-color) );
        --input-radius: var(--primary-input-radius);
        --input-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        --input-padding: ${inputPadding ? inputPadding : '6px'};
        grid-column-start: 2;
        color: hsl( var(--input-color) );
        font-size: var(--input-size);
        line-height: inherit;
        border: var(--input-border);
        border-radius: var(--input-radius);
        padding: var(--input-padding);
        background-color: hsl( var(--input-bgColor) );
        transition: border .6s, background-color .6s, box-sahdow .6s linear;
    }
    :host(i-body) .col3.address {
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
        color: hsl( var(--limit-color) );
    }
    :host(i-body) input[name="address"]:disabled {
        color: hsl( var(--color-black) );
        border: none;
        background-color: transparent;
    }
    :host(i-body) input:focus {
        --input-focus: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : 'hsla(0, 0%, 0%, .5)'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) hsl( var(--shadow-color) );
        -webkit-appearance: none; 
        appearance: none;
        border-color: hsl( var(--input-focus) );
        box-shadow: var(--shadow); 
        outline: none;
    }
    :host(i-body) .col2 {
        --col-border-width: ${inputBorderWidth ? inputBorderWidth : '1px'};
        --col-border-style: ${inputBorderStyle ? inputBorderStyle : 'solid'};
        --col-border-color: ${inputBorderColor ? inputBorderColor : 'var(--color-greyCB)'};
        --col-border: var(--col-border-width) var(--col-border-style) hsl( var(--col-border-color) );
        --col-radius: var(--primary-input-radius);
        --col-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        --opacity: 1;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 24px auto;
        border: var(--col-border);
        border-radius: var(--col-radius);
        background-color: hsla( var(--col-bgColor), var(--opacity) );
        align-items: center;
        padding: 0 10px;
        transition: border 0.6s, background-color 0.6s ease-in-out;
    }
    :host(i-body) .col2 .avatar {
        grid-row-start: 1;
        grid-column-start: 1;
    }
    :host(i-body) .col2 input {
        border: none;
        box-shadow: none;
        grid-row-start: 1;
        grid-column-start: 2;
    }
    :host(i-body) .col3 {
        --col-border-width: ${inputBorderWidth ? inputBorderWidth : '1px'};
        --col-border-style: ${inputBorderStyle ? inputBorderStyle : 'solid'};
        --col-border-color: ${inputBorderColor ? inputBorderColor : 'var(--color-greyCB)'};
        --col-border: var(--col-border-width) var(--col-border-style) hsl( var(--col-border-color) );
        --col-radius: var(--primary-input-radius);
        --col-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr) 50px;
        border: var(--col-border);
        border-radius: var(--col-radius);
        background-color: hsl( var(--col-bgColor) );
        align-items: center;
        transition: border 0.6s, background-color 0.6s ease-in-out;
    }
    :host(i-body) .col2:focus-within, :host(i-body) .col3:focus-within {
        --focus-color: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : '0, 0%, 50%'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) hsl( var(--shadow-color) );
        border-color: hsl( var(--focus-color) );
        box-shadow: var(--shadow);
    }
    :host(i-body) .col3 input {
        --input-radius: var(--primary-input-radius);
        border: none;
        grid-column-start: span 2;
        border-radius: var(--input-radius);
        background-color: transparent;
        box-shadow: none;
    }
    :host(i-body) .col2 button, :host(i-body) .col3 button {
        background-color: transparent;
        border: none;
        grid-column-start: 3;
        grid-column-end: 4;
        padding: 0;
    }
    :host(i-body) button .down {
        transform: rotate(-90deg);
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
        --select-border: var(--select-border-width) var(--select-border-style) hsl( var(--select-border-color) );
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
        background-color: hsl( var(--select-bgColor) );
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
        --modal-body-border: var(--modal-body-border-width) var(--modal-body-border-style) hsl( var(--modal-body-border-color) );
        --modal-body-padding: 30px 10px 30px 30px;
        border: var(--modal-body-border);
        padding: var(--modal-body-padding);
    }
    :host(i-body[data-ui="action-modal"]) {}
    :host(i-body[data-ui="help-modal"]) {
        --modal-body-size: ${size ? size : 'var(--size14)'};
        --modal-body-color: ${color ? color : 'var(--color-grey33)'};
    }
    :host(i-body[data-ui="help-modal"]) footer {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: minmax(min-content, auto) auto minmax(auto, 100px);
    }
    :host(i-body[data-ui="help-modal"]) footer > button {
        grid-column-start: 3;
        background-color: transparent;
        border: none;
    }
    :host(i-body[data-ui="help-modal"]) footer > button .icon {
        width: 16px;
        grid-column-start: 2;
        display: grid;
        align-items: center;
        margin-left: 10px;
    }
    :host(i-body) .actions {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
    }
    :host(i-body[data-ui="action-modal"]) .actions {
        grid-column-start: 2;
        gap: 50px;
    }
    :host(i-body) .info {
        --info-size: ${size ? size : 'var(--size14)'};
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 32px auto;
        align-items: center;
        font-size: var(--info-size);
        padding-left: 10px;
    }
    :host(i-body) .avatar  {
        --avatar-size: ${avatarSize ? avatarSize : '24px'};
        width: var(--avatar-size);
        height: var(--avatar-size);
    }
    :host(i-body) div[data-action="transfer"] .row {
        grid-template-rows: auto;
        grid-template-columns: 34px 1fr;
        gap: 8px;
    }
    :host(i-body) .fee {
        display: grid;
        align-items: center;
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
        :host(i-body) .col3 {
            grid-row-start: 2;
        }
        :host(i-body) .col3.address {
            grid-row-start: 3;
            grid-column-start: span 2;
        }
        :host(i-body) .col3 input {
            grid-row-start: 1;
        }
        :host(i-body) div[data-action="transfer"] .row > input {
            grid-row-start: 1;
            grid-column-start: 2;
        }
    }
    ${customStyle}
    `
    return layout(style)
}
},{"./supportCSSStyleSheet":41}],37:[function(require,module,exports){
const bel = require('bel')
const styleSheet = require('./supportCSSStyleSheet')
module.exports = header

function header ({count = 1, label, content, ui, theme}) {
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) { 
        var {size, color, bgColor, padding, opacity, marginBottom, 
            badgeSize, badgeColor, badgeBgColor, badgeWeight, 
        } = theme.props
    }
    // UI view
    function layout(style) {
        // create custom html tag element
        const e = document.createElement('i-header')
        const root = e.attachShadow({mode: 'closed'})
        const badge = bel`<span class="badge">${count}</span>`
        const h1 = bel`<h1 aria-label="${label}">${ui === 'help-modal' ? badge : null}${content}</h1>`
        e.dataset.ui = ui
        styleSheet(root, style)
        root.append(h1)
        return e 
    }
    
    const style = `
    :host(i-header) {
        --modal-header-bgColor: ${bgColor ? bgColor : 'var(--color-black)'};
        --modal-header-padding: ${padding ? padding : '0'};
        --opacity: 0;
        display: grid;
        justify-content: center;
        background-color: hsla( var(--modal-header-bgColor), var(--opacity) );
        padding: var(--modal-header-padding);
    }
    :host(i-header) h1 {
        --modal-header-color: ${color ? color : 'var(--primary-color)'};
        --modal-header-size: ${size ? size : 'var(--size22)'};
        color: hsl( var(--modal-header-color) );
        font-size: var(--modal-header-size);
        margin: 0;
    }
    :host(i-header[data-ui="default"]) {
    }
    :host(i-header[data-ui="step-modal"]) {
        --modal-header-bgColor: ${bgColor ? bgColor : 'var(--color-greyF2)'};
        --modal-header-padding: ${padding ? padding : '20px 0'};
        --opacity: ${opacity ? opacity : '1'};
    }
    :host(i-header[data-ui="action-modal"]) {
        margin-bottom: ${marginBottom ? marginBottom : '30px'};
    }
    :host(i-header[data-ui="help-modal"]) {
        margin-bottom: ${marginBottom ? marginBottom : '12px'};
        justify-content: left;
    }
    :host(i-header[data-ui="help-modal"]) h1 {
        --modal-header-size: ${size ? size : 'var(--size16)'};
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 24px auto;
        align-items: center;
    }
    :host(i-header[data-ui="help-modal"]) .badge {
        --badgeSize: ${badgeSize ? badgeSize : 'var(--size14)'};
        --badgeWeight: ${badgeWeight ? badgeWeight : 'var(--weight800)'};
        --badgeColor: ${badgeColor ? badgeColor : 'var(--color-white)'};
        --badgeBgColor: ${badgeBgColor ? badgeBgColor : 'var(--primary-color)'};
        display: flex;
        width: 20px;
        height: 20px;
        font-size: var(--badgeSize);
        font-weight: var(--badgeWeight);
        color: hsl( var(--badgeColor) );
        background-color: hsl( var(--badgeBgColor) );
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }
    ${customStyle}
    `
    return layout(style)
}


},{"./supportCSSStyleSheet":41,"bel":9}],38:[function(require,module,exports){
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
},{}],39:[function(require,module,exports){
const svg = require('datdot-ui-graphic')
function icon ({classname, name}) {
    const el = svg({css: classname ? `icon ${classname}` : 'icon', path: `./svg/${name}.svg`})
    return el
}
module.exports = icon

},{"datdot-ui-graphic":29}],40:[function(require,module,exports){
(function (__filename){(function (){
const styleSheet = require('./supportCSSStyleSheet')
const bel = require('bel')
const file = require('path').basename(__filename)

module.exports = logs

function logs ( protocol ) {
    const sender = protocol ( get )
    const ilog = document.createElement('i-log')
    const root = ilog.attachShadow({mode: 'closed'})
    const title = bel`<h4>Logs</h4>`
    const content = bel`<section class="content">${title}</section>`
    const logList = document.createElement('log-list')
    styleSheet(root, style)
    content.append(logList)
    root.append(content)

    document.addEventListener('DOMContentLoaded', () => {
        logList.scrollTop = logList.scrollHeight
    })

    return ilog

    function get ({page = 'Demo', from, flow, type, body, fn, file, line}) {
        try {
            const f = bel`<span class="flow">${flow} :: </span>`
            var log = bel`
            <aside class="list">
                <span aria-label=${page} class="page">${page}</span>
                <div class="log">
                    <span aria-label="info" class="info">${f} ${from}</span>
                    <span aria-type="${type}" class="type">${type}</span>
                    <span aira-label="message" class="message">${typeof body === 'object' ? JSON.stringify(body) : body}</span>
                    ${fn && bel`<span aria-type="${fn}" class="function">Fn: ${fn}</span>`}
                </div>
                <div class="file">${file} : ${line}</div>
            </aside>
            `
            logList.append(log)
            logList.scrollTop = logList.scrollHeight
            
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => {
                logList.append(log)
            })
            return false
        }
    }
}

const style = `
:host(i-log) {
}
:host(i-log) .content {
    --bgColor: var(--color-dark);
    --opacity: 1;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(40% - 30px);
    height: 100%;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bgColor), var(--opacity));
}
:host(i-log) h4 {
    --bgColor: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bgColor), var(--opacity) );
}
:host(i-log) log-list {
    display: block;
    height: calc(100% - 34px);
    overflow-y: auto;
    margin: 8px;
}
:host(i-log) .list {
    --bgColor: 0, 0%, 30%;
    --opacity: 0.25;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(auto, 60px) auto;
    grid-column-gap: 10px;
    padding: 2px 10px 4px 10px;
    margin-bottom: 4px;
    background-color: hsla( var(--bgColor), var(--opacity) );
    border-radius: 8px;
    transition: background-color 0.6s ease-in-out;
}
:host(i-log) log-list .list:last-child {
    --bgColor: var(--color-verdigris);
    --opacity: 0.5;
}
:host(i-log) .log {
    grid-column-start: 2;
    line-height: 2.2;
    word-break: break-all;
    white-space: pre-wrap;
}
:host(i-log) .info {}
:host(i-log) .type {
    --color: var(--color-greyD9);
    --bgColor: var(--color-black);
    --opacity: 0.25;
    color: hsl( var(--color) );
    background-color: hsla( var(--bgColor), var(--opacity) );
    padding: 2px 10px;
    border-radius: 8px;
}
:host(i-log) log-list .list:last-child .type {
}
:host(i-log) .page {
    --color: var(--color-maximum-blue-green);
    display: grid;
    color: hsl( var(--color) );
    border: 1px solid hsl( var(--color) );
    padding: 2px 4px;
    border-radius: 4px;
    grid-row-start: span 2;
    justify-content: center;
    align-items: center;
}
:host(i-log) .file {
    --color: var(--color-grey70);
    display: grid;
    color: hsl( var(--color) );
    justify-content: right;
}
:host(i-log) log-list .list:last-child .file {
    --color: var(--color-white);
}
:host(i-log) [aria-type="click"] {
    --color: var(--color-black);
    --bgColor: 44, 100%, 55%;
    --opacity: 1;
}
:host(i-log) [aria-type="opened"] {
    --bgColor: var(--color-slate-blue);
    --opacity: 1;
}
:host(i-log) [aria-type="closed"] {
    --bgColor: var(--color-flame);
    --opacity: 1;
}
:host(i-log) log-list .list:last-child [aria-type="ready"] {
    --bgColor: var(--color-deep-black);
    --opacity: 0.3;
}
:host(i-log) .function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
:host(i-log) log-list .list:last-child .function {
    --color: var(--color-white);
}
:host(i-log) [aria-label="demo"] {}
@media (max-width: 960px) {
    :host(i-log) .content {
        top: unset;
        right: unset;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30vh;
        padding-bottom: 10px;
    }
}
`
}).call(this)}).call(this,"/src/node_modules/logs.js")
},{"./supportCSSStyleSheet":41,"bel":9,"path":33}],41:[function(require,module,exports){
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
