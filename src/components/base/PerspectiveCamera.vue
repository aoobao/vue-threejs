<script>
import register from '@/components/base/Register.vue'
export default {
  name: 'PerspectiveCamera',
  mixins: [register],
  props: {
    fov: {
      type: Number,
      default: 45
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    near: {
      type: Number,
      default: 1
    },
    far: {
      type: Number,
      default: 2000
    },
    position: {
      type: Array,
      default () {
        return [0, 0, 0]
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    aspect () {
      return this.width / this.height
    },
    propertyValue () {
      return {
        fov: this.fov,
        aspect: this.aspect,
        near: this.near,
        far: this.far,
        position: this.position
      }
    }
  },
  methods: {
    init () {
      this.$object = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far)
      this.$object.position.set(...this.position)
      this.$addObject(this.$object)
    },
    getCamera () {
      return this.$object || null
    }
  },
  watch: {
    propertyValue (opt) {
      let camera = this.$object
      if (!camera) return
      camera.fov = opt.fov
      camera.aspect = opt.aspect
      camera.near = opt.near
      camera.far = opt.far
      camera.position.set(...opt.position)
      camera.updateProjectionMatrix()
    }
  }
}
</script>
