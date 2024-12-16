---
layout: page
permalink: /publications/
title: publications
description:
yearsPeer: [2024, 2023, 2022, 2021]
yearsPre: [2024]
yearsOther: [2023]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->

<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">peer-reviewed publications</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.yearsPeer %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>

<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">preprints</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.yearsPre %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>
  
  
<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">other</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.yearsOther %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f phd -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>
  
