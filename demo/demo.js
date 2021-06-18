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