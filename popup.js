window.onload = () => {
	const darkModeBtn = document.getElementById('dark-mode');
	const darkModeTxt = document.getElementById('dark-mode-txt');
	const textToSpeechBtn = document.getElementById('text-to-speech');
	const autoCloseBtn = document.getElementById("closeInactiveTabs");
	const decreaseFontBtn=document.getElementById("decrease-font-size");
	const increaseFontBtn=document.getElementById("increase-font-size");



	//To change between dark mode and light mode
	chrome.storage.sync.get('dark', (e) => {
		let isToggleOn = e.dark || false;
		darkModeTxt.textContent = isToggleOn ? 'ON' : 'OFF';

		darkModeBtn.addEventListener('click', () => {
			isToggleOn = !isToggleOn;
			darkModeTxt.textContent = isToggleOn ? 'ON' : 'OFF';
			if (isToggleOn) {
				chrome.tabs.executeScript({
					file: 'darkModeOn.js'
				});
			} else {
				chrome.tabs.executeScript({
					file: 'darkModeOff.js'
				});
			}
			chrome.storage.sync.set({ dark: isToggleOn });

			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, { action: 'pageToSpeech' });
			});
		});
	});


	increaseFontBtn.addEventListener('click', () => {
		
			chrome.tabs.executeScript({
				file: 'increaseFont.js'
			});
		
});

decreaseFontBtn.addEventListener('click', () => {
		
	chrome.tabs.executeScript({
		file: 'decreaseFont.js'
	});

});


	

	// Text to speech 
	textToSpeechBtn.addEventListener('click',()=>{
		console.log("speech button clicked")
		chrome.tabs.executeScript({
			code: "window.getSelection().toString();"
			}, function(selection) {
			// speak the selected text
			speak(selection[0]);
			});
	})
	



	function speak(text) {
	  // create a new SpeechSynthesisUtterance object
	  const utterance = new SpeechSynthesisUtterance(text);
	  
	  // set some properties for the utterance object
	  utterance.lang = 'en-US'; // set the language
	  utterance.rate = 1; // set the speaking rate
	  utterance.pitch = 1; // set the speaking pitch
	  
	  // speak the text
	  speechSynthesis.speak(utterance);
	}

	// autoCloseBtn.addEventListener("click", function() {
	// 	// Send a message to the content script to close inactive tabs
	// 	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	// 	  chrome.tabs.sendMessage(tabs[0].id, "closeInactiveTabs");
	// 	});
	//   });



  
  


	
			


};
