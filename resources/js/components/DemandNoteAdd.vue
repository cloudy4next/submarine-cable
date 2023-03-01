<template>
  <div class="modal fade" id="demand-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title mr-5">IPLC NRC Demand Note Form</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- start -modal -body -->
        <div class="modal-body">
          <div class="card card-primary">
            <div class="overlay" v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div class="card-body" v-if="visibleForm">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <div class="row">
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Customers"
                        rules="required|min_value:1"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label>Customers</label>
                          <select
                            class="form-control"
                            style="width: 100%"
                            v-model="demand.user_id"
                          >
                            <option
                              v-for="(item, index) in userList"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.name }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Customer
                            </option>
                          </select>
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Services"
                        rules="required|min_value:1"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label>Services</label>
                          <select
                            class="form-control"
                            style="width: 100%"
                            v-model="demand.service_id"
                          >
                            <option
                              v-for="(item, index) in serviceList"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.service }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Service
                            </option>
                          </select>
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Sub Services"
                        rules="required|min_value:1"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label>Sub Services</label>
                          <select
                            class="form-control"
                            style="width: 100%"
                            v-model="demand.sub_service_id"
                          >
                            <option
                              v-for="(item, index) in subServiceList"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.sub_service }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Sub Service
                            </option>
                          </select>
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>



                    <!-- Capacity Name -->
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Capacity"
                        rules="required|min_value:1"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label>Capacity Name</label>
                          <select
                            class="form-control"
                            style="width: 100%"
                            v-model="demand.capacity_id"
                          >
                            <option
                              v-for="(item, index) in capacityList"
                              :key="index"
                              :value="item.id"
                              @click="getValue(item)"
                            >
                              {{ item.capacity_name }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Capacity
                            </option>
                          </select>
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <!-- end capacity Name -->

                     <!-- start zone -->
                    <div class="col-md-6">
                      <ValidationProvider
                        name="zone"
                        rules="required|min_value:1"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label> Zone Name</label>
                          <select
                            class="form-control"
                            style="width: 100%"
                            v-model="demand.capacity_id"
                          >
                            <option
                              v-for="(item, index) in capacityList"
                              :key="index"
                              :value="item.id"
                              @click="getValue(item)"
                            >
                              {{ item.capacity_name }}
                            </option>
                            <option value="" selected="selected" disabled>
                              Select Capacity
                            </option>
                          </select>
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <!-- end zone group -->

                     <div class="col-md-6">
                      <ValidationProvider
                        name="charge"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label for="charge">Charge</label>
                          <input
                            type="text"
                            v-model="demand.charge"
                            class="form-control"
                            id="charge"
                            placeholder="Enter Charge In Bdt"
                          />
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <!-- end charge -->
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Discount"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label for="discount">Adjust/Discount</label>
                          <input
                            type="number"
                            v-model="demand.discount" min="0"
                            class="form-control"
                            id="discount"
                            placeholder="Enter adjust/discount"
                          />
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider
                        name="Security Deposit"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label for="sub">Security Deposit</label>
                          <input
                            type="number" min="0"
                            v-model="demand.deposit"
                            class="form-control"
                            id="deposit"
                            placeholder="Enter security deposit"
                          />
                          <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="text-right">
                    <button @click="hideModal" type="button" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
        <!-- end -modal-body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      loading: false,
      visibleForm: false,
      userList: [],
      serviceList: [],
      subServiceList: [],
      capacityList: [],
      zoneList:[],
      demand: {
        user_id: "",
        service_id: "",
        sub_service_id: "",
        capacity_id: "",
        discount: "",
        deposit: "",
      },
    };
  },
  created() {
    this.visibleForm = true;
    // this.getData();
    this.getUserList();
    this.getServiceList();
  },
  watch: {
    "demand.service_id": function () {
      this.getSubServiceList(this.demand.service_id);
    },
    "demand.sub_service_id": function () {
      this.getCapacityList(this.demand.sub_service_id);
    },
    "demand.capacity_id": function () {
      this.getValue(this.demand.capacity_id);
    },
  },
  methods: {
    getValue(id) {
      this.capacityList.map((item) => {
        if (item.id === parseInt(id)) {
          this.demand.deposit = item.charge;
        }
      });
    },
    getUserList() {
      axios
        .get("/get-user-list")
        .then((res) => {
          this.loading = false;
          this.userList = res.data.users;
        })
        .catch(() => {
          this.loading = false;
          $("#capacity-add-modal").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
        });
    },
    getServiceList() {
      axios
        .get("/get-service-list")
        .then((res) => {
          this.loading = false;
          this.serviceList = res.data.data;
        })
        .catch(() => {});
    },
    getSubServiceList(id) {
      this.loading = true;
      axios
        .post("/get-sub-service-list", { service_id: id })
        .then((res) => {
          this.loading = false;
          this.subServiceList = res.data.data;
        })
        .catch(() => {});
    },
    getCapacityList(id) {
      this.loading = true;
      axios
        .post("/get-capacity-list", { sub_service_id: id })
        .then((res) => {
          this.loading = false;
          this.capacityList = res.data.data;
        })
        .catch(() => {});
    },
    getData() {
      if (this.item) {
        this.tariff = this.item;
        console.log(this.tariff);
      }
    },
    visibleAction() {
      this.visibleForm = !this.visibleForm;
    },
    onSubmit() {
      axios
        .post("/capacity-update", this.tariff)
        .then((res) => {
          this.loading = false;
          Toast.fire({
            icon: "success",
            title: "Data Upload Successfull.",
          });
          this.$emit("executeMethod");
          $("#capacity-add-modal").modal("hide");
        })
        .catch(() => {
          this.loading = false;
          $("#capacity-add-modal").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
        });
    },
    hideModal() {
      $("#demand-modal").modal("hide");
      this.$router.push({ name: "DemandNote" });
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
