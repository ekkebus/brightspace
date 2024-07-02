//import the components
import brightspaceAccordion from "./components/brightspaceAccordion.js";
import brightspaceFlipcard from "./components/brightspaceFlipcard.js";
import brightspaceMatchGame from "./components/brightspaceMatchGame.js";

//register the components
customElements.define("brightspace-accordion", brightspaceAccordion);
customElements.define("brightspace-flipcard", brightspaceFlipcard);
customElements.define("brightspace-matchgame", brightspaceMatchGame);

console.log("Components loaded");
