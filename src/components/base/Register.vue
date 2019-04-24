<script>
export default {
  render () { return null },
  beforeDestroy () {

  },
  methods: {
    register () {
      this.$scene = this.$parent.$scene
      if (typeof this.init === 'function') {
        this.init()
      }
    },
    $addObject (...objs) {
      if (this.$scene) {
        this.$scene.add(...objs)
      } else {
        console.warn('can not find scene in parent component')
      }
    },
    $removeObject (...objs) {
      if (this.$scene) {
        this.$scene.remove(...objs)
      } else {
        console.warn('can not find scene in parent component')
      }
    }
  }
}
</script>
