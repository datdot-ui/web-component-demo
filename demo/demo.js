const modal = require('..')
const bel = require('bel')
const csjs = require('csjs-inject')
const createAccount = require('./node_modules/CreateAccount')

function demoApp() {
    
    const app = bel`<div class="${css.container}">${modal({header: 'Create new account', body: createAccount() })}</div>`
    return app
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
  --sizet14: 1.4rem;
  --size16: 1.6rem;
  --size18: 1.8rem;
  --size20: 2rem;
  --size22: 2.2rem;
  --size24: 2.4rem;
  --size26: 2.6rem;
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
}
`

document.body.append( demoApp() )