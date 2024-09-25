---
title: "Home"
sub-title: "Welcome!"
thumbnail: "dasdsa"
---

## Introduction

Welcome to my personal website.

Explore my [blog]({% link blog.md %}) or visit the [about]({% link about.md %}) page.

I'm really happy with how this site turned out. I’ve even written a guide on how to build a similar site in my [GitHub Pages and Jekyll post]({% post_url 2024-09-22-test-post %}). [unDraw](https://undraw.co/)

{%- if site.posts.size > 0 -%}
  <h2>{{ page.list_title | default: "Posts" }}</h2>
  <ul>
    {%- for post in site.posts limit:5 -%}
    <li>
      <span>{{ post.date | date: site.date_format }}</span>
      <h3>
        <a href="{{ post.url }}">
          {{ post.title | escape }}
        </a>
      </h3>
      {{ post.excerpt }}
    </li>
    {%- endfor -%}
  </ul>
{%- endif -%}
