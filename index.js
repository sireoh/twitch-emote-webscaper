const svgs = {
  "download" : `<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" aria-hidden="true" role="presentation"><path d="M2 16v-3h2v3h12v-3h2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm13-9-1.5 1.5L11 6v7H9V6L6.5 8.5 5 7l5-5 5 5z"></path></svg>`,
}

let arr = [];

function createButton(svg, name, id) {
  let str = `
  <div class="Layout-sc-1xcs6mc-0">
      <div class="Layout-sc-1xcs6mc-0">
          <div class="InjectLayout-sc-1i43xsx-0">
              <button class="ScCoreButton-sc-ocjdkq-0 ScCoreButtonPrimary-sc-ocjdkq-1 ljgEdo gmCwLG ${id}">
                  <div class="ScCoreButtonLabel-sc-s7h2b7-0 bQmsUi">
                      <div class="Layout-sc-1xcs6mc-0 iyOCUH">
                          <div class="ScCoreButtonIcon-sc-ypak37-0 evnVIg tw-core-button-icon">
                              <div class="ScFigure-sc-wkgzod-0 fewniq tw-svg" data-a-selector="tw-core-button-icon">
                              ${svg}
                          </div>
                      </div>
                  </div>
                  <div data-a-target="tw-core-button-label-text" class="Layout-sc-1xcs6mc-0 cFsYRp">${name}</div>
              </button>
          </div>
      </div>
  </div>`;
  return str;
}

function setEmoteButton() {
  const inputButtons = document.getElementsByClassName("Layout-sc-1xcs6mc-0 dIcAFo");
  const emoteButton = inputButtons[0].children[0].children[1].children[0];
  emoteButton.addEventListener("click", () => {
    setTimeout(injectMenu, 700);
  });
  return emoteButton;
}

function injectMenu() {
  const bottomBox = document.getElementsByClassName("tw-mg-1 tw-border-t tw-pd-t-1 tw-mg-b-0");
  const id = "a292de5-1a37-4dc9-a34a-8a972b70e583";

  if (bottomBox[0]) {
    const buttonDesc = bottomBox[0].childNodes[0];
    buttonDesc.data = "Click here to webscrape the emotes.";

    const bottomButtons = bottomBox[0].childNodes[1];
    bottomButtons.outerHTML = createButton(svgs.download, "Webscrape", id);
    
    const webcrapeButton = document.getElementsByClassName(id);
    webcrapeButton[0].addEventListener("click", webscrape);
  }
}

function webscrape() {
  const emoteGrid = document.getElementsByClassName("tw-pd-1 tw-border-b tw-c-background-alt tw-align-center");
  console.log(emoteGrid[0]);
}

function setup() {
  console.log(setEmoteButton());
}

setTimeout(setup, 700);