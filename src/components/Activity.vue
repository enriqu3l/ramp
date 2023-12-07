<script>
import { useActor } from "@xstate/vue";
import { addLineJumps } from "../helpers/text";
import actor from "../state-machines/appMachine";
import { groups } from "../templates/THC";
import TrashIcon from "./icons/TrashIcon.vue";
import UndoIcon from "./icons/UndoIcon.vue";
import DoneIcon from "./icons/DoneIcon.vue";
import EditIcon from "./icons/EditIcon.vue";
import NotesIcon from "./icons/NotesIcon.vue";
import AddIcon from "./icons/AddIcon.vue";
import { getTodayAsYYYYMMDD } from "../helpers/date";

const today = getTodayAsYYYYMMDD();
const defaultItem = {
  task: "",
  date: today,
  attribute: "",
  owner: "",
  status: "In progress",
  notes: "",
};

export default {
  components: {
    TrashIcon,
    UndoIcon,
    DoneIcon,
    EditIcon,
    NotesIcon,
    AddIcon,
  },
  setup() {
    const { state, send } = useActor(actor);
    return {
      state,
      addItem: (item) => {
        send({ type: "ADD_ACTION_ITEM", data: item });
      },
      editItemAt: (index, item) => {
        send({ type: "EDIT_ACTION_ITEM", data: { index, item } });
      },
      deleteItemAt: (index, item) => {
        send({ type: "DELETE_ACTION_ITEM", data: { index } });
      },
    };
  },
  data() {
    return {
      editedItem: {
        task: "",
        date: today,
        attribute: "",
        owner: "",
        status: "In progress",
        notes: "",
      },
      editedIndex: -1,
      dialog: false,
      notesAreOpen: false,
    };
  },
  methods: {
    completedItem(item) {
      this.editedIndex = this.actionItems.indexOf(item);
      this.editItemAt(this.editedIndex, {
        ...item,
        status: "Done",
      });
    },
    todoItem(item) {
      this.editedIndex = this.actionItems.indexOf(item);
      this.editItemAt(this.editedIndex, {
        ...item,
        status: "In progress",
      });
    },
    editItem(item) {
      this.editedIndex = this.actionItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.actionItems.indexOf(item);
      this.deleteItemAt(index);
    },
    close(e) {
      e.preventDefault();
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, defaultItem);
        this.editedIndex = -1;
      }, 10);
    },
    save: function (e) {
      e.preventDefault();
      if (this.editedIndex > -1) {
        this.editItemAt(this.editedIndex, this.editedItem);
        this.close(e);
      } else if (this.editedItem.task.length > 0) {
        this.addItem({
          task: this.editedItem.task,
          date: this.editedItem.date,
          attribute: this.editedItem.attribute,
          owner: this.editedItem.owner,
          status: this.editedItem.status,
          notes: this.editedItem.notes,
        });
        this.close(e);
      }
    },
    openNotes(item) {
      this.editedItem = Object.assign({}, item);
      this.notesAreOpen = true;
    },
    closeNotes() {
      this.notesAreOpen = false;
    },
    addLineJumps: addLineJumps,
  },
  computed: {
    actionItems() {
      return this.state.context.actionItems;
    },
    completedItems() {
      return this.actionItems.filter((item) => item.status === "Done");
    },
    todoItems() {
      return this.actionItems.filter((item) => item.status !== "Done");
    },
    groups() {
      return groups;
    },
  },
};
</script>

<template>
  <div class="mx-auto my-4 max-w-7xl">
    <div
      tabindex="0"
      class="collapse collapse-open border border-base-300 bg-base-100 rounded-box mb-4"
    >
      <div
        class="collapse-title text-xl font-medium flex justify-between items-center"
      >
        <p>In Progress</p>
        <label
          for="my-modal-2"
          class="btn btn-primary btn-outline modal-button"
        >
          Create Action Item
          <AddIcon class="ml-2" />
        </label>
      </div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <thead>
              <tr>
                <th>Task</th>
                <th>Created</th>
                <th>Attribute</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="(item, index) in todoItems" :key="index">
                <td :data-test="`todo-${index}`">{{ item.task }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <span class="font-bold">{{ item.attribute }}</span>
                </td>
                <td>{{ item.owner }}</td>
                <td>
                  <div class="tooltip" data-tip="Mark as Done">
                    <label class="swap" @click="completedItem(item)">
                      <button class="btn btn-ghost mr-2">
                        <DoneIcon />
                      </button>
                    </label>
                  </div>
                  <div class="tooltip" data-tip="Show notes">
                    <label
                      class="swap modal-button"
                      @click="openNotes(item)"
                    >
                      <button class="btn btn-ghost mr-2">
                        <NotesIcon />
                      </button>
                    </label>
                  </div>
                  <div class="tooltip" data-tip="Edit">
                    <label
                      class="swap modal-button"
                      for="my-modal-2"
                      @click="editItem(item)"
                    >
                      <button class="btn btn-ghost">
                        <EditIcon />
                      </button>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      tabindex="0"
      class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">Done</div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Task</th>
                <th>Created</th>
                <th>Attribute</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="item in completedItems">
                <td>{{ item.task }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <span class="font-bold">{{ item.attribute }}</span>
                </td>
                <td>{{ item.owner }}</td>
                <td>
                  <div class="tooltip" data-tip="send back to In Progress">
                    <label class="swap" @click="todoItem(item)">
                      <button class="btn btn-ghost mr-2">
                        <UndoIcon />
                      </button>
                    </label>
                  </div>
                  <div class="tooltip" data-tip="Show notes">
                    <label
                      class="swap modal-button"
                      for="my-modal-2"
                      @click="openNotes(item)"
                    >
                      <button class="btn btn-ghost mr-2">
                        <NotesIcon />
                      </button>
                    </label>
                  </div>
                  <div class="tooltip" data-tip="Delete">
                    <label class="swap" @click="deleteItem(item)">
                      <button class="btn btn-ghost">
                        <TrashIcon />
                      </button>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <input
      type="checkbox"
      id="my-modal-2"
      class="modal-toggle"
      v-model="dialog"
    />
    <div class="modal">
      <div class="modal-box">
        <form class="form-control" @submit="save" method="post">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            v-model="editedItem.task"
            required
          />
          <label class="label">
            <span class="label-text">Owner</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            v-model="editedItem.owner"
            required
          />
          <label class="label">
            <span class="label-text">Attribute</span>
          </label>
          <select
            class="select w-full select-bordered"
            v-model="editedItem.attribute"
            required
          >
            <option selected>Pick an attribute</option>
            <option
              v-for="attribute in groups"
              :value="attribute.title"
              :key="attribute.title"
            >
              {{ attribute.title }}
            </option>
          </select>

          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            class="textarea h-24 textarea-bordered"
            v-model="editedItem.notes"
          ></textarea>

          <div class="modal-action">
            <button
              class="btn btn-primary btn-outline absolute left-6"
              @click="close"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- show notes modal -->
    <div
      v-if="notesAreOpen"
      class="modal pointer-events-auto visible opacity-100"
    >
      <div class="modal-box">
        <label class="label">
          <span class="label-text font-bold">Title</span>
        </label>
        <p>{{ editedItem.task }}</p>

        <label class="label">
          <span class="label-text font-bold">Owner</span>
        </label>
        <p>{{ editedItem.owner }}</p>

        <label class="label">
          <span class="label-text font-bold">Attribute</span>
        </label>
        <p>{{ editedItem.attribute }}</p>

        <label class="label">
          <span class="label-text font-bold">Notes</span>
        </label>
        <p v-html="addLineJumps(editedItem.notes)"></p>

        <div class="modal-action">
          <button class="btn btn-primary btn-primary" @click="closeNotes">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
