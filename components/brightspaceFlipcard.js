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
  }
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    border: 1px solid #f1f1f1;
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
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: #bbb;
    color: black;
  }

  .flip-card-back {
    background-color:  #444;
    color: white;
    transform: rotateY(180deg);
  }`;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
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
                  <div class="flip-card-front"><p>${i.front}</p></div>
                  <div class="flip-card-back"><p>${i.back}</p></div>
                </div>
              </div>`
          )
          .join("")}
    </div>`;
  }
}
