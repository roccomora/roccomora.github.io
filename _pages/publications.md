---
layout: page
permalink: /publications/
title: publications
description:
yearsJournals: [2025, 2024, 2023]
yearsConf: [2025, 2023, 2021]
yearsPre: [2025]
yearsOther: [2023]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->

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
  {% bibliography -f preprints -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>
  
<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">journals</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.yearsJournals %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journals -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>

<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">conference proceedings</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.yearsConf %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f proceedings -q @*[year={{y}}]* %}
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
  
