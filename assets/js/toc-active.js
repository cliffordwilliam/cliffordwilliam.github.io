window.addEventListener('DOMContentLoaded', () => {
    const postBody = document.getElementById('post-body');
    if (!postBody) return;

    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const observer = new IntersectionObserver(entries => {
        // Check if at least one entry is intersecting
        const hasIntersecting = entries.some(entry => entry.isIntersecting);

        if (hasIntersecting) {
            // Remove active class from all items
            tocContainer.querySelectorAll('li.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });

            // Iterate through entries to find the first intersecting one
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const tocLink = tocContainer.querySelector(`a[href="#${id}"]`).parentElement;

                    // Set active class to the current item
                    tocLink.classList.add('active');
                    break; // Exit the loop after setting the active class for the first intersecting item
                }
            }
        }
    });

    // Observe all h2 elements with an id in the post body
    postBody.querySelectorAll('h2[id]').forEach(section => {
        observer.observe(section);
    });
});
