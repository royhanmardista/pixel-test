<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <!-- card template -->
        <div class="card">
          <div
            class="card-header text-white"
            :style="`background-color:${color};`"
          >
            {{ title }}
          </div>
          <div class="card-body">
            <todoItem :todoItems="tododata"></todoItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todoItem from "../components/todoItem";

export default {
  name: "todolist",
  methods: {    
  },
  components: {
    todoItem
  },
  data() {
    return {};
  },
  created() {},
  props: ["title", "color", "tododata"]
};
</script>

<style>
.card-body {
  padding: 0.2rem !important;
}
.col-sm-12 {
  padding: 0 rem !important;
}
</style>
