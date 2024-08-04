const svgs = {
  "download" : `<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" aria-hidden="true" role="presentation"><path d="M2 16v-3h2v3h12v-3h2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm13-9-1.5 1.5L11 6v7H9V6L6.5 8.5 5 7l5-5 5 5z"></path></svg>`,
}

let data = {
  "nodes": [],
  "names": [],
  "links": []
};

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

function createMenu(svg, name, id) {
  const str = `
  <div class="tw-mg-1 tw-border-t tw-pd-t-1 tw-mg-b-0">
    ${createButton(svg, name, id)}
  </div>`;
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
    } else {
      console.log("User is subbed.");
    }
}

async function webscrape() {
  const emoteGrid = document.getElementsByClassName("tw-pd-1 tw-border-b tw-c-background-alt tw-align-center");
  for (let i = 0; i < emoteGrid[0].children.length-1; i++) {
    const node = await emoteGrid[0].children[i].getElementsByTagName("img");
    data.nodes.push(node[0]);
  }
  setNames();
  setLinks();
  console.log(data);

  downloadAll();
}

function setNames() {
  console.log("setting names ...");
  for (let i = 0; i < data.nodes.length; i++) {
    data.names.push(data.nodes[i].alt);
  }
}

function setLinks() {
  console.log("setting links ...");
  for (let i = 0; i < data.nodes.length; i++) {
    data.links.push(formatLinks(data.nodes[i].src));
  }
}

function formatLinks(str) {
  return str.replace("1.0", "3.0");
}

function setup() {
  console.log(setEmoteButton());
}

async function download(url, name) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.jpg`; // Assuming images are JPG
    a.style.display = 'none';
    document.body.appendChild(a);

    // Use setTimeout to wait for the element to be added to the document
    setTimeout(() => {
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      console.log(`Downloaded ${name}`);
    }, 100);

  } catch (error) {
    console.error(`Error downloading ${name}: ${error.message}`);
  }
}

async function downloadAll() {
  const { links, names } = data;
    const promises = links.map((link, index) => download(link, names[index]));
    try {
      await Promise.all(promises);
      console.log('All images downloaded!');
    } catch (error) {
      console.error(`Error downloading images: ${error.message}`);
    }
}

setTimeout(setup, 700);