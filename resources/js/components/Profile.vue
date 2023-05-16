<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-3">
                        <h1>User Profile</h1>
                    </div>
                </div>
            </div>
        </section>

            <section class="content">
                <div class="container-fluid">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body" >
                                    <ValidationObserver v-slot="{ handleSubmit }">
                                        <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                                        <div class="form-group">
                                                            <label for="name">Name</label>
                                                            <input type="text" v-model="user.name" disabled class="form-control" id="name" placeholder="Enter name" />
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
                                                            <input type="email" v-model="user.email" disabled class="form-control" id="email" autocomplete="off" />
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
                                                            <input type="text" v-model="user.phone" disabled class="form-control" id="phn-number" placeholder="Enter phone number" />
                                                            <span class="invalid-feedback d-block">{{
                                                                errors[0]
                                                            }}</span>
                                                        </div>
                                                    </ValidationProvider>
                                                </div>

                                                <div class="col-md-6">
                                                    <ValidationProvider name="User Role" disabled rules="required|min_value:1" v-slot="{ errors }">
                                                        <div class="form-group">
                                                            <label>User Role</label>
                                                                <input type="text" v-model="role" disabled class="form-control" id="phn-number" placeholder="Enter phone number" />

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
                                                            <input type="text" disabled v-model="user.designation" class="form-control" id="designation" placeholder="Enter designation" />
                                                            <span class="invalid-feedback d-block">{{
                                                                errors[0]
                                                            }}</span>
                                                        </div>
                                                    </ValidationProvider>
                                                </div>
                                                <div class="col-md-6">
                                                    <ValidationProvider  disabled name="Address" rules="required" v-slot="{ errors }">
                                                        <div class="form-group">
                                                            <label for="address">Address</label>
                                                            <input type="text" disabled  v-model="user.address" class="form-control" id="address" placeholder="Enter your address" />
                                                            <span class="invalid-feedback d-block">{{
                                                                errors[0]
                                                            }}</span>
                                                        </div>
                                                    </ValidationProvider>
                                                </div>

                                                <div class="col-md-6">
                                                    <ValidationProvider name="resetPassword" rules="required|min:8" v-slot="{ errors }">
                                                        <div class="form-group">
                                                            <label for="resetPassword">Reset Password</label>
                                                            <input type="password" v-model="user.password" class="form-control" id="resetPassword" autocomplete="off" />
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
                            </div>
                        </div>
                </div>
            </section>
    </div>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            // visibleForm: false,
            // passwordShow: 0,
            // editpasswordShow: "",
            role:"",
            user: {
                id:"",
                name: "",
                email: "",
                phone: "",
                resetpassword: "",
            },
            roleList: [],
        };
    },
    created() {
        this.getRole();
        this.getValue();

    },
    methods: {

        getValue() {
            axios
                .get("/get-user-data")
                .then((res) => {
                    this.user = res.data.data;
                    this.role = res.data.role;
                })
                .catch(() => { });
        },
        onSubmit() {
            this.loading = true;
            axios
                .post("/password-reset", this.user)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "User upload Successfully.",
                    });
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });

                });
        },
        getRole() {
            axios
                .get("/get-role-list")
                .then((res) => {
                    this.roleList = res.data.data;
                })
                .catch(() => { });
        },
    },
};
</script>
