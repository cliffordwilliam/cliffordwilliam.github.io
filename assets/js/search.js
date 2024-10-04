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

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');

        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
    }
}

let searchTerm = getQueryVariable('query');
alert(searchTerm)
// alert(idx.search("bright"))