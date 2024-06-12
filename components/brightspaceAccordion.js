export default class BrightspaceAccordion extends HTMLElement {
  shadowRoot;
  jsonData = `
  { "groupName": "accountabilities", 
    "elements": [ 
      { "name": "item1", "label": "Label 1", "content": "Content 1" },
      { "name": "item2", "label": "Label 2", "content": "Content 2" }
   ] }`;
  style = `
  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
  }

  .accordion.active,.accordion:hover {
    background-color: #ccc;
  }

.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}

.active {
  display: block;
}

button.accordion:after {
  content: "+";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}`;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.applyTemplate();
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

  applyTemplate() {
    //connect the button events to this
    this.openAccordion = this.openAccordion.bind(this);
    //add event listner
    this.shadowRoot.addEventListener("click", this.openAccordion);

    //after the data has been loaded, render the HTML
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
    <style>${this.style}</style>
    <div class="${this.jsonData.groupName}">
        ${this.jsonData.elements
          .map(
            (i) =>
              `<button class="accordion ${this.jsonData.groupName}" data-tab-id="${i.id}" >${i.label}</button>
                <div class="panel ${i.id}">${i.content}</div>`
          )
          .join("")}
    </div>
    `;
  }

  openAccordion(evt) {
    //const tabName = evt.target.getAttribute("data-tab-id");
    //TODO check if class is empty
    [...this.shadowRoot.querySelectorAll(".accordion")].forEach((e) => {
      e.classList.remove("active");
    });

    //hide all accordion panels
    [...this.shadowRoot.querySelectorAll(".panel")].forEach((e) => {
      e.classList.remove("active");
    });

    //show the selected accordion panel
    evt.target.nextElementSibling.classList.toggle("active");
  }
}
