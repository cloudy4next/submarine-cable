<template>
<div class="modal fade" id="role-permission-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">Role & Permission Form</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card card-primary">
                    <div class="overlay" v-if="loading">
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <div class="card-body">
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(onSubmit)">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ValidationProvider name="Role Name" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Role Name: {{ rpData.name }}</label>
                                                <input type="text" v-model="rpData.name " class="form-control" id="name" placeholder="Enter role name" />
                                                <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                          <div class="col-xs-12 col-sm-12 col-md-12">
                                                <div class="form-group">
                                                      <strong>Permission:</strong>
                                                        <tr>
        <th>
          <input type="checkbox" v-model="allSelected" @change="selectAll" />
        </th>
        <th align="left">select all</th>
      </tr>
                                         <div v-for="item in permissionList">
                                            <input type="checkbox"  :id="item.id" :value="item.id" v-model="rpData.permission"  :key="item.id">
                                            <label :for="item.id"> {{item.name}} </label>
                                              </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <button type="submit" class="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    props: ["rolePerData"], checked:Boolean,
    data() {
        return {
            loading: false,
            permissionList:[],
            rpData: {
                name: "",
                permission:[],


            },
        };
    },

    created() {
        // alert(this.rolePerData);
        this.visibleForm = true;
        // this.getRole();
        this.getValue();
        this.getPermissions();
    },
    methods: {

//
        getPermissions(){

                axios.get("/get-permissions")
                .then((res)=>{
                    this.permissionList =res.data.data;
                });

        },
         selectAll() {
      if (this.allSelected) {
        const selected = this.users.map((u) => u.id);
        this.selected = selected;
      } else {
        this.selected = [];
      }
    },
//                  isChecked(id) {
//  if(this.availableRoles[index].id === this.users[0].roles[0].id){
//     console.log(this.availableRoles[index].id+' THE SAME ' +this.users[0].roles[0].id);
//  }
//   },

         getValue() {
            if (this.rolePerData) {
                this.rpData = this.rolePerData;

            }
        },

        onSubmit() {
            // alert('ookk');
            this.loading = true;
            axios
                .post("/store-role", this.rpData)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "User Role Created Successfully.",
                    });
                    // window.location.href = "/";
                    this.$router.push({
                        name: 'RolePermission'
                    });
                    $("#role-permission-modal").modal("hide");
                    this.$emit("executeMethod");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                });
        },
    },
};
</script>

<style scoped>
.fa-spin {
    font-size: 30px;
    margin-top: 20% !important;
    margin-left: 46%;
}

.card .overlay,
.info-box .overlay,
.overlay-wrapper .overlay,
.small-box .overlay {
    background-color: rgba(221, 221, 221, 0.7) !important;
    display: none !important;
}
</style>
