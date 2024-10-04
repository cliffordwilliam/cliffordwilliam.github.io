let documents = [{
    "name": "Lunr",
    "text": "Like Solr, but much smaller, and not as bright."
}, {
    "name": "React",
    "text": "A JavaScript library for building user interfaces."
}, {
    "name": "Lodash",
    "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}]
let idx = lunr(function () {
    this.ref('name')
    this.field('text')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
})
const input = document.querySelector("#search-input");
input.addEventListener("keydown", (event) => {
    const searchValue = event.target.value; // Get the current value from the input
    result = idx.search(searchValue); // Run the search with the input value
    console.log(result);
});