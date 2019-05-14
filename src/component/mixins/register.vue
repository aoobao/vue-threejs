<script>
export default {
  render () { return null },
  inject: ['global'],
  methods: {
    $addObject (...objs) {
      let addObject = this.$parent.$addObject
      if (typeof addObject === 'function') {
        addObject(...objs)
      } else {
        console.warn('parent vue component can not find method : $addObject')
      }
    }
  }
}
</script>
