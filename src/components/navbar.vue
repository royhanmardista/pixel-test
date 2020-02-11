<template>
  <div class="sticky-top navbarcolor">
    <b-navbar toggleable="lg">
      <b-navbar-brand style="font-family: 'Coda Caption', sans-serif;" href="#"
        >Kamban App</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.modal-prevent-closing>
            <i class="fa fa-plus pr-1"></i>add task
          </b-nav-item>
          <createModal></createModal>
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import createModal from "../components/createModal";

export default {
  name : 'navbar',
  components: {
    createModal
  }
};
</script>

<style scoped>
.navbarcolor {
  background: rgb(22, 88, 223);
  background: linear-gradient(
    90deg,
    rgba(22, 88, 223, 1) 0%,
    rgba(226, 233, 234, 1) 0%,
    rgba(211, 201, 194, 1) 0%,
    rgba(215, 215, 215, 1) 0%,
    rgba(170, 98, 57, 1) 0%,
    rgba(202, 75, 143, 1) 0%,
    rgba(227, 88, 160, 1) 25%,
    rgba(242, 85, 147, 1) 51%,
    rgba(243, 40, 110, 1) 78%,
    rgba(242, 8, 77, 1) 96%
  );
}
a {
  color : rgb(10, 217, 245) !important;
}
a:hover {
  color: white !important;
}

@import url("https://fonts.googleapis.com/css?family=Coda+Caption:800&display=swap");
</style>
