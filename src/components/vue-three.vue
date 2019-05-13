<template>
  <div class="vue-three-container" ref="container">
    <camera :position="[0 ,0 ,3]" ref="camera" />
    <light :position="[0,0,5]" />
    <slot></slot>
  </div>
</template>

<script>
import camera from '@/components/base/PerspectiveCamera.vue'
import light from '@/components/base/DirectionalLight'
// 思路: 创建renderer,scene 向下混入到所有子组件,
// camera
export default {
  name: 'vue-three',
  components: { camera, light },
  data () {
    return {
      animateIndex: null,
      isAnimate: true,
      width: 500,
      height: 500
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resetSize, false)
    if (this.$scene) {
      this.$scene.dispose()
      delete this.$scene
    }
  },
  mounted () {
    this.createThree()

    this.$emit('created')
    if (this.isAnimate) this.render()

  },
  methods: {
    $addObject (...objs) {
      if (this.$scene) {
        this.$scene.add(...objs)
      } else {
        console.warn('add objects after created event!')
      }
    },
    $removeObject (...objs) {
      if (this.$scene) {
        this.$scene.remove(...objs)
      }
    },
    // 创建renderer以及scene
    createThree () {
      // console.log('createThree')
      // 创建场景
      this.$scene = new THREE.Scene()

      this.$renderer = new THREE.WebGLRenderer({
        antialias: true // 抗锯齿设置为true
      })
      // this.$renderer.setClearColor(0xffffff, 1.0);
      let height = this.$refs.container.offsetHeight
      let width = this.$refs.container.offsetWidth
      this.width = width
      this.height = height
      this.$renderer.setSize(width, height)

      this.$refs.container.appendChild(this.$renderer.domElement)


      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (typeof child.register === 'function') {
          child.register()
        }
      }

      // 暂时监听window大小变化,不监听dom大小
      window.addEventListener('resize', this.resetSize, false)

    },
    render () {
      if (this.isAnimate && this.$refs.camera) {
        this.$emit('render')
        let camera = this.$refs.camera.getCamera()
        if (camera) {
          this.$renderer.render(this.$scene, camera)
        }
        this.animateIndex = requestAnimationFrame(this.render)
      }
    },
    // 重置renderer 宽高
    resetSize () {
      // 对照相机的操作,

      if (this.$renderer) {
        this.height = this.$refs.container.offsetHeight
        this.width = this.$refs.container.offsetWidth
        this.$renderer.setSize(this.width, this.height)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.vue-three-container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
