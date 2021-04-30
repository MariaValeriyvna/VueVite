<template>
  <div id="page" class="page">
    <header class="page-header">
      <h1 class="title">My Blog</h1>
    </header>
    <router-view />
    <footer class="page-footer">
      <h1 class="title">My blog</h1>
    </footer>
  </div>
</template>

<style>
.page {
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
}
.page-header {
  margin: 0 auto;
  padding: 20px 0;
  background-color: rgb(212, 212, 80);
  text-align: center;
}
.title {
  font-family: "Yesteryear";
  font-size: 50px;
  letter-spacing: 10px;
}
.page-footer {
  margin: 0 auto;
  padding: 5px 0;
  background: rgb(63, 56, 56);
  color: rgb(212, 212, 80);
  text-align: center;;
  position: sticky;
  bottom: 0;
}
</style>

<script>
import MainPage from "./pages/MainPage.vue";
export default {
  components: {
    MainPage,
  },
};
</script>

<style>
</style>
