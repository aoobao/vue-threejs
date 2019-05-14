<template>
  <div class="vue-three-container" ref="container">
    <template v-if="isRegister">
      <camera :width="width" :height="height" ref="camera" />
      <light />
      <slot></slot>
    </template>
  </div>
</template>
<script>
import camera from './PerspectiveCamera'
import light from './DirectionalLight'
export default {
  name: 'vue-three',
  components: { camera, light },
  provide () {
    return {
      global: this.global
    }
  },
  data () {
    let global = {}
    return {
      global,
      animateIndex: null,
      isAnimate: true,
      width: 0,
      height: 0,
      isRegister: false
    }
  },
  mounted () {
    this.createThree()
    this.$emit('created')
    if (this.isAnimate) this.render()
  },
  destroyed () {
    window.removeEventListener('resize', this.resetSize, false)
    if (this.animateIndex) {
      cancelAnimationFrame(this.animateIndex)
      this.animateIndex = null
    }

    if (this.global.$scene) {
      this.global.$scene.dispose()
      delete this.global.$scene
    }
  },
  methods: {
    $addObject (...objs) {
      // console.log(objs)
      // debugger
      if (this.global.$scene) {
        this.global.$scene.add(...objs)
      } else {
        console.warn('add objects after created event!')
      }
    },
    $removeObject (...objs) {
      if (this.global.$scene) {
        this.global.$scene.remove(...objs)
      }
    },
    createThree () {
      this.global.$scene = new THREE.Scene()
      this.global.$renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      // this.global.$renderer.setClearColor(0xff0000, 1.0);

      let height = this.$refs.container.offsetHeight
      let width = this.$refs.container.offsetWidth
      this.width = width
      this.height = height
      this.global.$renderer.setSize(width, height)

      this.$refs.container.appendChild(this.global.$renderer.domElement)

      this.isRegister = true

      // 暂时监听window大小变化,不监听dom大小
      window.addEventListener('resize', this.resetSize, false)

    },
    render () {
      if (this.isAnimate ) {
        let camera = this.global.$camera
        if (camera) {
          this.$emit('render')
          this.global.$renderer.render(this.global.$scene, camera)
        }
        this.animateIndex = requestAnimationFrame(this.render)
      }
    },
    resetSize () {
      if (this.global.$renderer) {
        this.height = this.$refs.container.offsetHeight
        this.width = this.$refs.container.offsetWidth
        this.global.$renderer.setSize(this.width, this.height)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-three-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
