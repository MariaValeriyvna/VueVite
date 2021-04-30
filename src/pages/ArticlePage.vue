<template>
  <div class="card">
    <router-link to="/">
      <button class="back">BACK</button>
    </router-link>
    <Preloader v-show="articlesLoading" />
    <h2 class="card-title">
      {{ article.title }}
    </h2>
    <p>{{ article.createdAt }}</p>
    <img :src="article.image" alt="image" />
    <p>{{ article.description }}</p>
  </div>
</template>
<style>
.card {
  position: relative;
  padding: 20px 150px;
  text-align: center;
  height: calc(100% - 207.2px);
  font-size: 40px;
  overflow: auto;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  padding: 10px 40px;
  background-color: rgb(212, 212, 80);
  border: 1px solid transparent;
  cursor: pointer;
}
.back:focus,
.back:hover {
  background-color: white;
  border: 1px solid black;
}
.card-title {
  font-size: 55px;
}
</style>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";
import Preloader from "../components/Preloader.vue";

export default {
  data() {
    return {
      article: {},
      articlesLoading: false,
      articlesLoadingFailed: false,
    };
  },
  components: {
    Preloader,
  },
  methods: {
    loadArticle() {
      this.articlesLoading = true;
      this.articlesLoadingFailed = false;
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/posts/${this.$route.params.id}`)
          .then((response) => {
            this.article = response.data;
            console.log(this.article);
          })
          .catch(() => {
            this.articlesLoadingFailed = true;
          })
          .then(() => {
            this.articlesLoading = false;
          });
      }, 500);
    },
  },
  mounted() {
    this.loadArticle();
  },
};
</script>