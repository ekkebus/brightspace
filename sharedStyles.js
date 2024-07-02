const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
    :host {
        --primary-color: #bbb;   /*usage 'var(--primary-color)'*/
        --secondary-color: #444;

        --primary-font-color: #000;
        --secondary-font-color: #555;

        --correct-color: #0F9D58;
        --tryagain-color: #F4B400;
        --incorrect-color: #DB4437;

    }

    button, div{
        font-family: Verdana, sans-serif;
        font-size: 16px;
    }
`);

export default sharedStyles;
