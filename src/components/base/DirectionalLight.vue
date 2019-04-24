<script>
import register from '@/components/base/Register.vue'
export default {
  name: 'DirectionalLight',
  mixins: [register],
  props: {
    color: {
      type: Number,
      default: 0xffffff
    },
    intensity: {
      type: Number,
      default: 1
    },
    position: {
      type: Array,
      default () {
        return [0, 0, 5]
      }
    }
  },
  methods: {
    init () {
      this.$object = new THREE.DirectionalLight(this.color, this.intensity)
      this.$object.position.set(...this.position)

      this.$addObject(this.$object)
    }
  }
}
</script>
