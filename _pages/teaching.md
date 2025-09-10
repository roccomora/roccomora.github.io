---
layout: page
permalink: /teaching/
title: teaching
description: 
years_montpellier: [2025]
years_stud: [2022, 2021, 2019, 2018]
years_oli: [2016, 2015]
nav: true
nav_order: 3
---

<!-- _pages/teaching.md -->

  <div class="publications">
  <header class="post-header">
    <h1 class="post-title">teaching at Universit&#233; de Montpellier</h1>
  </header>

  <article>

{%- for y in page.years_montpellier %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f teaching_UM -q @*[year={{y}}]* %}
{% endfor %}
  </article>
  
  </div>  
  
<div class="publications">
  <header class="post-header">
    <h1 class="post-title">previous teaching at university</h1>
  </header>

  <article>

{%- for y in page.years_stud %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f teaching_old -q @*[year={{y}}]* %}
{% endfor %}
  </article>
  
  </div>
  
  <div class="publications">
  <header class="post-header">
    <h1 class="post-title">teaching at middle/high school</h1>
  </header>

  <article>

{%- for y in page.years_oli %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f olimat -q @*[year={{y}}]* %}
{% endfor %}
  </article>
  
  </div>
