
function stuurBericht() {
    let invoer = document.getElementById("user-input");
    let tekst = invoer.value;

    if (tekst === "") {
        return;
    }

    let lijst = document.getElementById("chat-list");
    let nieuwItem = document.createElement("li");
    nieuwItem.textContent = "👤 " + tekst;
    lijst.appendChild(nieuwItem);
    invoer.value = "";

    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "phi3",
            prompt: tekst,
            stream: false
        })
    })
        .then(function (antwoord) {
            return antwoord.json();
        })
        .then(function (data) {

            let antwoordItem = document.createElement("li");
            antwoordItem.textContent = "🤖 " + data.response;
            lijst.appendChild(antwoordItem);
        })
        .catch(function (fout) {
            let foutItem = document.createElement("li");
            foutItem.textContent = "❌ Fout bij verbinden met de server";
            lijst.appendChild(foutItem);
        });
}


let knop = document.getElementById("send-button");
knop.addEventListener("click", stuurBericht);


let invoerVeld = document.getElementById("user-input");
invoerVeld.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        stuurBericht();
    }
});
