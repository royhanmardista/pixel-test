<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-3">
        <todolist title="Back-log" color="red" :tododata="backlog"></todolist>
      </div>
      <div class="col-sm-3">
        <todolist title="Todo" color="orange" :tododata="todo"></todolist>
      </div>
      <div class="col-sm-3">
        <todolist title="Doing" color="blue" :tododata="doing"></todolist>
      </div>
      <div class="col-sm-3">
        <todolist title="Done" color="green" :tododata="done"></todolist>
      </div>
    </div>

    <!-- modal spinner for creating task -->
    <b-modal
      v-model="creatingTask"
      centered
      hide-header
      content-class="shadow"
      hide-footer
      size="sm"
    >
      <div class="d-flex flex-column justify-content-between">
        <div class="text-center">
          <h5 class="text-center text-info">Creating task ...</h5>
        </div>
        <div class="mx-auto my-3">
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="info"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="info"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="info"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="info"
          ></b-spinner>
        </div>
      </div>
    </b-modal>

    <!-- modal spinner for updating task -->
    <b-modal
      v-model="updatingTask"
      centered
      hide-header
      content-class="shadow"
      hide-footer
      size="sm"
    >
      <div class="d-flex flex-column justify-content-between">
        <div class="text-center">
          <h5 class="text-center text-primary">Updating task ...</h5>
        </div>
        <div class="mx-auto my-3">
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="primary"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="primary"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="primary"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="primary"
          ></b-spinner>
        </div>
      </div>
    </b-modal>

    <!-- modal spinner for deleting task -->
    <b-modal
      v-model="deletingTask"
      centered
      hide-header
      content-class="shadow"
      hide-footer
      size="sm"
    >
      <div class="d-flex flex-column justify-content-between">
        <div class="text-center">
          <h5 class="text-center text-danger">Deleting task ...</h5>
        </div>
        <div class="mx-auto my-3">
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="danger"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="danger"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="danger"
          ></b-spinner>
          <b-spinner
            type="grow"
            small
            label="Spinning"
            variant="danger"
          ></b-spinner>
        </div>
      </div>
    </b-modal>
    <updateModal></updateModal>
  </div>
</template>

<script>
import todolist from "../components/todolist";
import { mapState } from "vuex";
import updateModal from "@/components/updateModal";

export default {
  name: "home",
  components: {
    todolist,
    updateModal
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "backlog",
      "todo",
      "doing",
      "done",
      "creatingTask",
      "updatingTask",
      "deletingTask"
    ])
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.container {
  padding: 0% !important;
}
</style>
