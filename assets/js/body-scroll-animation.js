const bodyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    })
});

const body = document.querySelector("body");
body.classList.add("hidden");
bodyObserver.observe(body);
