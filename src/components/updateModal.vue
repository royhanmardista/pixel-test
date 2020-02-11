<template>
  <div>
    <b-modal
      id="update-modal"
      ref="modal"
      title="Submit Your task"
      v-model="show"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" v-if="task" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="title"
          label-for="title-input"
          invalid-feedback="title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            :state="titleState"
            v-model="task.title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="description"
          label-for="description-input"
          invalid-feedback="description is required"
          :state="descriptionState"
        >
          <b-form-textarea
            id="description-input"
            :state="descriptionState"
            v-model="task.description"
            type="text"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          label="assign to"
          label-for="assignto-input"
          invalid-feedback="assignto is required"
          :state="assigntoState"
        >
          <b-form-input
            id="assignto-input"
            :state="assigntoState"
            v-model="task.assignto"
            required
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="point"
          :state="pointState"
          label-for="point-input"
          invalid-feedback="point is required"
        >
          <b-form-select
            id="point-input"
            :state="pointState"
            v-model="task.point"
            :options="points"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="date" label-for="date-input">
          <datepicker
            :disabled-dates="disabledDates"
            v-model="task.date"
            calendar-button-icon="fa fa-calendar"
            :calendar-button="true"
            :bootstrap-styling="true"
            :required="true"
          ></datepicker>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState } from "vuex";

export default {
  name: "updateModal",
  components: {
    Datepicker
  },
  data() {
    return {
      titleState: null,
      inputShow: false,
      inputTask: {},
      descriptionState: null,
      pointState: null,
      assigntoState: null,
      date: new Date(),
      disabledDates: {
        to: new Date()
      },
      points: [5, 10, 20, 50, 100]
    };
  },
  computed: {
    ...mapState(["currentTask", "showUpdate"]),
    task: {
      get() {
        return this.currentTask;
      },
      set(newVal) {
        return (this.inputTask = newVal);
      }
    },
    show: {
      get() {
        return this.showUpdate;
      },
      set(newVal) {
        return (this.inputShow = newVal);
      }
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid;
      this.descriptionState = valid;
      this.pointState = valid;
      this.assigntoState = valid;
      return valid;
    },
    resetModal() {
      this.$store.commit("SET_CLOSE_UPDATE");
      this.inputShow = this.cloneTask;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$store.dispatch("updateTask", this.task);
      this.$nextTick(() => {
        this.$refs.modal.hide();
        this.$store.commit("SET_CLOSE_UPDATE");
      });
    }
  }
};
</script>
