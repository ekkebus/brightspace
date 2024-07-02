import { Helper } from "../helper.js";
import sharedStyles from '../sharedStyles.js';

export default class BrightspaceFlipcard extends HTMLElement {
  shadowRoot;
  jsonData = `
  { "cards":  [ { "front": "Card 1", "back": "Back 1" },
                { "front": "Card 2", "back": "Back 2" }
              ]}`;
  style = `
  .container{
    display:flex;
    justify-content: space-evenly;
    border:0px;
  }
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    aspect-ratio: 1/1;                    /*to make it square*/
    -webkit-backface-visibility: hidden;  /* Safari */
    backface-visibility: hidden;
  }
  .flip-card-front {
    background-color: var(--primary-color);
  }
  .flip-card-back {
    background-color:  var(--secondary-color);
    color: white;
    transform: rotateY(180deg);
  }
  .contents{
    padding: 20px 20px 20px 20px;
  }

  .turn-symbol {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background: url('data:image/svg+xml,<svg fill="%23000000"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 214.367 214.367" xml:space="preserve"><path d="M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0S202.403,42.716,202.403,95.22z"/></svg>') no-repeat center center;
    background-size: contain;
  }
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];
  }

  static get observedAttributes() {
    return ["data-content"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-content") {
      this.jsonData = JSON.parse(newValue);
      this.render();
    }
  }

  connectedCallback() {
    this.applyTemplate();
  }

  applyTemplate() {
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
    <style>${this.style}</style>
    <div class="container">
        ${this.jsonData.cards
          .map(
            (i) =>
              `<div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front"><div class="contents">${Helper.replaceTagsWithHtml(
                    i.front
                  )}</div>
                  <div class="turn-symbol"></div>
                  </div>
                  <div class="flip-card-back"><div class="contents">${Helper.replaceTagsWithHtml(
                    i.back
                  )}</div></div>
                </div>
                
              </div>`
          )
          .join("")}
    </div>`;
  }
}
