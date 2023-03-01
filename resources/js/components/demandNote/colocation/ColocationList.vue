<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{this.$route.params.servName}} List</h1>
          </div>
          <div class="col-md-6 text-right" v-if="$can('coloc-iplc-demand-note-Add')">
            <router-link
              :to="{ name: 'AddColocationDemandNote' }"
              class="btn btn-success p-0 m-0"
            >
              <p class="pr-2 pb-1 mb-0"><i class="fa fa-plus-square  pl-2"> </i> Create</p>
            </router-link>
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
                <!-- start Modal -->
                <div
                  class="modal fade"
                  id="approveColocationModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Commercial Activation Date Form
                        </h5>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="approveDemandNote()">
                          <div class="row">
                            <div class="form-group col-md-12">
                              <label for=""> Commercial Activation Date</label>
                              <input
                                type="date"
                                class="form-control"
                                v-model="approve.approved_date"
                                placeholder="Enter Approved date"
                                required
                              />
                            </div>
                            <div class="form-group col-md-12">
                              <label for=""> Circuit DesigNation Name</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="approve.circuit_designation"
                                placeholder="Enter Approved Name"
                              />
                            </div>
                            <div class="form-group col-md-12">
                              <label for=""> Backhole Connectivity Port</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="approve.backhole_port"
                                placeholder="Backhole Connectivity Port"
                              />
                            </div>
                            <!---
                                                <div class="form-group col-md-12">
                                                    <label for="">Approval Status</label>
                                                    <select v-model="approve.approval_status" id="" class="form-control">
                                                    <option selected="selected" disabled> Select Status

                                                    </option>
                                                     <option value="1">Pending</option>
                                                    <option value="2">Approved</option>
                                                    <option value="3">Reject</option>
                                                   </select>

                                                </div>
                                                 -->

                            <div class="form-group col-md-12">
                              <label for=""> Remarks </label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="approve.remarks"
                                placeholder="Enter Remarks"
                                required
                              />
                            </div>
                          </div>
                          <!-- end row -->

                          <br />

                          <div class="text-right">
                            <button
                              type="submit"
                              @click="approval()"
                              class="btn btn-success"
                            >
                              Approve
                            </button>
                            <button
                              type="submit"
                              @click="reject()"
                              class="btn btn-danger"
                            >
                              Reject
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- end Modal -->
                <table class="table table-bordered table-striped testDataTable">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Company Name</th>
                      <th>Type</th>
                      <th v-if="serviceId == 13">Sub Service</th>
                      <th v-if="serviceId == 13">Circuit</th>
                      <th v-if="serviceId == 13">Capacity Name</th>
                      <th v-if="serviceId == 13">Group/Zone</th>
                      <th v-if="serviceId == 13">Tariff</th>
                      <th>MRC</th>
                      <th>Activation Date</th>
                      <th>Approval Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="listData.length == 0" class="text-center">
                      <td colspan="13"><span>Data Not Found</span></td>
                    </tr>
                    <tr v-for="(item, index) in listData" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.customers.com_name }}</td>
                      <td>{{ item.customers.custype.cus_type_name }}</td>
                      <td v-if="serviceId == 13">{{ item.subservice.sub_service_name }}</td>
                      <td v-if="serviceId == 13">{{ item.circuit.circuit_name }}</td>
                      <td v-if="serviceId == 13">{{ item.capacity.capacity_name }}</td>
                      <td v-if="serviceId == 13">{{ item.zonelist.groups.group_name }}</td>
                      <td v-if="serviceId == 13">{{ item.charge }}</td>
                      <td>{{ item.mrc }}</td>
                      <td>{{ item.approved_date }}</td>

                      <td class="center" v-if="item.approval_status == 1">
                        <span class="badge badge-pill badge-primary"
                          >Pending</span
                        >
                      </td>
                      <td class="center" v-if="item.approval_status == 2">
                        <span class="badge badge-pill badge-success"
                          >Approved</span
                        >
                      </td>
                      <td class="center" v-if="item.approval_status == 3">
                        <span class="badge badge-pill badge-danger"
                          >Reject</span
                        >
                      </td>
                       <td class="center" v-if="item.approval_status == 4">
                        <span class="badge badge-pill badge-warning"
                          >Deactive</span
                        >
                      </td>

                      <td>
                        <router-link
                          target="_blank"
                          :to="{
                            name: 'ColocationDemandNoteReport',
                            path: '/colocation/demandNote/:id',
                            props: true,
                            params: { id: item.id },
                          }"
                          title="View Details fixdSize"
                          class="btn btn-success"
                          >view</router-link
                        >

                        <router-link
                          v-if="item.approval_status == 1"
                          class="btn btn-primary fixdSize"
                          data-toggle="modal"
                          data-target="#approveColocationModal"
                          :to="{
                            name: 'colocationDemandNoteStatus',
                            path: '/colocation/demandNote-Status/:demandId',
                            props: true,
                            params: { demandId: item.id },
                          }"
                          title="Status"
                          >Status</router-link
                        >

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      visibleModal: false,
      listData: [],
      serviceId: '',
      approve: {
        id: "",
        approved_date: "",
        circuit_designation: "",
        approval_status: "",
        backhole_port: "",
        remarks: "",
      },
    };
  },
  created() {
    this.getdemandNoteList(this.$route.params.id);
    this.serviceId = this.$route.params.id;
  },

    mounted(){
    setTimeout(() => {
      $(document).ready(function () {
        $('.testDataTable').DataTable({
          searching: true,
          ordering:  true
        });
    });
    }, 2000);
  },

  methods: {
    getdemandNoteList(id) {
      this.loading = true;
      axios.get("/get-colocation/demand-note/"+id).then((response) => {
        this.loading = false;
        this.listData = response.data.data;
      });
    },
    approval() {
      this.approve.approval_status = 2;
      this.approveDemandNote();
    },
    reject() {
      //   alert('reject');
      this.approve.approval_status = 3;
      this.approveDemandNote();
    },

    approveDemandNote() {
      this.loading = true;
      this.approve.id = this.$route.params.demandId;
      // alert(this.$route.params.id);
      axios
        .post("/colocation/demandnote-active", this.approve)
        .then((res) => {
          this.loading = false;
          Toast.fire({
            icon: "success",
            title: "Co-Location Activation  updated.",
          });

          this.$emit("executeMethod");
          $("#approveColocationModal").modal("hide");
          this.getdemandNoteList(this.$route.params.id);

          this.$router.push({
            name: "ColocationDemandNoteList",
            // name: 'AddDemandNote'
            params: { servName: this.$route.params.servName , id: this.$route.params.id }
          });

        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
          $("approveColocationModal").modal("hide");
        });
    },
  },
};
</script>

<style scoped>
.content-header {
  padding: 5px 0px;
}

.modal-body {
  padding: 0;
}

p {
  margin-top: 5px;
  margin-bottom: 5px;
}

.fixdSize {
  width: 70px;
}
</style>
