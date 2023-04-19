(() => {    
const elements = document.querySelectorAll("*");

// Loop through each element and increase the font size by 2px
elements.forEach((element) => {
  const currentFontSize = window.getComputedStyle(element).getPropertyValue("font-size");
  const newFontSize = parseInt(currentFontSize) + 1;
  element.style.fontSize = `${newFontSize}px`;
});
	
})();