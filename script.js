function checkText() {
     const inputArea = document.getElementById("Inputarea");
     const result = document.getElementById("result");

     const suspicious = [
                { char: "\u202F", name: "Schmales geschütztes Leerzeichen" },
                { char: "\u200B", name: "Zero Width Space" },
                { char: "\u2060", name: "Word Joiner" },
                { char: "\u00A0", name: "Geschütztes Leerzeichen" },
                { char: "\u200C", name: "Zero Width Non-Joiner" },
                { char: "\u200D", name: "Zero Width Joiner" },
                { char: "\u2061", name: "Function Application" },
                { char: "\u2062", name: "Invisible Times" },
                { char: "\u2063", name: "Invisible Separator" },
                { char: "\u2064", name: "Invisible Plus" },
                { char: "\uFEFF", name: "Zero Width No-Break Space (BOM)" },
                { char: "\u200E", name: "Left-to-Right Mark" },
                { char: "\u200F", name: "Right-to-Left Mark" },
                { char: "\u202A", name: "Left-to-Right Embedding" },
                { char: "\u202B", name: "Right-to-Left Embedding" },
                { char: "\u202C", name: "Pop Directional Formatting" },
                { char: "\u202D", name: "Left-to-Right Override" },
                { char: "\u202E", name: "Right-to-Left Override" },
                { char: "\u2066", name: "Left-to-Right Isolate" },
                { char: "\u2067", name: "Right-to-Left Isolate" },
                { char: "\u2068", name: "First Strong Isolate" },
                { char: "\u2069", name: "Pop Directional Isolate" },
                { char: "\u034F", name: "Combining Grapheme Joiner" },
                { char: "\u061C", name: "Arabic Letter Mark" },
                { char: "\u180E", name: "Mongolian Vowel Separator" }
            ];

            if(inputArea.value.trim() === ""){
                result.innerText = "Bitte zuerst einen Text eingeben"
            }
            else {
                const text = inputArea.value;
                const treffer = [];

                suspicious.forEach(entry => {
                    let index = text.indexOf(entry.char);
                    while(index !== -1){
                        const start = Math.max(0, index - 15);
                        const end = Math.min(text.length, index + 15);
                        const ausschnitt = text.slice(start, end).replace(/\s+/g, " ").trim();

                        treffer.push(`"${ausschnitt}" (${entry.name})`);
                        index = text.indexOf(entry.char, index + 1);
                    }
                });

                if(treffer.length > 0){
                    result.innerText = "Dieser Text wirkt KI-generiert. Auffällige Stelle" + (treffer.length > 1 ? "n" : "") + ":\n" + treffer.join("\n");
                }
                else{
                    result.innerText = "Dieser Text wirkt von einem Menschen geschrieben"
                }
            }
}

document.getElementById("Inputarea").addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.ctrlKey) {
        checkText();
    }
});