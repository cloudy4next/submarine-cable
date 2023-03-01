<template>
<div class="content-wrapper">
     <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>User List</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <div>


                        </div>

                    </div>
                </div>
            </div>
        </section>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="overlay" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div class="card-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Software Role</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                </thead>
                                <tbody>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <sign-add /> -->
</div>
</template>

<script>
export default {
    components: {

    },
    props: ["user"],
    data() {
        return {
            loading: false,
            visibleForm: false,
            passwordShow: 0,
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
        getValue() {
            if (this.user) {
                this.admin.id = this.user.id;
                this.admin.name = this.user.name;
                this.admin.email = this.user.email;
                this.admin.phone = this.user.phone;
                this.admin.roles = this.user.roles;
                this.admin.address = this.user.address;
                this.passwordShow = 1;
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
                    $("#user-sign-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("#user-sign-add-modal").modal("hide");
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
