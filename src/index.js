const bel = require('bel')
const iheader = require('i-header')
const ibody = require('i-body')
const nocontent = require('i-nocontent')
const styleSheet = require('supportCSSStyleSheet')

// const myElement = require('test')
module.exports = component

function component({header, body = nocontent(), name = 'modal'}) {
    const modal = document.createElement('i-modal')
    const root = modal.attachShadow({mode: 'closed'})
    const el = bel`
    <div class="i-modal" arial-label="i-modal" tabindex="0">
        ${iheader({label: 'create new account', content: header})}
        ${ibody({label: 'modal body', content: body === '' ? nocontent() : body })}
    </div>`
    styleSheet(root, style)
    root.append(el)
    return modal
}

const style = `
:host(i-modal) {
    --modal-margin-top: 4px;
    display: grid;
    margin-top: var(--modal-margin-top);
}
:host(i-modal) .i-modal:focus, :host .i-modal:focus-within {
    --outline-border-width: 4px; 
    --outline-style: ridge;
    --outline-color: var(--color-greyE2);
    outline: var(--outline-border-width) var(--outline-style) var(--outline-color);
}
`