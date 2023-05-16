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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="reloadPage">
                    <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div class="modal-body">
                <div class="card card-primary">
                    <div class="overlay" v-if="loading">
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <div class="card-body" v-if="visibleForm">
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Name</label>
                                                <input type="text" v-model="admin.name" class="form-control" id="name" placeholder="Enter name" />
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider name="Email address" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="email">Email address</label>
                                                <input type="email" v-model="admin.email" class="form-control" id="email" autocomplete="off" />
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider name="Phone Number" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="phone">Phone Number</label>
                                                <input type="text" v-model="admin.phone" class="form-control" id="phn-number" placeholder="Enter phone number" />
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>

                                    <div class="col-md-6">
                                        <ValidationProvider name="User Role" rules="required|min_value:1" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label>User Role</label>
                                                <select class="form-control" style="width: 100%" v-model="admin.roles">
                                                    <option value="" selected="selected" disabled>
                                                        Select Role
                                                    </option>
                                                    <option v-for="(item, index) in roleList" :key="index" :value="item.id">
                                                        {{ item.name }}
                                                    </option>
                                                    <option value="N/A">N/A</option>
                                                </select>
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider name="Designation" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="designation">Designation</label>
                                                <input type="text" v-model="admin.designation" class="form-control" id="designation" placeholder="Enter designation" />
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider name="Address" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="address">Address</label>
                                                <input type="text" v-model="admin.address" class="form-control" id="address" placeholder="Enter your address" />
                                                <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>

                                    <div class="col-md-6" v-if="passwordShow==0">
                                        <ValidationProvider name="Password" rules="required|min:8|max:8" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" v-model="admin.password" class="form-control" id="password" autocomplete="off" />
                                                <span class="invalid-feedback d-block">{{errors[0] }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>

                                    <div class="col-md-6" v-if="editpasswordShow == 0">
                                            <ValidationProvider name="Password" rules="required|min:8|max:8" v-slot="{ errors }">
                                                <div class="form-group">
                                                    <label for="password">Edit Password</label>
                                                    <input type="password" v-model="admin.password" class="form-control" id="password" autocomplete="off" />
                                                    <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <button type="submit" class="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </ValidationObserver>
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
            passwordShow: 0,
            editpasswordShow: 1,
            admin: {
                name: "",
                id: "",
                email: "",
                phone: "",
                password: "",
                roles: "",
                address: "",
                designation: "",
            },
            roleList: [],
        };
    },
    created() {
        this.visibleForm = true;
        this.getRole();
        this.getValue();
    },
    methods: {
            reloadPage() {
            window.location.reload();
        },
        getValue() {
            if (this.user) {
                this.admin.id = this.user.id;
                this.admin.name = this.user.name;
                this.admin.email = this.user.email;
                this.admin.phone = this.user.phone;
                this.admin.roles = this.user.roles;
                this.admin.address = this.user.address;
                this.passwordShow = 1;
                this.editpasswordShow = 0;
                this.admin.designation = this.user.designation;

            }
        },
        visibleAction() {
            this.visibleForm = !this.visibleForm;

        },
        onSubmit() {
            this.loading = true;
            axios
                .post("/user-store", this.admin)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "User upload Successfully.",
                    });
                    this.$emit("executeMethod");
                    $("#user-add-modal").modal("hide");
                    window.location.reload();
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("#user-add-modal").modal("hide");
                    window.location.reload();

                });
        },
        getRole() {
            axios
                .get("/get-role-list")
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
