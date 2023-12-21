---
layout: page
permalink: /teaching/
title: teaching
description: 
years: [2022, 2021, 2019, 2018]
years2: [2016, 2015]
nav: true
nav_order: 5
---

<!-- _pages/teaching.md -->
<div class="publications">
  <header class="post-header">
    <h1 class="post-title">at university</h1>
  </header>

  <article>

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f teaching -q @*[year={{y}}]* %}
{% endfor %}
  </article>
  
  </div>
  
  <div class="publications">
  <header class="post-header">
    <h1 class="post-title">at middle/high school</h1>
  </header>

  <article>

{%- for y in page.years2 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f olimat -q @*[year={{y}}]* %}
{% endfor %}
  </article>
  
  </div>
