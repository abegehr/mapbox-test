<template>
  <div class="home">
    <PlacesMap />
  </div>
</template>

<script>
// @ is an alias to /src
import PlacesMap from "@/components/PlacesMap.vue";

export default {
  name: "home",
  components: {
    PlacesMap
  }
};
</script>

<style lang="scss">
</style>
