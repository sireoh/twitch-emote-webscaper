function webscrape() {
    const inputText = document.getElementById("text").value;
    const result = inputText
        .replaceAll("w48-h48-c-k-nd", "w512-h512-c-k-nd")
        .replaceAll("srcset", "x")
        .replaceAll("1.0", "3.0")
        .replaceAll("style", "x")
        .replaceAll(/webp\?size=48&amp;quality=lossless/g, "png")
        .replaceAll(/gif\?size=48&amp;quality=lossless/g, "gif");
	document.getElementById("out").innerHTML = result;
}