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