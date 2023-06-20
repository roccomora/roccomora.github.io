---
layout: page
permalink: /talks/
title: talks
description: 
years: [2022, 2021]
years2: [2023, 2022, 2021, 2020]
nav: true
---

<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">conferences and workshops</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f conference -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>
  
  
<div class="publications">
  <header class="post-header" style="margin-top:1.5cm;">
    <h1 class="post-title">seminars</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>
</div>

  <article>
  <div class="publications">
    {% for y in page.years2 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f seminar -q @*[year={{y}}]* %}
{% endfor %}
</div>
  </article>
