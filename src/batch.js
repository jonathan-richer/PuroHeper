console.log("Puro helper est en marche ...");

// Acquérir les éléments à modifier.
// Bouton « Créer une expédition »

const createShipment = document.getElementById("ctl00_CPPC_btnCreate");

// Bouton « Traiter l'envoi sélectionné »

const processSingle = document.getElementById("ctl00_CPPC_btnProcessSingle");

// Bouton « Traiter le lot »

const processBatch = document.getElementById("ctl00_CPPC_btnProcessBatch");


/*
 * Modifier le style des élément selon la règle suivante:
 * « Créer une expédition » et « Traiter l'envoi sélectionné » : Arrière-plan    -> Vert fluo   (#57FF47)
 *																 Alignement      -> Gauche
 *																 Couleur du text -> Bleu        (#0000FF)
 *																 Grosseur        -> 750
 * Hover (cherche comment faire)							   : Arrière-plan    -> Vert        (#31D121)
 *
 * Ajouter une confirmation à l'appui de « Traiter le lot ».
 *
 */

// « Créer une expédition » et « Traiter l'envoi sélectionné »

createShipment.style["float"]       = "left";
createShipment.style["background"]  = "#EDA600";
createShipment.style["color"]       = "#098A00";
createShipment.style["font-weight"] = "750";
createShipment.style["font-size"]   = "14px";


if (processSingle !== null) {
	processSingle.style["float"]       = "left";
	processSingle.style["background"]  = "#098A00";
	processSingle.style["color"]       = "#EDA600";
	processSingle.style["font-weight"] = "750";
	processSingle.style["font-size"]   = "14px";
}


// « Traiter le lot » confirmation
if (processBatch !== null) {
	const btn       = document.createElement("button");
	const btnCancel = document.createElement("button");

	processBatch.style["display"] = "none";

	btn.innerText           = "Traiter le lot";
	btn.style["display"]    = "inline-block";
	btn.style["background"] = "#F0F0EE";
	btn.style["border"]     = "none";

	btn.addEventListener("click", e => {
		e.preventDefault();
	    if (confirm("Êtes-vous certain de vouloir traiter le lot?")) {
	    	processBatch.style["display"] = "inline-block";
			btnCancel.style["display"]    = "inline-block";
	    	btn.style["display"]          = "none";
	    }
	});

	btnCancel.innerText           = "Annuler";
	btnCancel.style["display"]    = "none";
	btnCancel.style["background"] = "#000";
	btnCancel.style["color"]      = "#FFF";
	btnCancel.style["font-size"]  = "14px";
	btnCancel.style["border"]     = "none";
	btnCancel.style["padding"]    = "5px";

	btnCancel.addEventListener("click", e => {
		e.preventDefault();
		processBatch.style["display"] = "none";
		btnCancel.style["display"]    = "none";
		btn.style["display"]          = "inline-block";
	});

	processBatch.parentElement.appendChild(btn);
	processBatch.parentElement.appendChild(btnCancel);
}


/*
 * Cacher les trucs inutiles.
 */

const batchName = document.getElementById("ctl00_CPPC_lblBatchContent").innerText;
const lblTitle  = document.getElementById("ctl00_CPPC_lblTitle");
let date = "";

let firstQuote = false;
for (let i = 0; i < batchName.length; i++) {
	if (!firstQuote) {
		if (batchName[i] === "\"") {
			firstQuote = true;
		}
	} else {
		if (batchName[i] === "\"") {
			break;
		} else {
			date += batchName[i];
		}
	}
}
lblTitle.innerText += `: "${date}"`;

let hidden     = false;
const hideBtn  = document.createElement("button");
const elements = [
	document.getElementById("ctl00_CPPC_lblInst").parentElement,
	document.getElementById("ctl00_CPPC_lblInst2").parentElement,
	document.getElementById("ctl00_CPPC_lblBatchCreated").parentElement.parentElement.parentElement,
	document.getElementById("ctl00_CPPC_ServiceDateRow")
];

hideBtn.addEventListener("click", e => {
	e.preventDefault();
	hidden = !hidden;
	for (const e of elements) {
		e.style["display"] = hidden ? "none" : "block";
	}
});
hideBtn.innerText           = "Afficher / Cacher";
hideBtn.style["display"]    = "inline-block";
hideBtn.style["background"] = "purple";
hideBtn.style["color"]      = "white";
hideBtn.style["float"]      = "right";

lblTitle.parentElement.style["width"] = "100%";
lblTitle.parentElement.appendChild(hideBtn);

hideBtn.click();





const actions = {
	ADD: "M3JqOHRlaGo5NnU3b29hZjluczVtNw==",
	FLUSH: "YjZ4Z2huNGViM3BlMzVycGc3MG82dA==",
	GET: "MmJvcmRqc3k5aHNzaDFkd3VvM2JsbQ==",
	ACTION3: "amtleWV0ajNwamZxdHhic2NqYTI0",
	ACTION4: "dnN1ZzgwMnBsb2t2dTJ1ZWwwZGNn",
	ACTION5: "eTlnYmQzd2tjMzd6ajJ4ODF6cW1w",
	ACTION6: "ZHF6bDJsZGE4bDdnb3Q1bm94c2oyNw==",
	ACTION7: "ZXBzNXAzeWVtYm9jbXFuNXVzZWtkdg==",
	ACTION8: "OTJrZDFldzZ0cjRsb2d2amFybDNhbQ==",
	ACTION9: "YzdoemJybGhtcWdkbjM1aTJ5aWduOA=="
};



const shipments = document.querySelectorAll("[name=\"rdoSelection\"]");
for (let i = 0; i < shipments.length; i++) console.log(shipments[i].value);

chrome.runtime.sendMessage({ action: actions.GET }, msg => console.log(msg));
