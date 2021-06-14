(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const modal = require('..')
const bel = require('bel')
const csjs = require('csjs-inject')
const { newAccountOpt, runPlanOpt, transferOpt, helpOpt } = require('options')

function demoApp() {
    const recipients = []
    const createNewAccount = modal(newAccountOpt( createAccountProtocol('create-account') ), createAccountProtocol('create-new-account'))
    const runPlan = modal(runPlanOpt( runPlanProtocol('run-plan') ), runPlanProtocol('run-plan') )
    const transfer = modal(transferOpt( transferProtocol('transfer') ), transferProtocol('transfer'))
    const help = modal(helpOpt( helpProtocol('help') ), helpProtocol('help'))
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
        <section>
            <h1>Action modal</h1>
            ${transfer}
        </section>
        <section>
            <h1>Help modal</h1>
            ${help}
        </section>
    </div>
    `

    return app

    function helpProtocol (name) {
        return protocol(name)
    }

    function runPlanProtocol (name) {
        return protocol(name)
    }

    function createAccountProtocol (name) {
        return protocol(name)
    }

    function transferProtocol (name) {
        return protocol(name)
    }

    function protocol (name) {
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
},{"..":32,"bel":8,"csjs-inject":11,"options":6}],2:[function(require,module,exports){
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
        sender({flow: 'create-account', state, body: target })
    }

    function get (msg) {
        console.log(msg);
    }
}

},{"../../src/node_modules/icon":36,"bel":8}],3:[function(require,module,exports){
const bel = require('bel')
const icon = require('../../src/node_modules/icon')

module.exports = help

function help (protocol) {
    const sender = protocol (get)
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
},{"../../src/node_modules/icon":36,"bel":8}],4:[function(require,module,exports){
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
},{"bel":8}],5:[function(require,module,exports){
const bel = require('bel')
module.exports = transfer

function transfer(protocol) {
    const sender = protocol( get )
    const cancelButton = bel`<button class="btn" data-action="cancel" aria-label="Cancel" onclick="${() => handleCancel()}">Cancel</button>`
    const transferButton = bel`<button class="btn" data-action="confirm" aria-label="Transfer" onclick="${() => handleTransfer()}">Transfer</button>`
    const transferElement = bel`
    <div class="form-field" data-action="transfer" aria-label="Transfer">
        <div class="row">
            <label for="from">From</label>
            <div class="info" aria-label="account name">
                <img role="img" class="avatar" aria-label="account avatar" src="data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PG1ldGFkYXRhPjxyZGY6UkRGPjxjYzpXb3JrPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGU+Qm90dHRzPC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPlBhYmxvIFN0YW5sZXk8L2RjOnRpdGxlPjwvY2M6QWdlbnQ+PC9kYzpjcmVhdG9yPjxkYzpzb3VyY2U+aHR0cHM6Ly9ib3R0dHMuY29tLzwvZGM6c291cmNlPjxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9ib3R0dHMuY29tLyIvPjxkYzpjb250cmlidXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPkZsb3JpYW4gS8O2cm5lcjwvZGM6dGl0bGU+PC9jYzpBZ2VudD48L2RjOmNvbnRyaWJ1dG9yPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48cmVjdCBmaWxsPSJ0cmFuc3BhcmVudCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHg9IjAiIHk9IjAiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCA2NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMgMTFIMTFWMzFIMTIuNEMxMC4xNTk4IDMxIDkuMDM5NjkgMzEgOC4xODQwNCAzMS40MzZDNy40MzEzOSAzMS44MTk1IDYuODE5NDcgMzIuNDMxNCA2LjQzNTk3IDMzLjE4NEM2IDM0LjAzOTcgNiAzNS4xNTk4IDYgMzcuNFYzOC42QzYgNDAuODQwMiA2IDQxLjk2MDMgNi40MzU5NyA0Mi44MTZDNi44MTk0NyA0My41Njg2IDcuNDMxMzkgNDQuMTgwNSA4LjE4NDA0IDQ0LjU2NEM5LjAzOTY5IDQ1IDEwLjE1OTggNDUgMTIuNCA0NUgxOFY1NS42QzE4IDU3Ljg0MDIgMTggNTguOTYwMyAxOC40MzYgNTkuODE2QzE4LjgxOTUgNjAuNTY4NiAxOS40MzE0IDYxLjE4MDUgMjAuMTg0IDYxLjU2NEMyMS4wMzk3IDYyIDIyLjE1OTggNjIgMjQuNCA2Mkg0Ny42QzQ5Ljg0MDIgNjIgNTAuOTYwMyA2MiA1MS44MTYgNjEuNTY0QzUyLjU2ODYgNjEuMTgwNSA1My4xODA1IDYwLjU2ODYgNTMuNTY0IDU5LjgxNkM1NCA1OC45NjAzIDU0IDU3Ljg0MDIgNTQgNTUuNlYyMC40QzU0IDE4LjE1OTggNTQgMTcuMDM5NyA1My41NjQgMTYuMTg0QzUzLjE4MDUgMTUuNDMxNCA1Mi41Njg2IDE0LjgxOTUgNTEuODE2IDE0LjQzNkM1MC45NjAzIDE0IDQ5Ljg0MDIgMTQgNDcuNiAxNEgyNC40QzIyLjE1OTggMTQgMjEuMDM5NyAxNCAyMC4xODQgMTQuNDM2QzE5LjQzMTQgMTQuODE5NSAxOC44MTk1IDE1LjQzMTQgMTguNDM2IDE2LjE4NEMxOCAxNy4wMzk3IDE4IDE4LjE1OTggMTggMjAuNFYzMUgxM1YxMVpNMTI2IDM0LjRDMTI2IDMyLjE1OTggMTI2IDMxLjAzOTcgMTI2LjQzNiAzMC4xODRDMTI2LjgxOSAyOS40MzE0IDEyNy40MzEgMjguODE5NSAxMjguMTg0IDI4LjQzNkMxMjkuMDQgMjggMTMwLjE2IDI4IDEzMi40IDI4SDE1NS42QzE1Ny44NCAyOCAxNTguOTYgMjggMTU5LjgxNiAyOC40MzZDMTYwLjU2OSAyOC44MTk1IDE2MS4xODEgMjkuNDMxNCAxNjEuNTY0IDMwLjE4NEMxNjIgMzEuMDM5NyAxNjIgMzIuMTU5OCAxNjIgMzQuNFY0NS42QzE2MiA0Ny44NDAyIDE2MiA0OC45NjAzIDE2MS41NjQgNDkuODE2QzE2MS4xODEgNTAuNTY4NiAxNjAuNTY5IDUxLjE4MDUgMTU5LjgxNiA1MS41NjRDMTU4Ljk2IDUyIDE1Ny44NCA1MiAxNTUuNiA1MkgxMzIuNEMxMzAuMTYgNTIgMTI5LjA0IDUyIDEyOC4xODQgNTEuNTY0QzEyNy40MzEgNTEuMTgwNSAxMjYuODE5IDUwLjU2ODYgMTI2LjQzNiA0OS44MTZDMTI2IDQ4Ljk2MDMgMTI2IDQ3Ljg0MDIgMTI2IDQ1LjZWMzQuNFoiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0ic2lkZXNBbnRlbm5hMDFNYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNiIgeT0iMTEiIHdpZHRoPSIxNTYiIGhlaWdodD0iNTEiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMgMTFIMTFWMzFIMTIuNEMxMC4xNTk4IDMxIDkuMDM5NjkgMzEgOC4xODQwNCAzMS40MzZDNy40MzEzOSAzMS44MTk1IDYuODE5NDcgMzIuNDMxNCA2LjQzNTk3IDMzLjE4NEM2IDM0LjAzOTcgNiAzNS4xNTk4IDYgMzcuNFYzOC42QzYgNDAuODQwMiA2IDQxLjk2MDMgNi40MzU5NyA0Mi44MTZDNi44MTk0NyA0My41Njg2IDcuNDMxMzkgNDQuMTgwNSA4LjE4NDA0IDQ0LjU2NEM5LjAzOTY5IDQ1IDEwLjE1OTggNDUgMTIuNCA0NUgxOFY1NS42QzE4IDU3Ljg0MDIgMTggNTguOTYwMyAxOC40MzYgNTkuODE2QzE4LjgxOTUgNjAuNTY4NiAxOS40MzE0IDYxLjE4MDUgMjAuMTg0IDYxLjU2NEMyMS4wMzk3IDYyIDIyLjE1OTggNjIgMjQuNCA2Mkg0Ny42QzQ5Ljg0MDIgNjIgNTAuOTYwMyA2MiA1MS44MTYgNjEuNTY0QzUyLjU2ODYgNjEuMTgwNSA1My4xODA1IDYwLjU2ODYgNTMuNTY0IDU5LjgxNkM1NCA1OC45NjAzIDU0IDU3Ljg0MDIgNTQgNTUuNlYyMC40QzU0IDE4LjE1OTggNTQgMTcuMDM5NyA1My41NjQgMTYuMTg0QzUzLjE4MDUgMTUuNDMxNCA1Mi41Njg2IDE0LjgxOTUgNTEuODE2IDE0LjQzNkM1MC45NjAzIDE0IDQ5Ljg0MDIgMTQgNDcuNiAxNEgyNC40QzIyLjE1OTggMTQgMjEuMDM5NyAxNCAyMC4xODQgMTQuNDM2QzE5LjQzMTQgMTQuODE5NSAxOC44MTk1IDE1LjQzMTQgMTguNDM2IDE2LjE4NEMxOCAxNy4wMzk3IDE4IDE4LjE1OTggMTggMjAuNFYzMUgxM1YxMVpNMTI2IDM0LjRDMTI2IDMyLjE1OTggMTI2IDMxLjAzOTcgMTI2LjQzNiAzMC4xODRDMTI2LjgxOSAyOS40MzE0IDEyNy40MzEgMjguODE5NSAxMjguMTg0IDI4LjQzNkMxMjkuMDQgMjggMTMwLjE2IDI4IDEzMi40IDI4SDE1NS42QzE1Ny44NCAyOCAxNTguOTYgMjggMTU5LjgxNiAyOC40MzZDMTYwLjU2OSAyOC44MTk1IDE2MS4xODEgMjkuNDMxNCAxNjEuNTY0IDMwLjE4NEMxNjIgMzEuMDM5NyAxNjIgMzIuMTU5OCAxNjIgMzQuNFY0NS42QzE2MiA0Ny44NDAyIDE2MiA0OC45NjAzIDE2MS41NjQgNDkuODE2QzE2MS4xODEgNTAuNTY4NiAxNjAuNTY5IDUxLjE4MDUgMTU5LjgxNiA1MS41NjRDMTU4Ljk2IDUyIDE1Ny44NCA1MiAxNTUuNiA1MkgxMzIuNEMxMzAuMTYgNTIgMTI5LjA0IDUyIDEyOC4xODQgNTEuNTY0QzEyNy40MzEgNTEuMTgwNSAxMjYuODE5IDUwLjU2ODYgMTI2LjQzNiA0OS44MTZDMTI2IDQ4Ljk2MDMgMTI2IDQ3Ljg0MDIgMTI2IDQ1LjZWMzQuNFoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjc2lkZXNBbnRlbm5hMDFNYXNrMCkiPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNzYiIGZpbGw9IiMyOUI2RjYiLz48cmVjdCB5PSIzOCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzOCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjIiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgMTJDMTQuMjA5MSAxMiAxNiAxMC4yMDkxIDE2IDhDMTYgNS43OTA4NiAxNC4yMDkxIDQgMTIgNEM5Ljc5MDg2IDQgOCA1Ljc5MDg2IDggOEM4IDEwLjIwOTEgOS43OTA4NiAxMiAxMiAxMloiIGZpbGw9IiNGRkVBOEYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzIDlDMTQuMTA0NiA5IDE1IDguMTA0NTcgMTUgN0MxNSA1Ljg5NTQzIDE0LjEwNDYgNSAxMyA1QzExLjg5NTQgNSAxMSA1Ljg5NTQzIDExIDdDMTEgOC4xMDQ1NyAxMS44OTU0IDkgMTMgOVoiIGZpbGw9IndoaXRlIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxLCAwKSI+PGcgZmlsdGVyPSJ1cmwoI3RvcEdsb3dpbmdCdWxiMDFGaWx0ZXIwKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAyNEMzMiAxNS4xNjM0IDM5LjE2MzQgOCA0OCA4SDUyQzYwLjgzNjYgOCA2OCAxNS4xNjM0IDY4IDI0VjMyQzY4IDM2LjQxODMgNjQuNDE4MyA0MCA2MCA0MEg0MEMzNS41ODE3IDQwIDMyIDM2LjQxODMgMzIgMzJWMjRaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L2c+PHBhdGggZD0iTTQ5IDExLjVDNTMuOTMxNSAxMS41IDU4LjM2NiAxMy42MjgxIDYxLjQzNTIgMTcuMDE2MiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5LjgyODQgMjlMNDAuODI4NCAyMEwzOCAyMi44Mjg0TDQ4IDMyLjgyODRWNDBINTJWMzIuOTcwNkw2Mi4xNDIxIDIyLjgyODRMNTkuMzEzNyAyMEw1MC4zMTM3IDI5SDQ5LjgyODRaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjgiLz48cmVjdCB4PSIyMiIgeT0iNDAiIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMiIgcng9IjEiIGZpbGw9IiMyOUI2RjYiLz48ZGVmcz48ZmlsdGVyIGlkPSJ0b3BHbG93aW5nQnVsYjAxRmlsdGVyMCIgeD0iMjQiIHk9IjAiIHdpZHRoPSI1MiIgaGVpZ2h0PSI0OCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMC41IDAiLz48ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+PGZlT2Zmc2V0Lz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjUgMCIvPjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QyX2lubmVyU2hhZG93Ii8+PC9maWx0ZXI+PC9kZWZzPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNSwgNDQpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMThDMCA4LjA1ODg4IDguMDU4ODggMCAxOCAwSDExMkMxMjEuOTQxIDAgMTMwIDguMDU4ODggMTMwIDE4VjQ1LjE0ODNDMTMwIDQ5LjY4MzEgMTI5LjIyOSA1NC4xODQ4IDEyNy43MiA1OC40NjExTDExMC4yMzkgMTA3Ljk5MUMxMDcuNjk5IDExNS4xODcgMTAwLjg5NiAxMjAgOTMuMjY0NyAxMjBIMzYuNzM1M0MyOS4xMDM2IDEyMCAyMi4zMDE0IDExNS4xODcgMTkuNzYxNCAxMDcuOTkxTDIuMjgwMzggNTguNDYxMUMwLjc3MTExNyA1NC4xODQ4IDAgNDkuNjgzMSAwIDQ1LjE0ODNMMCAxOFoiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0iZmFjZVNxdWFyZTAzTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMThDMCA4LjA1ODg4IDguMDU4ODggMCAxOCAwSDExMkMxMjEuOTQxIDAgMTMwIDguMDU4ODggMTMwIDE4VjQ1LjE0ODNDMTMwIDQ5LjY4MzEgMTI5LjIyOSA1NC4xODQ4IDEyNy43MiA1OC40NjExTDExMC4yMzkgMTA3Ljk5MUMxMDcuNjk5IDExNS4xODcgMTAwLjg5NiAxMjAgOTMuMjY0NyAxMjBIMzYuNzM1M0MyOS4xMDM2IDEyMCAyMi4zMDE0IDExNS4xODcgMTkuNzYxNCAxMDcuOTkxTDIuMjgwMzggNTguNDYxMUMwLjc3MTExNyA1NC4xODQ4IDAgNDkuNjgzMSAwIDQ1LjE0ODNMMCAxOFoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjZmFjZVNxdWFyZTAzTWFzazApIj48cmVjdCB4PSItMiIgeT0iLTIiIHdpZHRoPSIxMzQiIGhlaWdodD0iMTI0IiBmaWxsPSIjMDM5QkU1Ii8+dW5kZWZpbmVkPC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MiwgMTI0KSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOCAxMC4yMjIyQzE4IDIxLjc4NDUgMjQuNDc0MSAyOCAzOCAyOEM1MS41MTgyIDI4IDU4IDIxLjY2MTUgNTggMTAuMjIyMkM1OCA5LjQ5NjIyIDU3LjE3MzkgOCA1NSA4QzM5LjI3MDcgOCAyOS4xOTE3IDggMjEgOEMxOC45NDkgOCAxOCA5LjM4NDc5IDE4IDEwLjIyMjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjgiLz48bWFzayBpZD0ibW91dGhTbWlsaWUwMk1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIxOCIgeT0iOCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4IDEwLjIyMjJDMTggMjEuNzg0NSAyNC40NzQxIDI4IDM4IDI4QzUxLjUxODIgMjggNTggMjEuNjYxNSA1OCAxMC4yMjIyQzU4IDkuNDk2MjIgNTcuMTczOSA4IDU1IDhDMzkuMjcwNyA4IDI5LjE5MTcgOCAyMSA4QzE4Ljk0OSA4IDE4IDkuMzg0NzkgMTggMTAuMjIyMloiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjbW91dGhTbWlsaWUwMk1hc2swKSI+PHJlY3QgeD0iMzAiIHk9IjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOCwgNzYpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDQ4QzY1LjI1NDggNDggNzYgMzcuMjU0OCA3NiAyNEM3NiAxMC43NDUyIDY1LjI1NDggMCA1MiAwQzM4Ljc0NTIgMCAyOCAxMC43NDUyIDI4IDI0QzI4IDM3LjI1NDggMzguNzQ1MiA0OCA1MiA0OFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTIgNDRDNjMuMDQ1NyA0NCA3MiAzNS4wNDU3IDcyIDI0QzcyIDEyLjk1NDMgNjMuMDQ1NyA0IDUyIDRDNDAuOTU0MyA0IDMyIDEyLjk1NDMgMzIgMjRDMzIgMzUuMDQ1NyA0MC45NTQzIDQ0IDUyIDQ0WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHBhdGggZD0iTTY0LjU3MjYgMTUuODE1M0M2NC44NzQzIDE2LjI3NzkgNjUuNDkzOSAxNi40MDgyIDY1Ljk1NjUgMTYuMTA2NEM2Ni40MTkgMTUuODA0NiA2Ni41NDk0IDE1LjE4NSA2Ni4yNDc2IDE0LjcyMjVMNjQuNTcyNiAxNS44MTUzWk02MS41ODE1IDkuOTU1NDdDNjEuMTI1NiA5LjY0Mzg0IDYwLjUwMzMgOS43NjA4NCA2MC4xOTE3IDEwLjIxNjhDNTkuODggMTAuNjcyOCA1OS45OTcgMTEuMjk1IDYwLjQ1MyAxMS42MDY3TDYxLjU4MTUgOS45NTU0N1pNNTYuMzU2OCA5LjY0MjIyQzU2Ljg4NTQgOS44MDIzNyA1Ny40NDM3IDkuNTAzNzMgNTcuNjAzOSA4Ljk3NTE4QzU3Ljc2NCA4LjQ0NjYzIDU3LjQ2NTQgNy44ODgzMiA1Ni45MzY4IDcuNzI4MTZMNTYuMzU2OCA5LjY0MjIyWk00NS43MjA2IDguMTk3NjlDNDUuMjA3NCA4LjQwMTc5IDQ0Ljk1NjkgOC45ODMyNiA0NS4xNjEgOS40OTY0NUM0NS4zNjUxIDEwLjAwOTYgNDUuOTQ2NSAxMC4yNjAyIDQ2LjQ1OTcgMTAuMDU2MUw0NS43MjA2IDguMTk3NjlaTTQxLjc2MDMgMTMuMDM4OEM0Mi4xNjM4IDEyLjY2MTcgNDIuMTg1MiAxMi4wMjg5IDQxLjgwODEgMTEuNjI1NEM0MS40MzEgMTEuMjIxOSA0MC43OTgxIDExLjIwMDUgNDAuMzk0NyAxMS41Nzc2TDQxLjc2MDMgMTMuMDM4OFpNMzYuNDU2NyAxNy4xMDUyQzM2LjIzMjUgMTcuNjA5OSAzNi40NTk5IDE4LjIwMDggMzYuOTY0NiAxOC40MjVDMzcuNDY5NCAxOC42NDkyIDM4LjA2MDMgMTguNDIxOCAzOC4yODQ1IDE3LjkxNzFMMzYuNDU2NyAxNy4xMDUyWk02Ni4yNDc2IDE0LjcyMjVDNjUuMDIxMiAxMi44NDI3IDYzLjQzMyAxMS4yMjA4IDYxLjU4MTUgOS45NTU0N0w2MC40NTMgMTEuNjA2N0M2Mi4wODc1IDEyLjcyMzggNjMuNDkgMTQuMTU1OSA2NC41NzI2IDE1LjgxNTNMNjYuMjQ3NiAxNC43MjI1Wk01Ni45MzY4IDcuNzI4MTZDNTUuMzczMyA3LjI1NDM4IDUzLjcxNTUgNyA1Mi4wMDAxIDdWOUM1My41MTY5IDkgNTQuOTc5MyA5LjIyNDggNTYuMzU2OCA5LjY0MjIyTDU2LjkzNjggNy43MjgxNlpNNTIuMDAwMSA3QzQ5Ljc4NCA3IDQ3LjY2NDYgNy40MjQ1NiA0NS43MjA2IDguMTk3NjlMNDYuNDU5NyAxMC4wNTYxQzQ4LjE3MjQgOS4zNzQ5NiA1MC4wNDEzIDkgNTIuMDAwMSA5VjdaTTQwLjM5NDcgMTEuNTc3NkMzOC43Mzc4IDEzLjEyNjEgMzcuMzkwNiAxNS4wMDI5IDM2LjQ1NjcgMTcuMTA1MkwzOC4yODQ1IDE3LjkxNzFDMzkuMTA4IDE2LjA2MzMgNDAuMjk2OCAxNC40MDY2IDQxLjc2MDMgMTMuMDM4OEw0MC4zOTQ3IDExLjU3NzZaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjkiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDM0QzU3LjUyMjggMzQgNjIgMjkuNTIyOCA2MiAyNEM2MiAxOC40NzcyIDU3LjUyMjggMTQgNTIgMTRDNDYuNDc3MiAxNCA0MiAxOC40NzcyIDQyIDI0QzQyIDI5LjUyMjggNDYuNDc3MiAzNCA1MiAzNFoiIGZpbGw9IiNDNjA4MEMiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDI4QzU0LjIwOTEgMjggNTYgMjYuMjA5MSA1NiAyNEM1NiAyMS43OTA5IDU0LjIwOTEgMjAgNTIgMjBDNDkuNzkwOSAyMCA0OCAyMS43OTA5IDQ4IDI0QzQ4IDI2LjIwOTEgNDkuNzkwOSAyOCA1MiAyOFoiIGZpbGw9IiNFRTkzMzciLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyIDI1QzUyLjU1MjMgMjUgNTMgMjQuNTUyMyA1MyAyNEM1MyAyMy40NDc3IDUyLjU1MjMgMjMgNTIgMjNDNTEuNDQ3NyAyMyA1MSAyMy40NDc3IDUxIDI0QzUxIDI0LjU1MjMgNTEuNDQ3NyAyNSA1MiAyNVoiIGZpbGw9IiNGNUY5NEYiLz48L2c+PC9zdmc+">
                <span class="account-name">Host</span>
            </div>
        </div>
        <div class="row">
            <label for="to">To</label>
            <div class="col2">
                <img role="img" class="avatar" aria-label="account avatar" src="data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PG1ldGFkYXRhPjxyZGY6UkRGPjxjYzpXb3JrPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGU+Qm90dHRzPC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPlBhYmxvIFN0YW5sZXk8L2RjOnRpdGxlPjwvY2M6QWdlbnQ+PC9kYzpjcmVhdG9yPjxkYzpzb3VyY2U+aHR0cHM6Ly9ib3R0dHMuY29tLzwvZGM6c291cmNlPjxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9ib3R0dHMuY29tLyIvPjxkYzpjb250cmlidXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPkZsb3JpYW4gS8O2cm5lcjwvZGM6dGl0bGU+PC9jYzpBZ2VudD48L2RjOmNvbnRyaWJ1dG9yPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48cmVjdCBmaWxsPSJ0cmFuc3BhcmVudCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHg9IjAiIHk9IjAiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCA2NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuOTgwOSAyMC45MTQxQzE0IDIyLjgzOTMgMTQgMjUuMzU5NSAxNCAzMC40VjQ1LjZDMTQgNTAuNjQwNSAxNCA1My4xNjA3IDE0Ljk4MDkgNTUuMDg1OUMxNS44NDM4IDU2Ljc3OTQgMTcuMjIwNiA1OC4xNTYyIDE4LjkxNDEgNTkuMDE5MUMyMC44MzkzIDYwIDIzLjM1OTUgNjAgMjguNCA2MEgzNS42QzQwLjY0MDUgNjAgNDMuMTYwNyA2MCA0NS4wODU5IDU5LjAxOTFDNDYuNzc5NCA1OC4xNTYyIDQ4LjE1NjIgNTYuNzc5NCA0OS4wMTkxIDU1LjA4NTlDNTAgNTMuMTYwNyA1MCA1MC42NDA1IDUwIDQ1LjZWMzAuNEM1MCAyNS4zNTk1IDUwIDIyLjgzOTMgNDkuMDE5MSAyMC45MTQxQzQ4LjE1NjIgMTkuMjIwNiA0Ni43Nzk0IDE3Ljg0MzggNDUuMDg1OSAxNi45ODA5QzQzLjE2MDcgMTYgNDAuNjQwNSAxNiAzNS42IDE2SDI4LjRDMjMuMzU5NSAxNiAyMC44MzkzIDE2IDE4LjkxNDEgMTYuOTgwOUMxNy4yMjA2IDE3Ljg0MzggMTUuODQzOCAxOS4yMjA2IDE0Ljk4MDkgMjAuOTE0MVpNMTMwLjk4MSAyMC45MTQxQzEzMCAyMi44MzkzIDEzMCAyNS4zNTk1IDEzMCAzMC40VjQ1LjZDMTMwIDUwLjY0MDUgMTMwIDUzLjE2MDcgMTMwLjk4MSA1NS4wODU5QzEzMS44NDQgNTYuNzc5NCAxMzMuMjIxIDU4LjE1NjIgMTM0LjkxNCA1OS4wMTkxQzEzNi44MzkgNjAgMTM5LjM2IDYwIDE0NC40IDYwSDE1MS42QzE1Ni42NCA2MCAxNTkuMTYxIDYwIDE2MS4wODYgNTkuMDE5MUMxNjIuNzc5IDU4LjE1NjIgMTY0LjE1NiA1Ni43Nzk0IDE2NS4wMTkgNTUuMDg1OUMxNjYgNTMuMTYwNyAxNjYgNTAuNjQwNSAxNjYgNDUuNlYzMC40QzE2NiAyNS4zNTk1IDE2NiAyMi44MzkzIDE2NS4wMTkgMjAuOTE0MUMxNjQuMTU2IDE5LjIyMDYgMTYyLjc3OSAxNy44NDM4IDE2MS4wODYgMTYuOTgwOUMxNTkuMTYxIDE2IDE1Ni42NCAxNiAxNTEuNiAxNkgxNDQuNEMxMzkuMzYgMTYgMTM2LjgzOSAxNiAxMzQuOTE0IDE2Ljk4MDlDMTMzLjIyMSAxNy44NDM4IDEzMS44NDQgMTkuMjIwNiAxMzAuOTgxIDIwLjkxNDFaIiBmaWxsPSIjMDA3NkRFIi8+PG1hc2sgaWQ9InNpZGVzU3F1YXJlTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjE0IiB5PSIxNiIgd2lkdGg9IjE1MiIgaGVpZ2h0PSI0NCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC45ODA5IDIwLjkxNDFDMTQgMjIuODM5MyAxNCAyNS4zNTk1IDE0IDMwLjRWNDUuNkMxNCA1MC42NDA1IDE0IDUzLjE2MDcgMTQuOTgwOSA1NS4wODU5QzE1Ljg0MzggNTYuNzc5NCAxNy4yMjA2IDU4LjE1NjIgMTguOTE0MSA1OS4wMTkxQzIwLjgzOTMgNjAgMjMuMzU5NSA2MCAyOC40IDYwSDM1LjZDNDAuNjQwNSA2MCA0My4xNjA3IDYwIDQ1LjA4NTkgNTkuMDE5MUM0Ni43Nzk0IDU4LjE1NjIgNDguMTU2MiA1Ni43Nzk0IDQ5LjAxOTEgNTUuMDg1OUM1MCA1My4xNjA3IDUwIDUwLjY0MDUgNTAgNDUuNlYzMC40QzUwIDI1LjM1OTUgNTAgMjIuODM5MyA0OS4wMTkxIDIwLjkxNDFDNDguMTU2MiAxOS4yMjA2IDQ2Ljc3OTQgMTcuODQzOCA0NS4wODU5IDE2Ljk4MDlDNDMuMTYwNyAxNiA0MC42NDA1IDE2IDM1LjYgMTZIMjguNEMyMy4zNTk1IDE2IDIwLjgzOTMgMTYgMTguOTE0MSAxNi45ODA5QzE3LjIyMDYgMTcuODQzOCAxNS44NDM4IDE5LjIyMDYgMTQuOTgwOSAyMC45MTQxWk0xMzAuOTgxIDIwLjkxNDFDMTMwIDIyLjgzOTMgMTMwIDI1LjM1OTUgMTMwIDMwLjRWNDUuNkMxMzAgNTAuNjQwNSAxMzAgNTMuMTYwNyAxMzAuOTgxIDU1LjA4NTlDMTMxLjg0NCA1Ni43Nzk0IDEzMy4yMjEgNTguMTU2MiAxMzQuOTE0IDU5LjAxOTFDMTM2LjgzOSA2MCAxMzkuMzYgNjAgMTQ0LjQgNjBIMTUxLjZDMTU2LjY0IDYwIDE1OS4xNjEgNjAgMTYxLjA4NiA1OS4wMTkxQzE2Mi43NzkgNTguMTU2MiAxNjQuMTU2IDU2Ljc3OTQgMTY1LjAxOSA1NS4wODU5QzE2NiA1My4xNjA3IDE2NiA1MC42NDA1IDE2NiA0NS42VjMwLjRDMTY2IDI1LjM1OTUgMTY2IDIyLjgzOTMgMTY1LjAxOSAyMC45MTQxQzE2NC4xNTYgMTkuMjIwNiAxNjIuNzc5IDE3Ljg0MzggMTYxLjA4NiAxNi45ODA5QzE1OS4xNjEgMTYgMTU2LjY0IDE2IDE1MS42IDE2SDE0NC40QzEzOS4zNiAxNiAxMzYuODM5IDE2IDEzNC45MTQgMTYuOTgwOUMxMzMuMjIxIDE3Ljg0MzggMTMxLjg0NCAxOS4yMjA2IDEzMC45ODEgMjAuOTE0MVoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjc2lkZXNTcXVhcmVNYXNrMCkiPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNzYiIGZpbGw9IiNGRjcwNDMiLz48cmVjdCB5PSIzOCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzOCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MSwgMCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTAgMTNDMzguOTU0MyAxMyAzMCAyMS45NTQzIDMwIDMzVjM2SDIxQzIwLjQ0NzcgMzYgMjAgMzYuNDQ3NyAyMCAzN1Y1MUMyMCA1MS41NTIzIDIwLjQ0NzcgNTIgMjEgNTJINzlDNzkuNTUyMyA1MiA4MCA1MS41NTIzIDgwIDUxVjM3QzgwIDM2LjQ0NzcgNzkuNTUyMyAzNiA3OSAzNkg3MFYzM0M3MCAyMS45NTQzIDYxLjA0NTcgMTMgNTAgMTNaIiBmaWxsPSIjNTlDNEZGIi8+PG1hc2sgaWQ9InRvcEJ1bGIwMU1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIyMCIgeT0iMTMiIHdpZHRoPSI2MCIgaGVpZ2h0PSIzOSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MCAxM0MzOC45NTQzIDEzIDMwIDIxLjk1NDMgMzAgMzNWMzZIMjFDMjAuNDQ3NyAzNiAyMCAzNi40NDc3IDIwIDM3VjUxQzIwIDUxLjU1MjMgMjAuNDQ3NyA1MiAyMSA1Mkg3OUM3OS41NTIzIDUyIDgwIDUxLjU1MjMgODAgNTFWMzdDODAgMzYuNDQ3NyA3OS41NTIzIDM2IDc5IDM2SDcwVjMzQzcwIDIxLjk1NDMgNjEuMDQ1NyAxMyA1MCAxM1oiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjdG9wQnVsYjAxTWFzazApIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUyIiBmaWxsPSIjRkY3MDQzIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MCAzNkM1Mi4yMDkxIDM2IDU0IDM1LjAyOCA1NCAzMS43MTQzQzU0IDI4LjQwMDYgNTIuMjA5MSAyNCA1MCAyNEM0Ny43OTA5IDI0IDQ2IDI4LjQwMDYgNDYgMzEuNzE0M0M0NiAzNS4wMjggNDcuNzkwOSAzNiA1MCAzNloiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjIwIiB5PSIxMyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIzIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48cGF0aCBkPSJNNTAgMTQuNUM0OS40NDc3IDE0LjUgNDkgMTQuOTQ3NyA0OSAxNS41QzQ5IDE2LjA1MjMgNDkuNDQ3NyAxNi41IDUwIDE2LjVWMTQuNVpNNjEuNjk0MSAyMS42ODc1QzYyLjA2NDkgMjIuMDk2OCA2Mi42OTczIDIyLjEyODEgNjMuMTA2NiAyMS43NTczQzYzLjUxNTkgMjEuMzg2NSA2My41NDcxIDIwLjc1NDEgNjMuMTc2MyAyMC4zNDQ4TDYxLjY5NDEgMjEuNjg3NVpNNjUuNzU5NSAyNC4wNDczQzY1LjUwMzUgMjMuNTU3OSA2NC44OTkzIDIzLjM2ODYgNjQuNDA5OSAyMy42MjQ2QzYzLjkyMDUgMjMuODgwNiA2My43MzEzIDI0LjQ4NDggNjMuOTg3MyAyNC45NzQyTDY1Ljc1OTUgMjQuMDQ3M1pNNjUuNDI0OCAyOC45NTU5QzY1LjU0MDQgMjkuNDk1OSA2Ni4wNzE5IDI5Ljg0IDY2LjYxMTkgMjkuNzI0NEM2Ny4xNTIgMjkuNjA4OCA2Ny40OTYxIDI5LjA3NzMgNjcuMzgwNSAyOC41MzczTDY1LjQyNDggMjguOTU1OVpNNTAgMTYuNUM1NC42Mzc1IDE2LjUgNTguODA2NSAxOC40OTk5IDYxLjY5NDEgMjEuNjg3NUw2My4xNzYzIDIwLjM0NDhDNTkuOTI1NiAxNi43NTYzIDU1LjIyNTYgMTQuNSA1MCAxNC41VjE2LjVaTTYzLjk4NzMgMjQuOTc0MkM2NC42MzU3IDI2LjIxMzkgNjUuMTIzOSAyNy41NTAxIDY1LjQyNDggMjguOTU1OUw2Ny4zODA1IDI4LjUzNzNDNjcuMDQxMSAyNi45NTE4IDY2LjQ5MDQgMjUuNDQ0OCA2NS43NTk1IDI0LjA0NzNMNjMuOTg3MyAyNC45NzQyWiIgZmlsbD0id2hpdGUiLz48L2c+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LCA0NCkiPjxyZWN0IHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIiByeD0iMTgiIGZpbGw9IiMwMDc2REUiLz48bWFzayBpZD0iZmFjZVNxdWFyZTAxTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIj48cmVjdCB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEyMCIgcng9IjE4IiBmaWxsPSJ3aGl0ZSIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2ZhY2VTcXVhcmUwMU1hc2swKSI+PHJlY3QgeD0iLTIiIHk9Ii0yIiB3aWR0aD0iMTM0IiBoZWlnaHQ9IjEyNCIgZmlsbD0iI0Y0NTExRSIvPnVuZGVmaW5lZDwvZz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIsIDEyNCkiPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjM2IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjI0IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjQ4IiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxyZWN0IHg9IjYwIiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOCwgNzYpIj48cmVjdCB5PSI0IiB3aWR0aD0iMTA0IiBoZWlnaHQ9IjQyIiByeD0iNCIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHJlY3QgeD0iMjgiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjOEJEREZGIi8+PHJlY3QgeD0iNjYiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjOEJEREZGIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSA0SDI5TDEyIDQ2SDRMMjEgNFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjwvZz48L3N2Zz4=">
                <input role="input" type="text" aria-label="Transfer to account address" aria-require="true" value="12XV6KZCEwF9D1rsM8aCu21UP3z9t95ZCg">
            </div>
        </div>
        <div class="row">
            <label for="price">$</label>
            <input role="input"  type="number" aria-label="Price" aria-require="true">
        </div>
        <div class="row">
            <label for="fee">Fee</label>
            <div class="fee">0.2</div>
        </div>
        <div class="row">
            <div class="actions" role="action">
                ${cancelButton}${transferButton}
            </div>
        </div>
    </div>
    `

    return transferElement

    function handleCancel () {
        console.log('cancel');
    }
    function handleTransfer () {
        console.log('Transfer');
    }
    function get (msg) {
        console.log( msg );
    }
}
},{"bel":8}],6:[function(require,module,exports){
const createAccount = require('./CreateAccount')
const runPlan = require('./RunPlan')
const transfer = require('./Transfer')
const help = require('./Help')

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
    }
}

const transferOpt = (protocol) => {
    return {
        name: 'transfer',
        header: 'Transfer',
        body: transfer(protocol),
        ui: 'action-modal'
    }
}

const helpOpt = (protocol) => {
    return {
        name: 'help',
        header: 'Plan summary list',
        body: help(protocol),
        ui: 'help-modal',
        theme: {
            // style: `
            // :host(i-modal[data-ui="help-modal"]) .i-modal {
            //     --modal-bgColor: hsl(50, 100%, 50%)
            // }
            // `,
            // props: {
            //     bgColor: 'var(--color-greyE2)'
            // },
            body:{
                // style:  `
                // :host(i-body[data-ui="help-modal"]) {
                //     --modal-body-bgColor: hsl(0, 0%, 100%)
                // }
                // `,
                // props: {
                //     color: 'var(--color-white)',
                //     bgColor: 'var(--color-purple)'
                // }
            }
        }
        
    }
}

module.exports = { newAccountOpt, runPlanOpt, transferOpt, helpOpt }
},{"./CreateAccount":2,"./Help":3,"./RunPlan":4,"./Transfer":5}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./appendChild":7,"hyperx":30}],9:[function(require,module,exports){
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
},{"csjs":14,"insert-css":31}],10:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":13}],11:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":9,"./get-css":10}],12:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":18}],13:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":22}],14:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs();
module.exports.csjs = csjs;
module.exports.noScope = csjs({ noscope: true });
module.exports.getCss = require('./get-css');

},{"./csjs":12,"./get-css":13}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./composition":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./build-exports":16,"./composition":17,"./css-extract-extends":19,"./css-key":20,"./extract-exports":21,"./scopeify":27}],19:[function(require,module,exports){
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

},{"./composition":17}],20:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],21:[function(require,module,exports){
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

},{"./regex":24}],22:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":20}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./regex":24}],26:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":15,"./hash-string":23}],27:[function(require,module,exports){
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

},{"./regex":24,"./replace-animations":25,"./scoped-name":26}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":29}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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
},{"bel":8,"i-body":33,"i-header":34,"i-nocontent":35,"icon":36,"supportCSSStyleSheet":37}],33:[function(require,module,exports){
const styleSheet = require('./supportCSSStyleSheet')
module.exports = body

function body ({label, content, ui, theme}) {
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
        --modal-body-bgColor: ${bgColor ? bgColor : 'transparent'};
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr;
        background-color: var(--modal-body-bgColor);
        align-items: center;
        color: var(--modal-body-color);
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
        grid-template-rows: auto;
        grid-template-columns: 24px auto;
        border: var(--col-border);
        border-radius: var(--col-radius);
        background-color: var(--col-bgColor);
        align-items: center;
        padding: 0 10px;
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
        --col-border: var(--col-border-width) var(--col-border-style) var(--col-border-color);
        --col-radius: var(--primary-input-radius);
        --col-bgColor: ${inputBgColor ? inputBgColor : 'var(--color-white)'};
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr) 50px;
        border: var(--col-border);
        border-radius: var(--col-radius);
        background-color: var(--col-bgColor);
        align-items: center;
    }
    :host(i-body) .col2:focus-within, :host(i-body) .col3:focus-within {
        --focus-color: ${inputFocusColor ? inputFocusColor : 'var(--color-black)'};
        --shaodw-n-offset: 0;
        --shaodw-v-offset: 0;
        --shadow-blur: ${shadowBlur ? shadowBlur : '8px'};
        --shadow-color: ${shadowColor ? shadowColor : 'hsla(0, 0%, 0%, .5)'};
        --shadow: var(--shaodw-n-offset) var(--shaodw-v-offset) var(--shadow-blur) var(--shadow-color);
        border-color: var(--focus-color);
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
        --modal-body-bgColor: ${bgColor ? bgColor : 'transparent' };
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
},{"./supportCSSStyleSheet":37}],34:[function(require,module,exports){
const bel = require('bel')
const styleSheet = require('./supportCSSStyleSheet')
module.exports = header

function header({len = 1, label, content, ui, theme}) {
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) { 
        var {size, color, bgColor, padding, marginBottom, 
            badgeSize, badgeColor, badgeBgColor, badgeWeight, 
        } = theme.props
    }
    // UI view
    function layout(style) {
        // create custom html tag element
        const e = document.createElement('i-header')
        const root = e.attachShadow({mode: 'closed'})
        const badge = bel`<span class="badge">${len}</span>`
        const h1 = bel`<h1 aria-label="${label}">${len > 0 ? badge : null}${content}</h1>`
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
        color: var(--badgeColor);
        background-color: var(--badgeBgColor);
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }
    ${customStyle}
    `
    return layout(style)
}


},{"./supportCSSStyleSheet":37,"bel":8}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
const svg = require('datdot-ui-graphic')
function icon ({classname, name}) {
    const el = svg({css: classname ? `icon ${classname}` : 'icon', path: `./svg/${name}.svg`})
    return el
}
module.exports = icon

},{"datdot-ui-graphic":28}],37:[function(require,module,exports){
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
