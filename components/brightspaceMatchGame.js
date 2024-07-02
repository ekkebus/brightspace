import { Helper } from "../helper.js";
import sharedStyles from "../sharedStyles.js";

export default class BrightspaceMatchGame extends HTMLElement {
  shadowRoot;
  style = `
  .container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 45%;
  }
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: var(--primary-color);
    transition: all 0.3s;
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
  }
  button:disabled {
    font-weight: bold;
    color: #000;
    background-color: var(--correct-color);
    cursor: not-allowed;
  }
  button.incorrect {
    animation: shake 0.5s;
  }
  button.selected {
    background-color: var(--secondary-color);
    box-shadow: 0 0 5px var(--correct-color);
    color: #ffffff;
  }
  @keyframes shake {
    0%, 100% { 
      transform: translateX(0);
    }
    25% { 
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];
    this.correctMatchCounter = 0;
  }

  static get observedAttributes() {
    return ["data-content"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-content") {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.jsonData = JSON.parse(
      this.getAttribute("data-content") ||
        `{"pairs": [{"left": "Left", "right": "Right"}]}`
    );
    this.applyTemplate();
  }

  applyTemplate() {
    //shuffle the items first
    this.shuffledIndices = this.shuffleArray([
      ...Array(this.jsonData.pairs.length).keys()
    ]);
    this.shadowRoot.innerHTML = this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    let selectedLeft = null;
    let selectedRight = null;

    this.shadowRoot.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;

        if (button.classList.contains("left-item")) {
          if (selectedLeft) selectedLeft.classList.remove("selected");
          selectedLeft = button;
        } else {
          if (selectedRight) selectedRight.classList.remove("selected");
          selectedRight = button;
        }

        button.classList.add("selected");

        if (selectedLeft && selectedRight) {
          this.checkMatch(selectedLeft, selectedRight);
          setTimeout(() => {
            selectedLeft.classList.remove("selected");
            selectedRight.classList.remove("selected");
            selectedLeft = null;
            selectedRight = null;
          }, 500);
        }
      });
    });
  }

  checkMatch(leftButton, rightButton) {
    const leftIndex = parseInt(leftButton.dataset.index);
    const rightIndex = parseInt(rightButton.dataset.index);

    if (leftIndex === rightIndex) {
      //correct match
      this.correctMatchCounter++;
      leftButton.disabled = true;
      rightButton.disabled = true;
      leftButton.textContent += ` ${"✓".repeat(this.correctMatchCounter)}`;
      rightButton.textContent += ` ${"✓".repeat(this.correctMatchCounter)}`;
    } else {
      leftButton.classList.add("incorrect");
      rightButton.classList.add("incorrect");
      setTimeout(() => {
        leftButton.classList.remove("incorrect");
        rightButton.classList.remove("incorrect");
      }, 500);
    }
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  render() {
    return `
      <style>${this.style}</style>
      <div class="container">
        <div class="column left">
          ${this.shuffledIndices
            .map(
              (index) => `
            <button class="left-item" data-index="${index}">${this.jsonData.pairs[index].left}</button>
          `
            )
            .join("")}
        </div>
        <div class="column right">
          ${this.jsonData.pairs
            .map(
              (pair, index) => `
            <button class="right-item" data-index="${index}">${pair.right}</button>
          `
            )
            .join("")}
        </div>
      </div>`;
  }
}
