<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{this.$route.params.servName}} Form</h1>
          </div>
          <div class="col-md-6 text-right">
            <router-link
              :to="{ name: 'ColocationDemandNoteList' }"
              class="btn btn-success p-1 m-0"
            >
              <p class="pr-2 pb-1 mb-0"><i class="fa fa-list-ul  pl-2"> </i> Demand Note List</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="modal-body">
      <div class="card card-primary">
        <div class="overlay" v-if="loading">
          <i class="fa fa-spinner fa-spin"></i>
        </div>
        <div class="card-body" v-if="visibleForm">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="row">
                <div class="col-md-4">
                  <ValidationProvider
                    name="Company"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Company Name</label>
                      <select
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.customer_id"
                      >
                        <option value="" selected="selected" disabled>
                          Select Company
                        </option>
                        <option
                          v-for="(item, index) in customerList"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.com_name }} ({{ item.custype.cus_type_name }})
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4">
                  <ValidationProvider
                    name="Sub Services"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Submarine Cable</label>
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
                          {{ item.sub_service_name }}
                        </option>
                        <option value="" selected="selected" disabled>
                          Select Submarine
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <input
                  type="hidden"
                  v-model="demand.capacity_id"
                  disabled
                  min="0"
                  placeholder="Capacity"
                />
                <input
                  type="hidden"
                  v-model="demand.max"
                  disabled
                  min="0"
                  placeholder="max"
                />

                <!-- Circuit Name -->
                <div class="col-md-4">
                  <ValidationProvider
                    name="circuit_id"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Circuit Type</label>
                      <select
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.circuit_id"
                      >
                        <option value="" selected="selected" disabled>
                          Select Circuit
                        </option>

                        <option
                          v-for="(val, index) in circuitList"
                          :key="index"
                          :value="val.id"
                          v-if="
                            val.circuit_name !== 'E1' &&
                            val.circuit_name !== 'E1 (Full)' &&
                            val.circuit_name !== 'DS3 (21 x E1/ 45 Mbps)' &&
                            val.circuit_name !== 'DS3 (21 x E1/ 45 Mbps) (Full)' &&
                            val.circuit_name !== 'STM 1 (Full)' &&
                            val.circuit_name !== 'STM 4 (Full)' &&
                            $route.params.id == 13
                          "
                        >
                          {{ val.circuit_name }}
                        </option>

                        <option
                          v-for="(val, index) in circuitList"
                          :key="index"
                          :value="val.id"
                          v-if="
                          $route.params.id == 23 &&
                            val.circuit_name == 'No Circuit'
                          "
                        >
                          {{ val.circuit_name }}
                        </option>

                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end Circuit Name -->

                <!-- start zone -->
                <div class="col-md-4" v-if="$route.params.id == 13">
                  <ValidationProvider
                    name="Zone"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label> Stations/Group </label>
                      <select
                        name=""
                        v-model="demand.grp_or_zone"
                        :id="'zone' + zoneIndex"
                        class="form-control"
                        @change="onChangeVal($event)"
                        style="width: 100%"
                      >
                        <option value="" selected="selected" disabled>
                          Select Stations/Group  old
                        </option>
                        <option
                          v-for="(popOrZone, index) in zoneList"
                          :key="index"
                          :value="popOrZone.id"
                        >
                          {{ popOrZone.groups.group_name }}
                        </option>
                      </select>

                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4" v-else>
                  <ValidationProvider
                    name="Zone"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label> Stations/Group </label>
                      <select
                        name=""
                        v-model="demand.grp_or_zone"
                        :id="'zone' + zoneIndex"
                        class="form-control"
                        style="width: 100%"
                      >
                        <option value="" selected="selected" disabled>
                          Select Stations/Group
                        </option>
                        <option :value="item.id" v-for="(item, index) in zoneList" :key="index" v-if="item.service_id==23">{{ item.group_name }}</option>
                      </select>

                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end zone group -->

                <div class="col-md-4" v-if="iplcColocation">
                  <ValidationProvider
                    name="charge"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="charge">Unite Rate</label>
                      <input
                        type="number"
                        v-model="demand.charge"
                        class="form-control"
                        id="charge"
                        disabled
                        min="0"
                        placeholder="Tariff"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4" v-if="iplcColocation">
                  <ValidationProvider
                    name="mrc"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="mrc">MRC</label>
                      <input
                        type="number"
                        v-model="demand.mrc"
                        class="form-control"
                        id="mrc"
                        readonly
                        placeholder="MRC In BDT"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end charge -->

                <!-- start port -->
                <div class="col-md-4" v-if="!iplcColocation">
                  <ValidationProvider
                    name="rack"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Rack Space</label>
                      <select
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.rack"
                      >
                        <option value="" selected="selected" disabled>
                          Select Rack Space
                        </option>
                        <option value="6000">4U Space</option>
                        <option value="40000">42U Rack Space/Full Rack</option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port -->

                <!-- start port Qty -->
                <div class="col-md-4" v-if="!iplcColocation">
                  <ValidationProvider
                    name="rackQty"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Rack Space Quantity</label>
                      <input
                        type="number"
                        @change="rackAndQty()"
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.rackQty"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port Qty -->
                <!-- start port -->
                <div class="col-md-4" v-if="!iplcColocation">
                  <ValidationProvider
                    name="Power"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Power</label>
                      <select
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.Power"
                      >
                        <option value="" selected="selected" disabled>
                          Select Power
                        </option>
                        <option value="18">Per Watt</option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port -->

                <!-- start port Qty -->
                <div class="col-md-4" v-if="!iplcColocation">
                  <ValidationProvider
                    name="PowerQty"
                    rules="required|min_value:1"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label>Power Quantity</label>
                      <input
                        type="number"
                        @change="powerAndQty()"
                        class="form-control"
                        style="width: 100%"
                        v-model="demand.PowerQty"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port Qty -->

                <div class="col-md-4" v-if="!iplcColocation">
                  <div class="form-group">
                    <label for="mrc2">MRC 2</label>
                    <input
                      type="number"
                      min="0"
                      v-model="demand.mrc2"
                      class="form-control"
                      id="mrc2"
                      placeholder="Enter mrc 2"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <ValidationProvider
                    name="discount"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="discount">Discount</label>
                      <input
                        type="text"
                        v-model="demand.discount"
                        min="0"
                        class="form-control"
                        id="discount"
                        placeholder="Enter adjust/discount"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="col-md-4">
                  <ValidationProvider
                    name="specialDiscount"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="specialDiscount"
                        >Adjust/Additional Discount</label
                      >
                      <input
                        type="number"
                        v-model="demand.specialDiscount"
                        min="0"
                        class="form-control"
                        id="specialDiscount"
                        placeholder="Enter  Special Discount"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="col-md-4">
                  <ValidationProvider
                    name="byCalculate"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="byCalculate">Add/Subtract</label>
                      <select
                        class="form-control"
                        name=""
                        v-model="demand.byCalculate"
                        id="byCalculate"
                      >
                        <option value="1">Add</option>
                        <option value="2">Sub</option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="remarks">Remarks</label>
                    <input
                      type="text"
                      min="0"
                      v-model="demand.remarks"
                      class="form-control"
                      id="remarks"
                      placeholder="Enter Remarks"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <ValidationProvider
                    name="Security Deposit"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <label for="sub">Security Deposit</label>
                      <input
                        type="number"
                        min="0"
                        v-model="demand.deposit"
                        class="form-control"
                        id="deposit"
                        placeholder="Enter security deposit"
                      />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary float-left">
                  Submit
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
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
      iplcColocation: false,
      customerList: [],
      serviceList: [],
      subServiceList: [],
      capacityList: [],
      zoneList: [],
      circuitList: [],
      demand: {
        customer_id: "",
        service_id: "",
        sub_service_id: "",
        capacity_id: "",
        circuit_id: "",
        grp_or_zone: "",
        charge: 0,
        rack: 0,
        rackQty: 1,
        max: "",
        mrc: 0,
        mrc2: 0,
        Power: 0,
        PowerQty: 1,
        discount: "",
        specialDiscount: "",
        deposit: "",
        remarks: "",
        byCalculate: "",
      },
    };
  },

  created() {
    // alert("ookk");
    this.demand.service_id = this.$route.params.id;
    this.visibleForm = true;
    this.getSubServiceList(this.$route.params.id);
    this.getCircuit();
  },

  computed: {
    dataAsign() {
      return parseFloat(this.demand.mrc);
    },

    mrc1InMrc2() {


      if(this.demand.Power * this.demand.PowerQty >= 2500 ){
        if(this.demand.PowerQty >5000){
          return (
            15 * this.demand.PowerQty +
            this.demand.rack * this.demand.rackQty +
            this.dataAsign
          );
        }else{
          return (
            this.demand.Power * this.demand.PowerQty +
            this.demand.rack * this.demand.rackQty +
            this.dataAsign
          );
        }



      }else{
       return this.demand.rack * this.demand.rackQty +2500 + this.dataAsign;
      }


    },

    allMrcinDeposit() {
      return (this.demand.deposit = this.mrc1InMrc2);
    },
  },

  watch: {
    "demand.circuit_id": function () {
      this.getzoneList(this.demand.circuit_id);
    },
    "demand.grp_or_zone": function () {
      this.getCharge(this.demand.grp_or_zone);
    },
  },

  methods: {
    serviceWiseCustomer(serviceId) {
      if (serviceId == 13) {
        this.iplcColocation = true;
        this.getCustomerList(1);
      } else {
        this.iplcColocation = false;
        this.getCustomerList(7);
      }
    },

    getCustomerList(id) {
      axios
        .post("/service-id/wise/get-customer-list", { id: id })
        .then((res) => {
          this.loading = false;
          this.customerList = res.data.users;
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
        });
    },

    rackAndQty() {
      this.demand.mrc2 = this.mrc1InMrc2;
      this.demand.deposit = this.mrc1InMrc2;
    },

    powerAndQty() {
      this.demand.mrc2 = this.mrc1InMrc2;
      this.demand.deposit = this.mrc1InMrc2;
    },

    getCircuit() {
      axios.get("/get-circuit-list").then((response) => {
        this.loading = false;
        this.circuitList = response.data.data;
      });
    },

    onChangeVal(e) {
      axios.post("/colocation/mrc/calculate", this.demand).then((res) => {
        this.loading = false;
        // this.demand.mrc = res.data.data;
        this.demand.mrc = res.data.dataMrc;
        this.demand.deposit = this.demand.mrc;
      });
    },

    getServiceList() {
      // alert("ok");
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
        .post("/get-sub-service-list", {
          service_id: id,
        })
        .then((res) => {
          this.serviceWiseCustomer(this.$route.params.id);
          this.loading = false;
          this.subServiceList = res.data.data;
        })
        .catch(() => {});
    },
    getzoneList(id) {
      if(id != 14){

        this.loading = true;
        axios
          .post("/get-colocation-charge", {
            circuit_id: id,
            customer_id: this.demand.customer_id,
            service_id: this.demand.service_id,
            sub_service_id: this.demand.sub_service_id,
          })
          .then((res) => {
            this.loading = false;
            this.zoneList = res.data.data;
            this.demand.capacity_id = res.data.data[0].capacity_id;
            this.demand.max = res.data.data[0].max;
            var maxCalculate = res.data.data[0].max;

            if (maxCalculate != 0) {
              this.demand.max = 1;
            } else {
              this.demand.max = 0;
            }
          });
      }else{

            this.loading = true;
            axios.get("/get-landing-group")
            .then((response) => {
                this.loading = false;
                this.zoneList = response.data.data;
            });
      }
    },
    getCharge(id) {
      this.loading = true;
      axios
        .post("/get-zone-charge", {
          grp_or_zone: id,
        })
        .then((res) => {
          this.loading = false;
          this.demand.charge = res.data.data.charge;
        });
    },


    visibleAction() {
      this.visibleForm = !this.visibleForm;
    },
    onSubmit() {
      axios
        .post("/create-CoLocation/demand-note", this.demand)
        .then((res) => {
          this.loading = false;
          this.$router.push({
            name: "ColocationDemandNoteList",
            // name: 'AddColocationDemandNote'
          });
          Toast.fire({
            icon: "success",
            title: "Data Upload Successfull.",
          });
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
.bulk-tag {
  margin-left: 14%;
  margin-bottom: 0px;
  margin-top: 7px;
}

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
</style>
