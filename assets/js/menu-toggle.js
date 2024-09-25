const burger = document.getElementById('burger');
const cross = document.getElementById('cross');
const nav = document.querySelector('#site-header nav');

function toggleNav() {
    nav.classList.toggle('open');
}

burger.addEventListener('click', toggleNav);
cross.addEventListener('click', toggleNav);
