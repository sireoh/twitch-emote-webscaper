const subButton = document.querySelector('.kITeBB');
subButton.addEventListener('click', function() {
    console.log("Sub button has been clicked.");
    setTimeout(changeMenu, 800);
});

function changeMenu() {
    //Debug
    console.log("Changing menu ...");

    //Show All Button, Click Expand Once
    const temp = document.querySelectorAll('.jNkQyB');
    const showAllButton = temp;

    showAllButton.forEach(e => {
        e.click();
    });

    //Change Description
    const webscrapeDescription = document.querySelector('.faZJrF');
    webscrapeDescription.innerHTML = `
        <p class="CoreText-sc-1txzju1-0 kTxYoY">eo's twitch webscraper:</p>
    `;
     
    //Add Button
    const webscrapeButton = document.querySelector('.fKknXG');
    webscrapeButton.innerHTML = `
        <button style="background:white; color:black; padding:1rem; border-radius:1rem; display:flex" id="webscrapeButton" style="cursor=pointer;">
            <svg width="20" height="20" viewBox="0 0 20 20" focusable="false" aria-hidden="true" role="presentation">
                <path d="M2 16v-3h2v3h12v-3h2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm13-9-1.5 1.5L11 6v7H9V6L6.5 8.5 5 7l5-5 5 5z"></path>
            </svg>
            &nbsp;Webscrape
        </button>
    `;
    webscrapeButton.addEventListener("click", webscrape);
}

function webscrape() {
    let data = {
        links : [],
        names : []
    };
    const emotesArr = document.querySelectorAll('.jpIOLU');
    emotesArr.forEach(e => {
        let imgDiv = e.getElementsByTagName('img')[0];
        let imgLg = imgDiv.src.split('/dark/')[0] + "/dark/3.0";

        //Name and Link
        data.names.push(imgDiv.alt);
        data.links.push(imgLg);
    });
    console.log(data);
    downloadAllImages(data);
}

// Function to download an image from URL and save it
async function downloadImage(url, name) {
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
  
  // Download all images
  async function downloadAllImages(data) {
    const { links, names } = data;
    const promises = links.map((link, index) => downloadImage(link, names[index]));
    try {
      await Promise.all(promises);
      console.log('All images downloaded!');
    } catch (error) {
      console.error(`Error downloading images: ${error.message}`);
    }
  }