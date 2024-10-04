---
title: "Search"
description: "Find posts here."
---

<form id="search-form">
    <input type="text" id="search-input">
</form>

<!-- List where search results will be rendered -->
<ul id="search-results"></ul>

<script>
let documents = {{ site.posts | jsonify }}
</script>
<!-- Import lunr.js from unpkg.com -->
<script src="https://unpkg.com/lunr/lunr.js"></script>

<script src="/assets/js/search.js"></script>
