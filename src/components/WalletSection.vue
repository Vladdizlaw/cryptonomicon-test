<template>
  <div class="wallet-section">
    <div class="forwallets">
      <div
        data-test="common-div"
        @click="selected === t ? (selected = null) : (selected = t)"
        v-for="(t, i) in filteredTickers"
        :key="i"
      >
        <div
          data-test="wallet-div"
          class="walletblock"
          :class="{ active: t === selected, disabled: t.price === '--' }"
          @click="showtarget"
        >
          <div
            data-test="delete-btn"
            class="walletblock_delete"
            @click.stop="btnDelete(t.name)"
          ></div>

          <p class="walletblock_title">{{ t.name }}/USD</p>

          <p class="walletblock_name">{{ t.fullName }}</p>

          <p class="walletblock_price">
            {{ t.price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  emits: ["selected", "btn-delete"],
  props: {
    filteredTickers: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const selected = ref(null);
    watch(selected, () => {
      emit("selected", selected.value);
    });

    function showtarget(emit) {
      console.log(emit);
    }
    function btnDelete(name) {
      emit("btn-delete", name);
    }
    return {
      selected,
      showtarget,
      btnDelete,
    };
  },
};
</script>
