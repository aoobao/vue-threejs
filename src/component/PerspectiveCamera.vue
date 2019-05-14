<script>
import register from '@/component/mixins/register'
export default {
  mixins: [register],
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      fov: 45,
      near: 1,
      far: 2000,
      position: [0, 0, 3]
    }
  },
  computed: {
    aspect () {
      if (this.height !== 0) {
        return this.width / this.height
      } else {
        return 1
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.global.$camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far)
      this.global.$camera.position.set(...this.position)
      this.$addObject(this.global.$camera)
    }
  },
  watch: {
    aspect (val) {
      let camera = this.global.$camera
      if (!camera) return
      camera.aspect = val
      camera.updateProjectionMatrix()
    }
  }
}
</script>
