<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>User List</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <div >
                              <button
                            type="button"
                            @click="showModal"
                            class="btn btn-outline-primary"
                        >
                            <i class="fa fa-plus mr-1"></i>
                            Add New User
                        </button>

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
                                <table
                                    id="example1"
                                    class="table table-bordered table-striped"
                                >
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
                                        <tr
                                            v-if="listData.length == 0"
                                            class="text-center"
                                        >
                                            <td colspan="3"></td>
                                            <span>Data Not Found</span>
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr
                                            v-for="(item, index) in listData"
                                            :key="index"
                                        >
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.email }}</td>
                                            <td>
                                                {{
                                                    item.phone == 0
                                                        ? "Not Found"
                                                        : item.phone
                                                }}
                                            </td>

                                               <td>
                                                <!-- <p v-for="role in item.roleList" v-bind:value="role.id" v-bind:key="role.id"></p>
                                                        {{ role.name }} -->
                                                </td>



                                            <td>{{ item.address }}</td>

                                            <td>
                                                <button
                                                    type="button"
                                                    title="View Details"
                                                    class="btn btn-success btn-sm"
                                                    @click="edit(item)">
                                                    <i
                                                        class="fa fa-edit action-btn-font m-0"
                                                    ></i>
                                                </button>
                                                <!-- <button
                                                    type="button"
                                                    title="Delete User"
                                                    class="btn btn-danger btn-sm"
                                                >
                                                    <i
                                                        class="fa fa-trash action-btn-font m-0"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <user-add
            @executeMethod="getUserList"
            :user="editItem"
            v-if="visibleModal"
        />
    </div>
</template>
<script>
import UserAdd from "./UserAdd.vue";
export default {
    components: {
        UserAdd,
    },
    data() {
        return {
            loading: false,
            visibleModal: false,
            roleNAme:'',
            listData: [],
             roleList:[],
            editItem: "",
        };
    },
    created() {
        this.getUserList();
        this.getRole();
        this.getuserRoleName();
    },
    methods: {
        edit(item) {
            this.editItem = item;
            this.visibleModal = true;
            $("#user-add-modal").modal("show");
        },
        can() {
            return this.authorize(user => this.data.user_id == user.id);
        },
        showModal() {
            this.visibleModal = true;
            $("#user-add-modal").modal("show");
        },
         getRole() {
            axios
                .get("/get-role-list")
                .then((res) => {
                    this.roleList = res.data.data;
                })
                .catch(() => {});
        },
        getUserList() {
            this.loading = true;
            axios.get("/get-user-list").then((response) => {
                this.loading = false;
                this.listData = response.data.users;
            });
        },

    },
};
</script>
<style lang=""></style>
