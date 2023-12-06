<script>
import { defineComponent } from "vue";
import { addLineJumps } from "../../../helpers/text";

export default defineComponent({
  props: {
    votingData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addLineJumps,
  },
});
</script>

<template>
  <div>
    <input type="checkbox" id="notes-modal" class="modal-toggle" />
    <div class="modal">
      <div class="relative w-full max-w-screen-md">
        <label
          for="notes-modal"
          class="btn btn-sm btn-circle absolute -right-2 -top-2 z-10"
          >✕</label
        >

        <div
          class="card w-full max-w-screen-md bg-base-100 shadow-xl max-h-screen overflow-y-auto"
        >
          <h1 class="font-w-heading text-3xl m-4">
            {{ votingData.attribute }}
          </h1>
          <div class="card-body pb-0">
            <div class="flex items-center">
              <div class="stat-value mr-2">{{ votingData.up }}</div>
              <div class="stat-title">Good 👍🏼</div>
            </div>
            <p
              class="text-xl text-black rounded-lg p-4 shadow-inner bg-gray-200"
              v-html="addLineJumps(votingData.notes.up)"
            ></p>
          </div>

          <div class="card-body pb-0">
            <div class="flex items-center">
              <div class="stat-value mr-2">{{ votingData.side }}</div>
              <div class="stat-title">
                Meh <span class="-rotate-90 inline-block">👍🏼</span>
              </div>
            </div>
            <p
              class="text-xl text-black rounded-lg p-4 shadow-inner bg-gray-200"
              v-html="addLineJumps(votingData.notes.side)"
            ></p>
          </div>

          <div class="card-body">
            <div class="flex items-center">
              <div class="stat-value mr-2">{{ votingData.down }}</div>
              <div class="stat-title">Bad 👎🏼</div>
            </div>
            <p
              class="text-xl text-black rounded-lg p-4 shadow-inner bg-gray-200"
              v-html="addLineJumps(votingData.notes.down)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
