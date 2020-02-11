import Vue from "vue";
import Vuex from "vuex";
import server from "@/apis/server.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backlog: [],
    todo: [],
    doing: [],
    done: [],
    currentTask: {},
    creatingTask: false,
    deletingTask: false,
    realId: 1,
    updatingTask: false,
    showUpdate: false
  },
  mutations: {
    SET_CLOSE_UPDATE(state) {
      state.showUpdate = false;
    },
    SET_CURRENT_TASK(state, payload) {
      state.currentTask = JSON.parse(JSON.stringify(payload));
      state.showUpdate = true;
    },
    SET_BACKLOG(state, payload) {
      state.backlog.unshift(payload);
    },
    SET_CREATING_TASK(state, payload) {
      state.creatingTask = payload;
    },
    SET_ADD_ID(state) {
      state.realId += 1;
    },
    SET_UPDATING_TASK(state, payload) {
      state.updatingTask = payload;
    },
    SET_DELETING_TASK(state, payload) {
      state.deletingTask = payload;
    },
    SET_TODO(state, payload) {
      state.todo.unshift(payload);
    },
    SET_DOING(state, payload) {
      state.doing.unshift(payload);
    },
    SET_DONE(state, payload) {
      state.done.unshift(payload);
    },
    SET_DELETE_BACKLOG(state, realId) {
      state.backlog.splice(
        state.backlog.findIndex(v => v.realId === realId),
        1
      );
    },
    SET_DELETE_TODO(state, realId) {
      state.todo.splice(
        state.todo.findIndex(v => v.realId === realId),
        1
      );
    },
    SET_DELETE_DOING(state, realId) {
      state.doing.splice(
        state.doing.findIndex(v => v.realId === realId),
        1
      );
    },
    SET_DELETE_DONE(state, realId) {
      state.done.splice(
        state.done.findIndex(v => v.realId === realId),
        1
      );
    }
  },
  actions: {
    async updateTask({ commit }, form) {
      try {
        commit("SET_UPDATING_TASK", true);
        let { data } = await server.patch(`/todos/${form.realId}`, form);
        switch (data.status) {
          case "back-log":
            commit("SET_DELETE_BACKLOG", data.realId);
            commit("SET_BACKLOG", data);
            break;

          case "todo":
            commit("SET_DELETE_TODO", data.realId);
            commit("SET_TODO", data);
            break;

          case "doing":
            commit("SET_DELETE_DOING", data.realId);
            commit("SET_DOING", data);
            break;

          case "done":
            commit("SET_DELETE_DONE", data.realId);
            commit("SET_DONE", data);
            break;
        }
        Swal.fire("Updated!", "Your todo has been updated.", "success");
      } catch (err) {
        Swal.fire("Error!", `${err.response.data.message}`, "error");
      } finally {
        commit("SET_UPDATING_TASK", false);
      }
    },
    async deleteTask({ commit }, todo) {
      let result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"
      });
      if (result.value) {
        try {
          commit("SET_DELETING_TASK", true);
          await server.delete(`todos/${todo.realId}`);
          switch (todo.status) {
            case "back-log":
              commit("SET_DELETE_BACKLOG", todo.realId);
              break;

            case "todo":
              commit("SET_DELETE_TODO", todo.realId);
              break;

            case "doing":
              commit("SET_DELETE_DOING", todo.realId);
              break;

            case "done":
              commit("SET_DELETE_DONE", todo.realId);
              break;
          }
        } catch (err) {
          Swal.fire("Error!", `${err.response.data.message}`, "error");
        } finally {
          commit("SET_DELETING_TASK", false);
        }
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your todo is safe :)", "error");
      }
    },
    async createTask({ commit }, form) {
      try {
        commit("SET_CREATING_TASK", true);
        let { data } = await server.post("/todos", form);
        commit("SET_ADD_ID");
        commit("SET_BACKLOG", data);
        Swal.fire("Created!", "Task has been created.", "success");
      } catch (err) {
        Swal.fire("Error!", `${err.response.data.message}`, "error");
      } finally {
        commit("SET_CREATING_TASK", false);
      }
    },
    async updateStatusNext({ commit }, todo) {
      try {
        commit("SET_UPDATING_TASK", true);

        if (todo.status != "done") {
          if (todo.status == "back-log") {
            todo.status = "todo";
          } else if (todo.status == "todo") {
            todo.status = "doing";
          } else {
            todo.status = "done";
          }
          let { data } = await server.patch(`/todos/${todo.realId}`, todo);

          switch (data.status) {
            case "todo":
              commit("SET_TODO", data);
              commit("SET_DELETE_BACKLOG", data.realId);
              break;

            case "doing":
              commit("SET_DOING", data);
              commit("SET_DELETE_TODO", data.realId);
              break;

            case "done":
              commit("SET_DONE", data);
              commit("SET_DELETE_DOING", data.realId);
              break;
          }
          Swal.fire("Updated!", "Your todo has been updated.", "success");
        } else {
          Swal.fire({
            title: "Opps ....",
            text: "You already at the edge",
            icon: "warning"
          });
        }
      } catch (err) {
        Swal.fire("Error!", `${err.response.data.message}`, "error");
      } finally {
        commit("SET_UPDATING_TASK", false);
      }
    },
    async updateStatusBack({ commit }, todo) {
      try {
        commit("SET_UPDATING_TASK", true);

        if (todo.status != "back-log") {
          if (todo.status == "done") {
            todo.status = "doing";
          } else if (todo.status == "doing") {
            todo.status = "todo";
          } else {
            todo.status = "back-log";
          }
          let { data } = await server.patch(`/todos/${todo.realId}`, todo);

          switch (data.status) {
            case "todo":
              commit("SET_TODO", data);
              commit("SET_DELETE_DOING", data.realId);
              break;

            case "doing":
              commit("SET_DOING", data);
              commit("SET_DELETE_DONE", data.realId);
              break;

            case "back-log":
              commit("SET_BACKLOG", data);
              commit("SET_DELETE_TODO", data.realId);
              break;
          }
          Swal.fire("Updated!", "Your todo has been updated.", "success");
        } else {
          Swal.fire({
            title: "Opps ....",
            text: "You already at the edge",
            icon: "warning"
          });
        }
      } catch (err) {
        Swal.fire("Error!", `${err.response.data.message}`, "error");
      } finally {
        commit("SET_UPDATING_TASK", false);
      }
    }
  },
  modules: {}
});
