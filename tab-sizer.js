function injectTabSize(size) {
    var css = ['-webkit-', '-moz-', '-ms-', '-o-', '', '']
        .join('tab-size: ' + (size || 4) + ';');

    var style = document.createElement('style');
        style.type = 'text/css';
        style.className = 'chose-own-tab-size';
        style.appendChild(document.createTextNode('* {' + css + '}'));

    document.head.appendChild(style);
}

function clearInjections() {
    var injections = document.getElementsByClassName('chose-own-tab-size');

    for (var node in injections) {
        if (injections[node].parentNode) {
            injections[node].parentNode.removeChild(injections[node]);
        }
    }
}

// listen to live changes
chrome.storage.onChanged.addListener(function (settings) {
    clearInjections();
    injectTabSize(settings.characters.newValue);
});

// let's fetch the current value
chrome.storage.sync.get('characters', function(settings) {
    clearInjections();
    injectTabSize(settings.characters);
});
