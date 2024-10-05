async function initSearch() {
    try {
        const response = await fetch('/search.json');
        const postsObject = await response.json();

        const idx = lunr(function () {
            this.ref('url');
            this.field('title', { boost: 10 });
            this.field('excerpt');
            this.field('author');
            this.field('category');
            this.field('content');

            postsObject.forEach(doc => {
                this.add(doc);
            });
        });

        const input = document.querySelector("#search-input");
        const resultsList = document.querySelector("#search-results");
        input.addEventListener("input", () => {
            const searchValue = input.value;
            resultsList.textContent = "";

            if (searchValue) {
                resultsList.classList.add("open");

                const results = idx.search(searchValue);
                const resultsCount = results.length;

                const resultsCountItem = document.createElement("li");
                resultsCountItem.textContent = `${resultsCount} Result(s) found`;
                resultsCountItem.style.fontWeight = "bold";
                resultsList.appendChild(resultsCountItem);

                results.forEach(result => {
                    const post = postsObject.find(p => p.url === result.ref);
                    const listItem = document.createElement("li");
                    const titleElement = document.createElement("h2");
                    const parElement = document.createElement("p");
                    const link = document.createElement("a");
                    const hrElement = document.createElement("hr");

                    link.href = post.url;
                    link.textContent = post.title;
                    parElement.textContent = post.excerpt;

                    titleElement.appendChild(link);
                    listItem.appendChild(titleElement);
                    listItem.appendChild(parElement);
                    listItem.appendChild(hrElement);
                    resultsList.appendChild(listItem);
                });
            } else {
                resultsList.classList.remove("open");
            }
        });
    } catch (error) {
        console.error('Error fetching search data:', error);
    }
}

initSearch();