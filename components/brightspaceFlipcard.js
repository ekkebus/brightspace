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
    aspect-ratio: 1/1;  /*to make it square*/
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  .flip-card-front {
    background-color: var(--primary-color);
    color: black;
  }
  .flip-card-back {
    background-color:  var(--secondary-color);
    color: white;
    transform: rotateY(180deg);
  }
  .contents{
    padding: 20px 20px 20px 20px;
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
                  )}</div></div>
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
