function fadeInPage() {
    if (!window.AnimationEvent) return;
    const fader = document.getElementById('fader');
    if (fader) fader.classList.add('fade-out');
}

document.addEventListener('DOMContentLoaded', function () {
    if (!window.AnimationEvent) return;
    fadeInPage();
    const anchors = document.getElementsByTagName('a');
    for (let idx = 0; idx < anchors.length; idx++) {
        if (
            anchors[idx].hostname !== window.location.hostname ||
            anchors[idx].pathname === window.location.pathname
        ) {
            continue;
        }
        anchors[idx].addEventListener('click', function (event) {
            const fader = document.getElementById('fader');
            if (!fader) return;

            const anchor = event.currentTarget;

            const listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };

            fader.addEventListener('animationend', listener);
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    const fader = document.getElementById('fader');
    if (fader) fader.classList.remove('fade-in');
});
