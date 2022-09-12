function webscrapeAll() {
	inputText = document.getElementById("input_text").value;
	pass2 = inputText.replaceAll("w48-h48-c-k-nd", "w512-h512-c-k-nd");
	pass3 = pass2.replaceAll("srcset", "x");
	pass4 = pass3.replaceAll("1.0", "3.0");
	pass5 = pass4.replaceAll("style", "x");
	pass6 = pass5.replaceAll("webp?size=48&amp;quality=lossless", "png");
	pass7 = pass6.replaceAll("gif?size=48&amp;quality=lossless", "gif");
	document.writeln(pass7);
}