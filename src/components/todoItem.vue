<template>
  <div class="col-sm-12 py-2">
    <div v-if="!todoItems.length">
      <p>You have no task in this section....</p>
    </div>
    <div
      v-for="todo in todoItems"
      :key="todo.realId"
      :class="{ 'text-white': todo.color != 'light' }"
    >
      <div
        id="todoCard"
        class="card-body border mt-2 rounded shadow"
        :class="{
          'bg-danger': todo.status == 'back-log',
          'bg-warning': todo.status == 'todo',
          'bg-primary': todo.status == 'doing',
          'bg-success': todo.status == 'done'
        }"
      >
        <div class="card-text mx-1 p-2 mb-1">
          {{ todo.title.toUpperCase() }}
        </div>

        <div
          class="d-flex justify-content-between mb-3 pt-3 border-top"
          style="font-size:0.9rem"
        >
          <div>
            <i
              :class="{
                'fa fa-calendar-times-o': todo.status != 'done',
                'fa fa-calendar-check-o': todo.status == 'done'
              }"
            ></i>
            {{ new Date(todo.date).toLocaleDateString("en-US") }}
          </div>
          <div>
            <i class="fa fa-money"></i>
            {{ todo.point }}
          </div>
        </div>

        <p
          style="min-height:150px; text-align:justify !important"
          class="card-text border-top border-bottom py-2"
        >
          {{ todo.description }}
        </p>

        <div
          class="d-flex justify-content-center mb-2 border-bottom pb-2"
          style="font-size:0.9rem"
        >          
          <div>To : {{ todo.assignto }}</div>
        </div>

        <div class="d-flex flex-row justify-content-between">
          <a class="btn" @click.prevent="back(todo)">
            <i class="fa fa-backward"></i>
          </a>
          <a
            class="btn"
            @click.prevent="deleteTask(todo)"
            v-b-popover.hover.top="'delete task'"
          >
            <i class="fa fa-trash-o"></i>
          </a>
          <a
            class="btn"
            v-b-modal.modal-update-todo
            v-b-popover.hover.top="'edit task'"
            @click.prevent="showEditModal(todo)"
          >
            <i class="fa fa-pencil"></i>
          </a>
          <a class="btn" @click.prevent="next(todo)">
            <i class="fa fa-forward"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoitem",
  data() {
    return {};
  },
  components: {},
  props: ["todoItems"],
  created() {},
  methods: {
    next(todo) {
      this.$store.dispatch("updateStatusNext", todo);
    },
    back(todo) {
      this.$store.dispatch("updateStatusBack", todo);
    },
    deleteTask(todo) {
      this.$store.dispatch("deleteTask", todo);
    },
    showEditModal(todo) {
      this.$store.commit("SET_CURRENT_TASK", todo);
    }
  }
};
</script>

<style scoped>
.card-body {
  padding: 0.2rem !important;
}
.card-text,
p {
  margin-bottom: 0 rem !important;
}

a:hover {
  background-color: rgb(248, 247, 247);
  color: black !important;
}
</style>
