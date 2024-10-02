const bodyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    })
});

const pageH1 = document.querySelector("#h1");
if (pageH1) {
    pageH1.classList.add("hidden");
    bodyObserver.observe(pageH1);
}
