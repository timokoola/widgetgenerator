let topColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-top"
);
let bottomColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-bottom"
);
document.getElementById("color1").value = topColor;
document.getElementById("color2").value = bottomColor;

document.getElementById("color1").addEventListener("change", (e) => {
  let newVal = document.getElementById("color1").value;

  document.documentElement.style.setProperty("--color-top", newVal);
});

document.getElementById("color2").addEventListener("change", (e) => {
  let newVal = document.getElementById("color2").value;

  document.documentElement.style.setProperty("--color-bottom", newVal);
});

document.getElementById("generator").addEventListener("click", (e) => {
  e.preventDefault();
  let topColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-top"
  );
  let bottomColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-bottom"
  );

  let template = `
    // Base parts are from the Scriptable example "random Scriptable API"
    let widget = await createWidget(items);
    if (config.runsInWidget) {
      // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
      Script.setWidget(widget);
    } else {
      // The script runs inside the app, so we preview the widget.
      widget.presentMedium();
    }
    // Calling Script.complete() signals to Scriptable that the script have finished running.
    // This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
    Script.complete();

    // modeled after the example
async function createWidget(stops) {
  // API seems to return a bad url for stop time tables

  let widget = new ListWidget();
  // Add background gradient
  let gradient = new LinearGradient();
  gradient.locations = [0, 1];
    gradient.colors = [new Color("${topColor}"), new Color("${bottomColor}")]
  widget.backgroundGradient = gradient`;

  navigator.clipboard.writeText(template);
});
