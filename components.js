//import the components
import brightspaceAccordion from "./components/brightspaceAccordion.js";
import brightspaceFlipcard from "./components/brightspaceFlipcard.js"

//register the components
customElements.define("brightspace-accordion", brightspaceAccordion);
customElements.define("brightspace-flipcard", brightspaceFlipcard);

console.log('Components loaded');