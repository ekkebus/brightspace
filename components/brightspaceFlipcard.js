export default class BrightspaceFlipcard extends HTMLElement {
  shadowRoot;
  jsonData;
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

  /* Position the front and back side */
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

  connectedCallback() {
    this.applyTemplate();
  }

  applyTemplate() {
    //get the JSON from the template body
    this.jsonData = JSON.parse(this.children[0].innerHTML.trim());

    //after the data has been loaded, render the HTML
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
    <style>${this.style}</style>
    <div class="container">
        ${this.jsonData.elements
          .map(
            (i) =>
              `<div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">${i.front}</div>
                  <div class="flip-card-back">${i.back}</div>
                </div>
              </div>`
          )
          .join("")}
    </div>
    `;
  }
}
