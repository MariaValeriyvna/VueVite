<template>
  <router-link :to="{ name: 'article', params: { id: article.id } }">
    <li class="article">
      <h2>
        {{article.id}}
        {{ article.title }}
      </h2>
      <p>{{ article.createdAt.slice(0, 10) }}</p>
      <h4>{{ article.preview }}</h4>
    </li>
  </router-link>
</template>
<style>
.article {
  width: 300px;
  height: 150px;
  border: 1px solid rgb(56, 52, 52, 0.2);
  margin: 10px;
  padding: 10px;
  color: rgb(56, 52, 52);
  cursor: pointer;
}
.article:focus,
.article:hover {
  box-shadow: 0 0 5px 5px rgb(202, 202, 146);
}
</style>
<script>
export default {
  props: ["article"],
};
</script>