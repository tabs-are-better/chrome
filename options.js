function getInputElement() {
	return document.getElementById('characters');
}

function setDoneTimeout() {
	if (window._timer) {
		window.clearTimeout(window._timer);
	}

	window._timer = window.setTimeout(function () {
		getInputElement().className = 'o-input';
	}, 1000);
}

// fetch current value on load
window.addEventListener('load', function () {
	chrome.storage.sync.get('characters', function(settings) {
		if (settings.characters) {
			getInputElement().value = settings.characters;
		}
	});
});

// listen for input changes
getInputElement().addEventListener('input', function (event) {
	event.target.className = 'o-input o-input--loading';

	chrome.storage.sync.set({ 'characters': event.target.value }, function() {
		event.target.className = 'o-input o-input--done';
		setDoneTimeout();
	});
});
