<template>
  <main class="CatalogPage">
    <section class="CatalogPage__hero"></section>

    <section class="CatalogPage__product">
      <div class="Product__categories"></div>

      <div class="Product__items">
        <div class="Product__box" v-for="product in 12" :key="product">
          <div class="Product__image"></div>

          <div class="Product__detail">
            <strong class="Product__name"></strong>
            <div class="Product__rating"></div>
            <span class="Product__prize"></span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  @import "./Home.styles.scss";
</style>
