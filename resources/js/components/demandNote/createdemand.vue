<template>
  <div class="content-wrapper">
    <div class="modal-header">
      <h4 class="modal-title mr-5"><b>Demand Note Form {{ this.$route.params.servName }}</b></h4>
      <p>Total Bandwidth: <span class="text-red pr-4">{{ totalBandwidth }}</span>
        <span class="" v-if="!qtyFill">
          Pop Wise: <span class="text-green">{{ popWiseTotalBandwidth }}</span>
        </span>
        <button class="btn btn-md btn-primary pl-3 m-0" @click="cuaromerWiseBandwidthDetails()" v-if="btnFide">BW
          Details</button>
      </p>

      <router-link
        :to="{ name: 'DemandNoteList', params: { servName: this.$route.params.servName, id: this.$route.params.id } }"
        class="btn btn-success p-0 m-0">
        <p class="pr-2 pb-1 mb-0"><i class="fa fa-list-ul  pl-2"> </i> Demand Note List</p>
      </router-link>
    </div>

    <div class="modal-body">
      <div class="card card-primary">
        <div class="overlay" v-if="loading">
          <i class="fa fa-spinner fa-spin"></i>
        </div>
        <div class="card-body" v-if="visibleForm">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" ref="form">
              <div class="row">

                <div class="col-md-4">
                  <ValidationProvider name="Company" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Company Name</label>
                      <select class="form-control" style="width: 100%" @change="customerChange($event)"
                        v-model="demand.customer_id">
                        <option value="" selected="selected" disabled>
                          Select Company
                        </option>
                        <option v-for="(item, index) in userList" :key="index" :value="item.id">
                          {{ item.com_name }} ({{ item.custype.cus_type_name }})
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4" v-if="portShow">
                  <ValidationProvider name="charge" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="charge">Bandwidth</label>
                      <input type="number" v-model="demand.qty" class="form-control" id="qty" min="0"
                        placeholder="Quantity" v-on:keyup="qtyCalculation" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4">
                  <ValidationProvider name="Sub Services" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label v-if="portShow">Sub Service (Licence)</label>
                      <label v-else>Submarine Cable</label>
                      <select class="form-control" @change="onChangeSubService($event)" style="width: 100%"
                        v-model="demand.sub_service_id">
                        <option v-for="(item, index) in subServiceList" :key="index" :value="item.id">
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

                <input type="hidden" v-model="demand.capacity_id" disabled min="0" placeholder="Capacity" />
                <input type="hidden" v-model="demand.max" disabled min="0" placeholder="max" />

                <!-- Circuit Name -->
                <div class="col-md-4" v-if="qtyFill">
                  <ValidationProvider name="circuit_id" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Circuit Capacity</label>
                      <select class="form-control" style="width: 100%" v-model="demand.circuit_id">
                        <option value="" selected="selected" disabled>
                          Select Circuit
                        </option>
                        <option v-for="(val, index) in circuitList" :key="index" :value="val.id">
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

                <!-- Circuit Name -->
                <div class="col-md-4" v-if="portShow">
                  <ValidationProvider name="circuit_id" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Licence Type</label>
                      <select class="form-control" style="width: 100%" v-model="demand.circuit_id">
                        <option value="" selected="selected" disabled>
                          Select Licence
                        </option>
                        <option v-for="(val, index) in licenceList" :key="index" :value="val.id">
                          {{ val.cus_type_name + "id" + val.id }}
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end Circuit Name -->

                <!-- Capacity Name -->
                <!-- <div class="col-md-4">
                                <ValidationProvider name="Capacity" rules="required|min_value:1" v-slot="{ errors }">
                                    <div class="form-group"> -->
                <!-- <label>Capacity Name</label> -->
                <!-- <input type="hidden" v-model="demand.capacity_id" class="form-control" id="Capacity" disabled min="0" placeholder="Capacity" /> -->
                <!-- <select class="form-control" style="width: 100%" v-model="demand.capacity_id">
                                            <option value="" selected="selected" disabled>
                                                Select Capacity
                                            </option>
                                            <option v-for="(item, index) in capacityList" :key="index" :value="item.id">
                                                {{ item.capacity_name }}
                                            </option>
                                        </select> -->
                <!-- <span class="invalid-feedback d-block">{{errors[0]}}</span>
                                    </div>
                                </ValidationProvider>
                            </div> -->
                <!-- end capacity Name -->

                <!-- start zone -->
                <div class="col-md-4">
                  <ValidationProvider name="Zone" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label v-if="qtyFill"> Foreign Drop Point </label>
                      <label v-else> POP </label>

                      <select v-if="qtyFill" name="" v-model="demand.grp_or_zone" :id="'zone' + zoneIndex"
                        class="form-control" @change="onChangeVal($event)" style="width: 100%">
                        <option value="" selected="selected" disabled>
                          Select
                        </option>
                        <option v-for="(popOrZone, index) in zoneList" :key="index" :value="popOrZone.id"
                          v-if="subServiceId == popOrZone.sub_service_id">
                          {{ popOrZone.groups.group_name }}
                        </option>
                      </select>

                      <select v-else name="" v-model="demand.grp_or_zone" :id="'zone' + zoneIndex" class="form-control"
                        style="width: 100%" @change="onChangeVal($event)">
                        <option value="" selected="selected" disabled>
                          Select POP
                        </option>
                        <option v-for="(popOrZone, index) in zoneList" :key="index" :value="popOrZone.id">
                          {{ popOrZone.groups.group_name }}
                        </option>
                      </select>

                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end zone group -->

                <!-- start country -->
                <div class="col-md-4" v-if="countryShow">
                  <ValidationProvider name="country" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Landing Stations (Country)</label>
                      <select class="form-control" style="width: 100%" v-model="demand.country">
                        <option value="" selected="selected" disabled>
                          Select Country
                        </option>
                        <option v-for="(country, counId) in countryList" :key="counId" :value="country.id">
                          {{ country.country_name }}
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end country -->

                <div class="col-md-4">
                  <ValidationProvider name="charge" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="charge">Slab Level</label>
                      <input type="number" v-model="demand.charge" class="form-control" id="charge" disabled min="0"
                        placeholder="Tariff" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- Character count: <b>{{ demand.charge }}</b> -->

                <div class="col-md-4">
                  <ValidationProvider name="mrc" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="mrc">MRC</label>
                      <input type="number" v-model="demand.mrc" class="form-control" id="mrc" disabled min="0"
                        placeholder="MRC In BDT" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end charge -->

                <!-- start port -->
                <div class="col-md-4" v-if="portShow">
                  <ValidationProvider name="port" rules="required|min_value:1" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Port</label>
                      <select class="form-control" style="width: 100%" v-model="demand.port">
                        <option value="" selected="selected" disabled>
                          Select port
                        </option>
                        <option v-for="(val, index) in portList" :key="index" :value="val.id">
                          {{ val.port_name }}
                        </option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port -->

                <!-- start port Qty -->
                <div class="col-md-4" v-if="portShow">
                  <ValidationProvider name="portQty" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label>Port Quantity</label>
                      <input type="text" class="form-control" style="width: 100%" v-on:keyup="qtyCalculation"
                        v-model="demand.portqty" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <!-- end port Qty -->
                <div class="col-md-4">
                  <ValidationProvider name="byDiscountCalculation" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="byDiscountCalculation">Fixed/Percentage</label>
                      <select class="form-control" name="" v-model="demand.byDiscountCalculation"
                        id="byDiscountCalculation">
                        <option value="1">Fixed Amount</option>
                        <option value="2">Percentage</option>
                      </select>
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4">
                  <ValidationProvider name="discount" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="discount">Discount</label>
                      <input type="text" v-model="demand.discount" min="0" class="form-control" id="discount"
                        @change="onChangeDiscount($event)" placeholder="Enter adjust/discount" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="col-md-4">
                  <ValidationProvider name="Security Deposit" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="sub">Security Deposit</label>
                      <input type="number" min="0" v-model="demand.deposit" class="form-control" id="deposit"
                        placeholder="Enter security deposit" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-4">
                  <ValidationProvider name="byCalculate" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="byCalculate">Add/Subtract Additional Amount</label>
                      <select class="form-control" name="" v-model="demand.byCalculate" id="byCalculate">
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
                  <ValidationProvider name="specialDiscount" rules="required" v-slot="{ errors }">
                    <div class="form-group">
                      <label for="specialDiscount">Additional Amount</label>
                      <input type="number" v-model="demand.specialDiscount" min="0" class="form-control"
                        id="specialDiscount" placeholder="Enter  Special Discount" />
                      <span class="invalid-feedback d-block">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                </div>



                <div class="col-md-4">
                  <div class="form-group">
                    <label for="remarks">Remarks</label>
                    <input type="text" min="0" v-model="demand.remarks" class="form-control" id="remarks"
                      placeholder="Enter" />
                  </div>
                </div>
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary float-left">
                  Submit
                </button>
              </div>
            </form>
          </ValidationObserver>
          <div class="text-left">
            <button @click="resetForm" class="btn btn-warning float-right">
              Clear all
            </button>
          </div>
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
      totalBandwidth: 0,
      popWiseTotalBandwidth: 0,
      userList: [],
      serviceList: [],
      subServiceList: [],
      capacityList: [],
      zoneList: [],
      circuitList: [],
      licenceList: [],
      portList: [],
      countryList: [],
      qtyFill: false,
      countryShow: false,
      portShow: true,
      iplcVal: "",
      subServiceId: "",
      btnFide: false,
      demand: {
        customer_id: "",
        service_id: this.$route.params.id,
        sub_service_id: "",
        capacity_id: "",
        circuit_id: "",
        grp_or_zone: "",
        charge: 0,
        qty: 0,
        max: 0,
        mrc: 0,
        discount: 0,
        remarks: "",
        byCalculate: 1,
        byDiscountCalculation: 2,
        country: 0,
        port: 0,
        portqty: 0,
        specialDiscount: 0,
        deposit: 0,
      },
    };
  },

  created() {
    this.visibleForm = true;
    this.demand.service_id = this.$route.params.id,
      this.getSubServiceList(this.$route.params.id);
    this.getCircuit();
    this.getLicence();
    this.discountcal();
    this.onChangeDiscount();
    this.onChangeService(this.$route.params.id);
    if (this.demand.service_id == 1) {
      this.iplcVal = 1;
    } else {
      this.iplcVal = 0;
    }
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
    resetForm() {
      this.$refs.form.reset();
    },
    customerChange(e) {
      this.demand.customer_id = e.target.value;
      this.btnFide = true;
      axios
        .get("/customer/wise/total-bandwidth/" + e.target.value)
        .then((res) => {
          this.loading = false;
          this.totalBandwidth = res.data.data;
        });

    },
    cuaromerWiseBandwidthDetails() {

      if (this.$route.params.id == 1) {
        this.$router.push({
          name: "CustomerBandwithList",
          params: { id: this.demand.customer_id },
        });
      } else {
        this.$router.push({
          name: "IPTCustomerTotalBandwith",
          params: { id: this.demand.customer_id },
        });
      }
    },

    onChangeSubService(e) {
      if (this.demand.service_id == 7) {
        if (e.target.value == 107) {
          this.demand.circuit_id = 9;
          this.getPortList();
        } else {
          this.demand.circuit_id = 8;
          this.getPortList();
        }
      } else {
        if (e.target.value == 106) {
          this.countryShow = true;
        } else {
          this.countryShow = false;
        }
      }
    },

    groupIdWiseGetCountry() {
      this.loading = true;
      axios
        .post("/group-id/wise/get-country", {
          id: this.demand.grp_or_zone,
        })
        .then((res) => {
          this.loading = false;
          this.countryList = res.data.data;
        });
    },

    getPortList() {
      this.loading = true;
      axios
        .post("/get-port", {
          id: this.demand.circuit_id,
        })
        .then((res) => {
          this.loading = false;
          this.portList = res.data.data;
        });
    },

    getCircuit() {
      axios.get("/get-circuit-list").then((response) => {
        this.loading = false;
        this.circuitList = response.data.data;
      });
    },
    getLicence() {
      axios.get("/get-customer-serve/wise/type-list").then((response) => {
        this.loading = false;
        this.licenceList = response.data.data;
      });
    },

    getValue(id) {
      this.capacityList.map((item) => {
        if (item.id === parseInt(id)) {
          this.demand.deposit = item.charge;
        }
      });
    },

    qtyCalculation() {
      if (this.iplcVal != 1) {
        this.demand.mrc = this.demand.qty * this.demand.charge;
        this.demand.deposit = this.demand.mrc * 1.05;
        // this.totalBandwidth = parseFloat(this.totalBandwidth)+parseFloat(this.demand.qty)
      } else {
        axios.post("/mrc/calculate", this.demand).then((res) => {
          this.loading = false;
          var mrcToFIxed = 0;
          mrcToFIxed = res.data.dataMrc;
          this.demand.mrc = mrcToFIxed.toFixed(2);
          this.demand.deposit = this.demand.mrc * 1.05;
        });
      }
    },
    discountcal() {
      if (this.demand.discount > 0) {
        this.demand.deposit = 0;
      } else {
        this.demand.deposit = Math.round(this.demand.mrc * 1.05);
      }
      return this.demand.deposit;
    },

    onChangeDiscount(e) {
      if (this.demand.discount > 0) {

        this.demand.deposit = Math.round((this.demand.mrc - (this.demand.mrc * (this.demand.discount / 100))) * 1.05);
      } else {
        this.demand.deposit = Math.round(this.demand.mrc * 1.05);
      }
    },
    onChangeVal(e) {
      // if (this.iplcVal == 0) {
      //   // alert(this.demand.charge);
      //   this.demand.mrc = this.demand.qty * this.demand.charge;
      //   this.demand.deposit = this.demand.mrc * 1.05;
      // }
      if (this.iplcVal == 1) {
        this.demand.qty = 1;
        axios.post("/mrc/calculate", this.demand).then((res) => {
          this.loading = false;
          // this.demand.mrc = res.data.dataMrc;
          var mrcToFIxed = 0;
          mrcToFIxed = res.data.dataMrc;
          this.demand.mrc = mrcToFIxed.toFixed(2);
          this.demand.deposit = this.demand.mrc * 1.05;
        });
      }
      axios
        .get("/customer/group/pop/wise/total-bandwidth/" + this.demand.customer_id + '/' + e.target.value)
        .then((res) => {
          this.loading = false;
          this.popWiseTotalBandwidth = res.data.data;
        });
      this.countryList = "";
      this.groupIdWiseGetCountry(e.target.value);
    },
    onChangeService(id) {
      if (this.$route.params.id == 1) {
        this.qtyFill = true;
        this.portShow = false;
        this.iplcVal = 1;
        this.demand.qty = 1;
        this.demand.charge = "";
        this.demand.mrc = "";
        this.demand.discount = 0;
      } else {
        this.qtyFill = false;
        this.portShow = true;
        this.iplcVal = 0;
        this.demand.qty = 0;
        this.demand.charge = 0;
        this.demand.mrc = 0;
        this.demand.discount = 0;
      }
      this.getCustomerList(this.demand.service_id);
    },
    getCustomerList(id) {
      axios
        .post("/service-id/wise/get-customer-list", { id: id })
        .then((res) => {
          this.loading = false;
          this.userList = res.data.users;
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
        });
    },

    getSubServiceList(id) {
      this.loading = true;
      axios
        .post("/get-sub-service-list", {
          service_id: id,
        })
        .then((res) => {
          this.loading = false;
          this.subServiceList = res.data.data;
        })
        .catch(() => { });
    },

    getzoneList(id) {
      this.loading = true;
      axios
        .post("/get-zone-list", {
          circuit_id: id,
          customer_id: this.demand.customer_id,
          service_id: this.demand.service_id,
          sub_service_id: this.demand.sub_service_id,
          qty: this.demand.qty,
          max: this.demand.max,
        })
        .then((res) => {
          this.loading = false;
          this.zoneList = res.data.data;

          this.demand.capacity_id = res.data.data[0].capacity_id;
          this.subServiceId = this.demand.sub_service_id;
          // this.demand.max = res.data.data[0].max;
          var maxCalculate = res.data.data[0].max;
          if (maxCalculate != 0) {
            if (id == 7) {
              this.demand.max = 100;
            } else if (id == 6) {
              this.demand.max = 10;
            } else {
              this.demand.max = 2.5;
            }
          } else {
            this.demand.max = 0;
          }
        });
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

          if (this.iplcVal != 1) {
            this.demand.mrc = this.demand.qty * this.demand.charge;
            this.demand.deposit = this.demand.mrc * 1.05;
          }
        });
    },


    visibleAction() {
      this.visibleForm = !this.visibleForm;
    },
    onSubmit() {
      axios
        .post("/create-demand-note", this.demand)
        .then((res) => {
          this.loading = false;

          this.$router.push({
            name: "DemandNoteReport",
            // name: 'AddDemandNote'
            params: { servName: this.$route.params.servName, id: this.$route.params.id }
          });

          Toast.fire({
            icon: "success",
            title: "Data Upload Successfull.",
          });
          window.location = res.data.redirect;

          this.$emit("executeMethod");
        })
        .catch(() => {
          this.loading = false;

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
</style>
