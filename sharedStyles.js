const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
    :host {
        --primary-color: #bbb;   /*usage 'var(--primary-color)'*/
        --secondary-color: #444;
    }

    button, div{
        font-family: Verdana, sans-serif;
        font-size: 16px;
    }
`);

export default sharedStyles;
