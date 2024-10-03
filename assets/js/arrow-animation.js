const arrowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("reset"); // Ensure 'reset' is removed when showing
        } else {
            entry.target.classList.add("reset"); // Add 'reset' to hide the arrow when not in view
            entry.target.classList.remove("show"); // Remove 'show' when it's not visible
        }
    });
});

const arrow = document.getElementById("arrow");
if (arrow) {
    arrowObserver.observe(arrow);
}
