<template>
  <demo-container>
    <div class="counter">
      <counter-button
        :disabled="counterStore.isDecrementDisabled"
        @action="counterStore.decrement"
      >
        -
      </counter-button>

      <counter-value :value="counterStore.value" />

      <counter-button @action="counterStore.increment">+</counter-button>
    </div>
  </demo-container>
</template>

<script setup>
import CounterButton from "./CounterButton.vue";
import CounterValue from "./CounterValue.vue";
import DemoContainer from "../src/components/DemoContainer.vue";
import { useCounterStore } from "./store";
import { ref } from "vue";

const count = ref(0);

const counterStore = useCounterStore();

const decrement = () => {
  count.value--;
};
const increment = () => {
  count.value++;
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>
