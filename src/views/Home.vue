<template>
  <div class="home">
    <p>
      aa
      <router-link to="/test">Go to test</router-link>
    </p>
    <div class="test-container">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
  }
}
</script>
<style lang="scss" scoped>
.test-container {
  width: 500px;
  height: 500px;
}
</style>
