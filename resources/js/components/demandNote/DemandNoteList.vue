<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-3">
            <h1>{{ this.$route.params.servName }} List</h1>
          </div>
          <div class="col-md-3 float-left">
            <input type="search" v-model="searchData" style="width:200px" class="form-control"
              placeholder="Search Company">
          </div>
          <div class="col-md-6 text-right">
            <form>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <!-- <label >Submarine Cable</label> -->
                    <select>
                      <option value="" selected="selected" >
                        Select Cable
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <!-- <label >Licence</label> -->
                    <select>
                      <option value="" selected="selected" >
                        Customer Type
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <!-- <label >Circuit</label> -->
                    <select>
                      <option value="" selected="selected" >
                        Select Circuit
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <!-- <label >Group/Zone</label> -->
                    <select>
                      <option value="" selected="selected" >
                        Select Group/Zone
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <router-link
              v-if="$can('Iptransit-demandNote-Add') || $can('coloc-iplc-demand-note-Add') || $can('Iplc-demandNote-Add')"
              :to="{ name: 'AddDemandNote', params: { servName: this.$route.params.servName, id: this.$route.params.id } }"
              class="btn btn-success p-0 m-0">
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
                <div class="modal fade" id="approveNRC" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          {{ this.servName }} + Commercial Activation Date Form
                        </h5>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="approveDemandNote()">
                          <div class="row">
                            <div class="form-group col-md-12">
                              <label for=""> Commercial Activation Date</label>
                              <input type="date" class="form-control" v-model="approve.approved_date"
                                placeholder="Enter Approved date" required />
                            </div>
                            <div class="form-group col-md-12">
                              <label for=""> Circuit DesigNation Name</label>
                              <input type="text" class="form-control" v-model="approve.circuit_designation"
                                placeholder="Enter Approved Name" />
                            </div>
                            <div class="form-group col-md-12">
                              <label for=""> Backhole Connectivity Port</label>
                              <input type="text" class="form-control" v-model="approve.backhole_port"
                                placeholder="Backhole Connectivity Port" />
                            </div>

                            <!-- <div class="form-group col-md-12">
                              <label for=""> Remarks </label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="approve.remarks"
                                placeholder="Enter Remarks"
                                required
                              />
                            </div> -->
                          </div>
                          <!-- end row -->

                          <br />

                          <div class="text-right">
                            <button type="submit" @click="approval()" class="btn btn-success">
                              Approve
                            </button>
                            <button type="submit" @click="reject()" class="btn btn-danger">
                              Reject
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- end Modal -->
                <table class="table table-bordered table-striped table-responsive testDataTable ">
                  <thead>
                    <tr>
                      <th style="text-align:center">SL</th>
                      <th style="text-align:center">Company Name</th>
                      <th style="text-align:center">Type</th>
                      <th style="text-align:center">Submarine Cable</th>
                      <th v-if="this.$route.params.id == 1" style="text-align:center">Foreign Drop Point</th>
                      <th v-if="this.$route.params.id == 7" style="text-align:center">POP</th>
                      <th style="text-align:center">Circuit Capacity</th>
                      <th style="text-align:center">Circuit Level</th>
                      <th style="text-align:center">B.H Provider</th>
                      <th style="text-align:center">D.Note ID</th>
                      <th style="text-align:center">D.Note Issue Date</th>
                      <th style="text-align:center">Circuit Designation</th>
                      <th style="text-align:center">Circuit Activation Date</th>
                      <th style="text-align:center">Status</th>
                      <th style="text-align:center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="filterSearch.length == 0" class="text-center">
                      <span>Data Not Found</span>
                    </tr>
                    <tr v-for="(item, index) in filterSearch" :key="index" v-if="item.migrate_status != 1">
                      <td style="text-align:center">{{ index + 1 }}</td>
                      <td style="text-align:center">{{ item.customers.com_name }}</td>
                      <td style="text-align:center">{{ item.customers.custype.cus_type_name }}</td>
                      <td style="text-align:center">{{ item.subservice.sub_service_name }}</td>
                      <td style="text-align:center">{{ item.groups.group_name  }}</td>
                      <td v-if="item.service_id == 7" style="text-align:center">N/A</td>
                      <td style="text-align:center">{{ item.capacity.capacity_name }}</td>
                      <td v-if="item.service_id == 1" style="text-align:center">
                        {{ item.circuit.circuit_name }}
                      </td>
                      <td style="text-align:center">{{ item.backhole_port }}</td>
                      <td style="text-align:center">{{ item.id }}</td>
                      <td style="text-align:center"> {{ moment(item.created_at).format("DD-MMM-YYYY") }}</td>
                      <td style="text-align:center">{{ item.circuit_designation }}</td>
                      <td style="text-align:center"> {{ moment(item.approved_date).format("DD-MMM-YYYY") }}</td>
                      <!-- <td>{{ item.max }}</td> -->
                      <!-- <td>{{ item.groups.group_name }}</td>
                      <td>{{ item.charge }}</td>
                      <td>{{ item.mrc }}</td> -->


                      <td class="center" v-if="item.approval_status == 1">
                        <span class="badge badge-pill badge-primary">DN Issued</span>
                      </td>
                      <td class="center" v-if="item.approval_status == 2">
                        <span class="badge badge-pill badge-success">Activated</span>
                      </td>
                      <!-- <td class="center" v-if="item.approval_status == 3">
                        <span class="badge badge-pill badge-danger"
                          >Reject</span
                        >
                      </td> -->
                      <td class="center" v-if="item.approval_status == 4">
                        <span class="badge badge-pill badge-warning">Deactive</span>
                      </td>
                      <td class="">
                        <router-link target="_blank" :to="{
                          name: 'DemandNoteReport',
                          path: '/demandNote/:id',
                          props: true,
                          params: { id: item.id },
                        }" title="View Details" class="btn btn-success btn-sm">View DN</router-link>
                        <button v-if="item.approval_status != 2" type="button" title="Delete Demand Note" class="btn btn-danger btn-sm" @click="deleteItem(item)">
                                                <i class="fa fa-trash action-btn-font m-0" aria-hidden="true"></i>
                                            </button>
                        <router-link v-if="item.approval_status == 1" class="btn btn-primary btn-sm" data-toggle="modal"
                          data-target="#approveNRC" :to="{
                            name: 'DemandNoteStatus',
                            path: '/demandNote/:demandId',
                            props: true,
                            params: { demandId: item.id },
                          }" title="Circuit Activation Details">Circuit Activation Details</router-link>
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
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      visibleModal: false,
      listData: [],
      searchData: "",
      servName: '',
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
    // alert(this.$route.params.id)
    // alert(this.$route.params.demandId);
    this.moment = moment;
    this.getdemandNoteList();
  },

  mounted() {

    setTimeout(() => {
      $(document).ready(function () {
        $('.testDataTable').DataTable({
          searching: true,
          ordering: true
        });
      });
    }, 2000);
  },

  methods: {

      deleteItem(item) {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/delete-demand-note", {
                        id: item.id
                    })
                    .then((response) => {
                      this.getdemandNoteList();
                        Swal.fire(
                            "Deleted!",
                            "Demand Note has been deleted.",
                            "success"
                        );
                    });
            }
        });
    },
    getdemandNoteList() {
      this.loading = true;
      axios.get("/get-demand-note/" + this.$route.params.id).then((response) => {
        this.loading = false;
        this.listData = response.data.data;
      });
    },
    approval() {
      //  alert('approve');
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
      //   let id = this.$route.params.id
      axios
        .post("/demandnote-active", this.approve)
        .then((res) => {
          this.loading = false;
          Toast.fire({
            icon: "success",
            title: "Commercial Activation  updated.",
          });
          this.$emit("executeMethod");
          $("#approveNRC").modal("hide");
          this.getdemandNoteList();
          this.$router.push({
            name: "DemandNoteList",
            // name: 'AddDemandNote'
            params: { servName: this.$route.params.servName, id: this.$route.params.id }
          });
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
          $("approveNRC").modal("hide");
        });
    },
  },

  computed: {
    filterSearch() {
      return this.listData.filter(item => {
        return item.customers.com_name.match(this.searchData);
      });
    },

  },


};
</script>


<style scoped>
.actionStyle {
  color: red;
  width: 900px;
}

.table_wrapper {
  display: block;
  overflow-x: auto;
  overflow: scroll;
  white-space: nowrap;
}

table {

  width: auto;
  overflow-x: auto;
  overflow: scroll;
  white-space: nowrap;
  display: -webkit-box;
  word-break: break-word
}

th {
  height: 90px;
}

th {
  height: 30px;
}
</style>

<!--table =  display: table; -->
