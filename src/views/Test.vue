<template>
  <div class="container" :style="getContainerStyle()" ref="container">
  </div>
</template>
<script>

export default {
  data () {
    return {
      width: 500,
      height: 500,
      animateIndex: null
    }
  },
  mounted () {
    var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(this.width, this.height);

    this.$refs.container.appendChild(renderer.domElement)

    var scene = this.scene = new THREE.Scene();

    var camera = this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 4000);

    camera.position.set(0, 0, 3);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);

    light.position.set(0, 0, 1);

    scene.add(light);

    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var loader = new THREE.TextureLoader()
    loader.load('/textures/disturb.jpg', (texture) => {
      var material = new THREE.MeshBasicMaterial({ map: texture });

      var geometry = new THREE.BoxGeometry(1, 1, 1);
      // var geometry = new THREE.CubeGeometry(1, 1, 1);
      var cube = this.cube = new THREE.Mesh(geometry, material);
      scene.add(cube);


    })

    this.render()
  },
  beforeDestroy () {
    if (this.animateIndex) {
      cancelAnimationFrame(this.animateIndex)
      this.animateIndex = null
    }
  },
  methods: {
    getContainerStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    render () {
      this.renderer.render(this.scene, this.camera)
      if (this.cube) {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
      }
      this.animateIndex = requestAnimationFrame(this.render)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
