<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  computed: {
  },
  mounted() {
  },
});
</script>

<template>
  <div>
    <label class="btn btn-primary" for="importFile">    
        Import Project
    </label>
    <input 
        type="file"
        style="visibility:hidden"
        accept=".csv"
        id="importFile"
        onInput={handleChange}
        />
  </div>
</template>
