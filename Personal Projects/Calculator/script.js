// ? Calling and selecting all the calculator elements for use
const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator-keys");
const display = calculator.querySelector(".calculator-screen");


// ? Adding functionality to dynamically adjust the font size of the calculator screen

function adjustFontSize() {
    const maxFontSize = 2.5;
    const minFontSize = 1;
    const length = display.value.length;

    let newSize = maxFontSize - Math.max(0, length - 14) * 0.15;
    // * Ensures the font size does not go below the minimum
    newSize = Math.max(newSize, minFontSize);
    // * Remnant of debugging as it used to not work
    console.log("New font size: ", newSize);

    display.style.fontSize = newSize + "rem";
}

keys.addEventListener("click", event => {
    const { target } = event;
    const { value } = target;


    // * If the clicked element is NOT a button. If true
    if (!target.matches("button")) {
        // * Exit funciton early if the click element is not a button - saves on performance by needlessly executing code
        return;
    }

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
            display.value += ` ${value} `;
            break;
        case "=":
            try {
                display.value = eval(display.value);
            }
            catch {
                display.value = "Error";
            }
            break;
        case "allClear":
            display.value = ``;
            break;
        default:
            display.value += value;
            break;
    }
    // * Adjust font size after every input
    adjustFontSize();
});
