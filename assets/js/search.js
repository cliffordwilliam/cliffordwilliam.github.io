(function () {
    function showResults(results, store) {
        let searchResults = document.getElementById('search-results');

        if (results.length) { // If there are results...
            let appendString = '';

            for (let i = 0; i < results.length; i++) {  // Iterate over them and generate html
                let item = store[results[i].ref];
                appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
                appendString += '<p>' + item.content.substring(0, 250) + '...</p></li>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function getQuery(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    let searchTerm = getQuery('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        // Initalize lunr.js with the fields to search.
        // The title field is given more weight with the "boost" parameter
        let idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('category');
            this.field('content');

            for (let key in window.store) { // Add the JSON we generated from the site content to Lunr.js.
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'author': window.store[key].author,
                    'category': window.store[key].category,
                    'content': window.store[key].content
                });
            }
        });

        let results = idx.search(searchTerm); // Perform search with Lunr.js
        showResults(results, window.store);
    }
})();