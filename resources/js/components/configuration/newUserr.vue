<template>
  <div class="modal fade" id="user-add-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title mr-5">User Form</h4>
          <p class="bulk-tag" v-if="visibleForm">
            If you import bulk user data
            <a @click="visibleAction" href="javascript:void(0)">Click Here</a>
          </p>
          <p class="bulk-tag" v-if="!visibleForm">
            If you add single user data
            <a @click="visibleAction" href="javascript:void(0)">Click Here</a>
          </p>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card card-primary">
            <div class="overlay" v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div class="card-body" v-if="visibleForm">
              <!-- <ValidationObserver v-slot="{ handleSubmit }"> -->
              <form @submit.prevent="userInsert">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        v-model="user.name"
                        class="form-control"
                        id="name"
                        placeholder="Enter name"
                      />
                      <small class="text-danger" v-if="errors.name"
                        >{{ errors.name[0] }}
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input
                        type="email"
                        v-model="user.email"
                        class="form-control"
                        id="email"
                        placeholder="Enter email"
                      />
                      <small class="text-danger" v-if="errors.email">{{
                        errors.email[0]
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone">Phone Number</label>
                      <input
                        type="number"
                        v-model="user.phone"
                        class="form-control"
                        id="phn-number"
                        placeholder="Enter phone number"
                      />
                      <small class="text-danger" v-if="errors.phone">{{
                        errors.phone[0]
                      }}</small>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>User Role</label>
                      <select
                        class="form-control"
                        style="width: 100%"
                        v-model="user.role_id"
                      >
                        <option value="" selected="selected" disabled>
                          Select Role
                        </option>
                        <option
                          v-for="(item, index) in roleList"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.role_name }}
                        </option>
                        <option value="N/A">N/A</option>
                      </select>
                      <small class="text-danger" v-if="errors.role">{{
                        errors.role[0]
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="designation">Designation</label>
                      <input
                        type="text"
                        v-model="user.designation"
                        class="form-control"
                        id="designation"
                        placeholder="Enter designation"
                      />
                      <small class="text-danger" v-if="errors.designation">{{
                        errors.designation[0]
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        v-model="user.address"
                        class="form-control"
                        id="address"
                        placeholder="Enter your address"
                      />
                      <small class="text-danger" v-if="errors.address">{{
                        errors.address[0]
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        v-model="user.password"
                        class="form-control"
                        id="password"
                        placeholder="Enter Password"
                      />
                      <small class="text-danger" v-if="errors.password">{{
                        errors.password[0]
                      }}</small>
                    </div>
                  </div>
                </div>

                <div class="text-right">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
              <!-- </ValidationObserver> -->
            </div>
            <import-user v-if="!visibleForm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImportUser from "./ImportUser.vue";
export default {
  components: {
    ImportUser,
  },
  props: ["user"],
  data() {
    return {
      loading: false,
      visibleForm: false,
      user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: 0,
        address: "",
        designation: "",
      },
      errors: {},
      roleList: [],
    };
  },
  created() {
    this.visibleForm = true;
    this.getRole();
  },
  methods: {
    visibleAction() {
      // alert("ok");
      this.visibleForm = !this.visibleForm;
    },
    userInsert() {
       alert("ok");
      this.loading = true;
      axios.post("/store", this.user)
        .then((res) => {
          this.loading = false;
          Toast.fire({
            icon: "success",
            title: "User Upload Successfull.",
          });
          this.$emit("executeMethod");
          $("#user-add-modal").modal("hide");
        })
        .catch((error) => (this.errors = error.res.data.errors));
      // .catch(() => {

      //   this.loading = false;
      //   Swal.fire({
      //     icon: "warning",
      //     title: "wrong creidentials!",
      //   });
      //   $("#user-add-modal").modal("hide");
      // });
    },
    getRole() {
      axios
        .get("/role-permission-list")
        .then((res) => {
          this.roleList = res.data.data;
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.bulk-tag {
  margin-left: 14%;
  margin-bottom: 0px;
  margin-top: 7px;
}
</style>
