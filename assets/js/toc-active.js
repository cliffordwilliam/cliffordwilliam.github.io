window.addEventListener('DOMContentLoaded', () => {

    const postBody = document.getElementById('post-body');
    if (!postBody) return;

    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                tocContainer.querySelector(`a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                tocContainer.querySelector(`a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });
    
    // Track all h2 that have an `id` applied in post body
    postBody.querySelectorAll('h2[id]').forEach((section) => {
        observer.observe(section);
    });
});