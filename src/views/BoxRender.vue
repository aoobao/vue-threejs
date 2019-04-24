<template>
  <div class="container">
    <vue-three @render="render" @created="start" ref="three" />
  </div>
</template>


<script>
import VueThree from '@/components/vue-three'
export default {
  components: { VueThree },
  data () {
    return {
      // cube: null,
      index: null,
      isCreated: false
    }
  },
  mounted () {
    var loader = new THREE.TextureLoader()
    loader.load('/textures/disturb.jpg', (texture) => {
      var material = new THREE.MeshBasicMaterial({ map: texture });

      var geometry = new THREE.BoxGeometry(1, 1, 1);
      // var geometry = new THREE.CubeGeometry(1, 1, 1);
      this.cube = new THREE.Mesh(geometry, material);
      // this.$addObject(this.$object)
      if (this.isCreated) {
        this.$refs.three.$addObject(this.cube)
      }
    })
  },
  beforeDestroy () {
  },
  methods: {
    start () {
      this.isCreated = true
      if (this.cube) {
        this.$refs.three.$addObject(this.cube)
      }
    },
    render () {
      let cube = this.cube
      if (cube) {
        cube.rotation.x += 0.02
        cube.rotation.y += 0.02
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
  height: 500px;
}
</style>
