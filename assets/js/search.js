---
---

let documents = {{ site.posts | jsonify }}
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