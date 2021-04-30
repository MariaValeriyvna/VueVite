<template>
  <ul class="articles">
    <Preloader v-show="articlesLoading" />
    <ArticleItem
      v-for="article in articlesForPage"
      :key="article.id"
      :article="article"
    />
  </ul>
  <nav class="pagination" id="list">
    <a
      class="page-numbers"
      href="#"
      v-if="page !== 1"
      @click.prevent="pagenate(page - 1)"
      >Back</a
    >
    <a
      class="next page-numbers"
      href="#"
      v-if="page !== amountPages"
      @click.prevent="pagenate(page + 1)"
      >Next</a
    >
  </nav>
</template>

<style>
.articles {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style: none;
  height: calc(100% - 207.2px - 35px);
  margin: 0;
  padding: 0;
  overflow-y: auto;
  font-family: "Viaoda Libre";
}
.articles::-webkit-scrollbar {
  width: 7px;
}
.articles::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(212, 212, 80);
}
.pagination {
  position: absolute;
  width: 100%;
  font-size: 34px;
  z-index: 10;
  color: white;
}
.page-numbers {
  padding: 5px 20px;
  color: rgb(212, 212, 80);
}
</style>
<script>
import ArticleItem from "../components/ArticleItem.vue";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Preloader from "../components/Preloader.vue";

export default {
  data() {
    return {
      page: 1,
      articlesData: localStorage.getItem("articlesData")
        ? JSON.parse(localStorage.getItem("articlesData"))
        : [],
      amountArticles: 0,
      articlesPerPage: 0,
      amountPages: 0,
      articlesLoading: false,
      articlesLoadingFailed: false,
    };
  },

  components: {
    ArticleItem,
    Preloader,
  },
  computed: {
    articlesForPage() {
      const offset = (this.page - 1) * this.articlesPerPage;
      return this.articlesData.filter(
        (el) => el.id > offset && el.id <= offset + this.articlesPerPage
      );
    },
  },
  methods: {
    loadArticles() {
      if (localStorage.getItem("articlesData")) return;
      this.articlesLoading = true;
      this.articlesLoadingFailed = false;
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/posts`)
          .then((response) => {
            this.articlesData = response.data;
            localStorage.setItem(
              "articlesData",
              JSON.stringify(this.articlesData)
            );
          })
          .catch(() => {
            this.articlesLoadingFailed = true;
          })
          .then(() => {
            this.articlesLoading = false;
          });
      }, 500);
    },
    countArticles() {
      this.amountArticles = this.articlesData.length;
    },
    countArticlesForPage() {
      const coord = document.getElementById("list").getBoundingClientRect();
      this.articlesPerPage = Math.floor(
        (coord.right * (coord.top - 100)) / (400 * 230)
      );
    },
    countPages() {
      this.amountPages = Math.ceil(this.amountArticles / this.articlesPerPage);
    },
    pagenate(page) {
      this.page = page;
    },
  },

  mounted() {
    this.loadArticles();
    this.countArticles();
    this.countArticlesForPage();
    this.countPages();
  },
};
</script>