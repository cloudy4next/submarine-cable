<template>
  <div class="modal fade" id="tariff-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title mr-5">Tariff Add Form</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
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
                      <ValidationProvider
                        name="Name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <label for="name"
                            >Service Name Is : {{ serviceName }}</label
                          >
                          <input
                            type="hidden"
                            v-model="serviceName"
                            class="form-control"
                            id="serviceName"
                          />
                          <span class="invalid-feedback d-block">{{
                            errors[0]
                          }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-12 mb-1">
                      <div class="border border-dar p-1">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label
                              >Sub Service Name Is :
                              {{ subService.sub_service_name }}</label
                            >
                            <input
                              type="text"
                              v-model="subService.sub_service_name"
                              class="form-control"
                              placeholder="Sub Service Name"
                            />
                          </div>
                        </div>
                        <div
                          class="col-md-12 d-flex"
                          style="border: 2px solid green; border-radius: 15px;"
                          v-for="(capacity, capIndex) in subService.capacity"
                          :key="capIndex"
                        >
                          <div
                            class="col-md-10"
                            style="margin-left: -7px !important;"
                          >
                            <div class="form-group" >
                              <label :for="'capacity' + capIndex"
                                >Capacity Name</label
                              >
                              <input
                                type="text"
                                v-model="capacity.capacity_name"
                                class="form-control"
                                :id="'capacity' + capIndex"
                                placeholder="Capacity Name"
                              />
                            </div>

                            <div class="form-group" v-if="ipTransit">
                              <label>Licence Type</label>
                              <select
                                class="form-control"
                                style="width: 100%"
                                v-model="capacity.circuit_id"
                                tabindex="-1"
                                :id="'circuit' + capIndex"
                                aria-hidden="true"
                              >
                                <option selected="selected" disabled>
                                  Select type
                                </option>
                                <option
                                  v-for="(val, index) in licenceList"
                                  :key="index"
                                  :value="val.id"
                                >
                                  {{ val.cus_type_name }}
                                </option>
                              </select>
                            </div>
                            <div class="form-group" v-else>
                              <label>Circuit Type</label>
                              <select
                                class="form-control"
                                style="width: 100%"
                                v-model="capacity.circuit_id"
                                tabindex="-1"
                                :id="'circuit' + capIndex"
                                aria-hidden="true"
                              >
                                <option selected="selected" disabled>
                                  Select type
                                </option>
                                <option
                                  v-for="(val, iCirc) in circuitList"
                                  :key="iCirc"
                                  :value="val.id"
                                >
                                  {{ val.circuit_name }}
                                </option>
                              </select>
                            </div>

                            <div class="form-group">
                              <label :for="'capacity' + capIndex"
                                >Installation Charge</label
                              >
                              <input
                                type="text"
                                v-model="capacity.instl_charge"
                                class="form-control"
                                :id="'instl_charge' + capIndex"
                                placeholder="Installation Charge"
                              />
                            </div>

                            <div class="form-group">
                              <label :for="'capacity' + capIndex">Max </label>
                              <input
                                type="text"
                                v-model="capacity.max"
                                class="form-control"
                                :id="'capacity' + capIndex"
                                placeholder="max lanth"
                              />
                            </div>

                            <div
                              class="col-md-12"
                              v-for="(zone, zoneIndex) in capacity.zone"
                              :key="zoneIndex"
                              style="display: flex; justify-content: center"
                            >
                              <div v-if="serviceId == 1" class="form-group" style="margin-right: 20px; width: 200px">
                                <label :for="'zone' + zoneIndex">Zone or Group</label>

                                <select v-model="zone.grp_or_zone" :id="'zone' + zoneIndex" class="form-control">
                                  <option v-for="(popOrZone, gpIndex) in zoneList" :key="gpIndex" :value="popOrZone.id" v-if="subServiceId == popOrZone.sub_service_id">
                                    {{ popOrZone.group_name }}
                                  </option>
                                </select>
                              </div>



                              <div v-if="serviceId == 7 || serviceId == 13" class="form-group" style="margin-right: 20px; width: 200px">
                                <label :for="'zone' + zoneIndex">Pop </label>

                                <select v-model="zone.grp_or_zone" :id="'zone' + zoneIndex" class="form-control">
                                  <option v-for="(popOrZone, gpIndex) in zoneList" :key="gpIndex" :value="popOrZone.id">
                                    {{ popOrZone.group_name }}
                                  </option>
                                </select>
                              </div>

                              <div
                                class="form-group"
                                style="margin-right: 20px"
                              >
                                <label>Tariff</label>
                                <input
                                  type="number"
                                  v-model="zone.charge"
                                  :id="'zone' + zoneIndex"
                                  class="form-control"
                                  placeholder="Tariff"
                                />
                              </div>
                              <div
                                class="form-group"
                                style="margin-right: 20px"
                              >
                                <label>VAT {{ zone.vat }} %</label>
                                <input
                                  type="number"
                                  v-model="zone.vat"
                                  :id="'zone' + zoneIndex"
                                  class="form-control"
                                  placeholder="vat"
                                />
                              </div>

                              <div class="col-md-2" style="margin-top: 35px">
                                <button
                                  class="btn btn-success btn-sm"
                                  type="button"
                                  @click="addGroup(capIndex)"
                                >
                                  <i class="fa fa-plus"></i>
                                </button>
                                <button
                                  class="btn btn-danger btn-sm"
                                  type="button"
                                  @click="removeGroup(capIndex, zoneIndex)"
                                >
                                  <i class="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-2" style="margin-top: 5%">
                            <button
                              v-if="subService.capacity.length - 1 === capIndex"
                              class="btn btn-success btn-sm"
                              type="button"
                              @click="addCapItem()"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                            <button
                              v-if="subService.capacity.length > 1"
                              class="btn btn-danger btn-sm"
                              type="button"
                              @click="removeCapItem(capIndex)"
                            >
                              <i class="fa fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-right mt-2">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subService: {
      type: Object,
      requied: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    subServiceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      ipTransit: false,
      circuitList: [],
      licenceList: [],
      zoneList: [],
      service: {
        id: "",
        service: "",
      },
      subService: {
        sub_service_name: "",
        sub_service_id: "",
        capacity: [
          {
            capacity_name: "",
            instl_charge: "",
            circuit_id: "",
            zone: [
              {
                charge: "",
                grp_or_zone: "",
                vat: "",
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    // alert('ok')
    this.circuitOrLicence();
    this.groupZoneOrPop();
    // this.getData();
  },
  methods: {
    groupZoneOrPop() {
      axios
        .get("/get-group-zone-pop-list/" + this.serviceId)
        .then((response) => {
          this.loading = false;
          this.zoneList = response.data.data;
          // console.log(this.zoneList);
        });
    },
    circuitOrLicence() {
      if (this.serviceId == 7) {
        this.ipTransit = true;
        this.getLicence();
      } else {
        this.ipTransit = false;
        this.getCircuit();
      }
    },

    getCircuit() {
      axios
        .get("/get-circuit-list")
        .then((res) => {
          this.loading = false;
          this.circuitList = res.data.data;
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "Data Not found !",
          });
        });
    },

    getLicence() {
      axios.get("/get-customer-serve/wise/type-list").then((response) => {
        this.loading = false;
        this.licenceList = response.data.data;
      });
    },

    // getData() {
    //     if (this.itemData) {
    //         alert(this.itemData);
    //         this.service.id = this.srrv;
    //         this.service.service = this.name;
    //         this.sub_service = this.itemData;
    //         // console.log(this.sub_service);
    //     }
    // },
    onSubmit() {
      // this.loading = true;
      const data = {
        id: this.serviceId,
        subServiceId: this.subService.id,
        service: this.serviceName,
        subService: this.subService,
      };
      axios
        .post("/tariff/add", data)
        .then((res) => {
          this.loading = false;
          Toast.fire({
            icon: "success",
            title: "Data Update Successfull.",
          });
          this.$emit("executeMethod");
          $("#tariff-modal").modal("hide");
        })
        .catch(() => {
          this.loading = false;
          Swal.fire({
            icon: "warning",
            title: "wrong creidentials!",
          });
          $("#tariff-modal").modal("hide");
        });
    },

    addCapItem() {
      this.subService.capacity.push({
        capacity_name: "",
        zone: [
          {
            charge: "",
            grp_or_zone: "",
          },
        ],
      });
      // console.log('ookk push');
      console.log(this.subService.capacity.push);
    },

    removeCapItem(cap) {
      this.subService.capacity.splice(cap);
    },

    addGroup(cap) {
      this.subService.capacity[cap].zone.push({
        charge: "",
        grp_or_zone: "",
      });

      console.log(this.capacity[cap].zone);
    },

    removeGroup(cap, zone) {
      this.subService.capacity[cap].zone.splice(zone, 1);
    },
  },
};
</script>

<style scoped></style>
