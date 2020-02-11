<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="title"
          label-for="title-input"
          invalid-feedback="title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            :state="titleState"
            v-model="title"
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
            v-model="description"
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
            v-model="assignto"
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
            v-model="point"
            :options="points"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="date" label-for="date-input">
          <datepicker
            :disabled-dates="disabledDates"
            v-model="date"
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
  name: "createModal",
  components: {
    Datepicker
  },
  data() {
    return {
      title: "",
      titleState: null,
      description: "",
      descriptionState: null,
      point: null,
      pointState: null,
      assignto: "",
      assigntoState: null,
      status: "back-log",
      date: new Date(),
      disabledDates: {
        to: new Date()
      },
      points: [5, 10, 20, 50, 100]
    };
  },
  computed: {
    ...mapState(["realId"])
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
      this.title = "";
      this.description = "";
      this.point = "";
      this.assignto = "";
      this.date = new Date();
      this.titleState = null;
      this.descriptionState = null;
      this.pointState = null;
      this.assigntoState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      let form = {
        title: this.title,
        description: this.description,
        point: this.point,
        assignto: this.assignto,
        date: this.date,
        status: "back-log",
        realId: this.realId
      };
      this.$store.dispatch("createTask", form);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
