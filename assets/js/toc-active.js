window.addEventListener('DOMContentLoaded', () => {
    const postBody = document.getElementById('post-body');
    if (!postBody) return;

    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const observer = new IntersectionObserver(entries => {
        let foundActive = false;

        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const tocLink = tocContainer.querySelector(`a[href="#${id}"]`).parentElement;

            if (entry.intersectionRatio > 0) {
                // If an element is in view and we haven't found an active one yet
                if (!foundActive) {
                    // Remove active class from any currently active item
                    tocContainer.querySelectorAll('li.active').forEach(activeItem => {
                        activeItem.classList.remove('active');
                    });
                    // Set active class to the current item
                    tocLink.classList.add('active');
                    foundActive = true; // Mark that we've set an active item
                }
            }
        });
    });
    
    // Observe all h2 elements with an id in post body
    postBody.querySelectorAll('h2[id]').forEach(section => {
        observer.observe(section);
    });
});
