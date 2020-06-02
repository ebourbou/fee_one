const theTheme = document.getElementById("theme");

theTheme.addEventListener("onchange", () => {
    let selection = document.getElementById("theme").value;
    console.log("selection" + selection);
    if (selection === "funky") {
        document.body.classList.toggle("funky-theme");
    }
});