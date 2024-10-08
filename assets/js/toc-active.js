window.addEventListener('DOMContentLoaded', () => {
    const postBody = document.getElementById('post-body');
    if (!postBody) return;

    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const activeHeaders = []; // Array to maintain active h2 elements

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const tocLink = tocContainer.querySelector(`a[href="#${id}"]`).parentElement;

            if (entry.boundingClientRect.top <= 0) {
                // If the h2 is at or above the top of the viewport, add to activeHeaders
                if (!activeHeaders.includes(tocLink)) {
                    activeHeaders.push(tocLink);

                    // If we just added a header, update the active class
                    updateActiveClass();
                }
            } else {
                // If the h2 is below the top of the viewport, remove it from activeHeaders
                const index = activeHeaders.indexOf(tocLink);
                if (index !== -1) {
                    activeHeaders.splice(index, 1);
                    
                    // If we just removed a header, update the active class
                    updateActiveClass();
                }
            }
        });
    });

    // Function to update the active class
    function updateActiveClass() {
        // Remove active class from all items
        tocContainer.querySelectorAll('li.active').forEach(activeItem => {
            activeItem.classList.remove('active');
        });
        
        // Add active class to the first item in activeHeaders if it exists
        if (activeHeaders.length > 0) {
            activeHeaders[0].classList.add('active');
        }
    }

    // Observe all h2 elements with an id in the post body
    postBody.querySelectorAll('h2[id]').forEach(section => {
        observer.observe(section);
    });
});
