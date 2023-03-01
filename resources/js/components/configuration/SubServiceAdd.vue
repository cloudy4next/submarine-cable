<template>
<div class="modal fade" id="sub-service-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">Service Form</h4>
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
                                        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                            <div class="form-group">
                                                <label for="name">Service Name Is : {{ name }}</label>
                                                <input type="hidden" v-model="name" class="form-control" id="name" />
                                                <span class="invalid-feedback d-block">{{ errors[0] }}</span>
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12 mb-1" v-for="(item, i) in sub_service" :key="i">
                                        <div class="border border-dar p-1">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label :for="'Sub_Service' + i">Sub Service Name {{item.sub_service_name}}</label>
                                                    <input type="text" v-model="item.sub_service_name" class="form-control" :id="'Sub_Service' + i" placeholder="Sub Service Name" />
                                                </div>
                                            </div>
                                            <div class="col-md-12 d-flex" v-for="(capacity, capIndex) in item.capacity" :key="capIndex">
                                                <div class="col-md-10" style="margin-left: -7px !important">
                                                    <div class="form-group">
                                                        <label :for="'capacity' + capIndex">Capacity Name</label>
                                                        <input type="text" v-model="capacity.capacity_name" class="form-control" :id="'capacity' + capIndex" placeholder="Capacity Name" />
                                                    </div>


                                                    <div class="form-group" v-if="ipTransit">
                                                            <label>Licence Type</label>
                                                            <select class="form-control" style="width: 100%" v-model="capacity.circuit_id" tabindex="-1" :id="'circuit' + capIndex" aria-hidden="true">
                                                            <option selected="selected" disabled>Select type</option>
                                                                <option v-for="(val, index) in licenceList" :key="index" :value="val.id">
                                                                    {{ val.cus_type_name }}
                                                                </option>
                                                            </select>
                                                    </div>
                                                    <div class="form-group" v-else>
                                                            <label>Circuit Type</label>
                                                            <select class="form-control" style="width: 100%" v-model="capacity.circuit_id" tabindex="-1" :id="'circuit' + capIndex" aria-hidden="true">
                                                                <option selected="selected" disabled>Select type</option>
                                                                <option v-for="(val, iCirc) in circuitList" :key="iCirc" :value="val.id">
                                                                    {{ val.circuit_name }}
                                                                </option>
                                                            </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label :for="'capacity' + capIndex">Max </label>
                                                        <input type="text" v-model="capacity.max" class="form-control" :id="'capacity' + capIndex" placeholder="max lanth" />
                                                    </div>

                                                    <div class="col-md-12" v-for="(zone, zoneIndex) in capacity.zone" :key="zoneIndex" style="display: flex; justify-content: center">
                                                        <div class="form-group col-md-9" style="margin-right: 20px">
                                                            <label :for="'zone' + zoneIndex">Zone or Group </label>

                                                           <select name="" v-model="zone.grp_or_zone" :id="'zone' + zoneIndex" class="form-control">
                                                                <option v-for="(popOrZone, gpIndex) in zoneList" :key="gpIndex" :value="popOrZone.id" >{{ popOrZone.group_name}}</option>
                                                            </select>
                                                            <!-- <input type="text" v-model="zone.grp_or_zone" :id="'zone' + zoneIndex" class="form-control" placeholder="Zone or Group Name" /> -->
                                                        </div>
                                                        <!-- <div class="form-group" style="margin-right: 20px">
                                                            <label>Charge in BDT {{ zone.charge }}</label>
                                                            <input type="number" v-model="zone.charge" :id="'zone' + zoneIndex" class="form-control" placeholder="Charge in BDT" />
                                                        </div> -->

                                                        <div class="col-md-3" style="margin-top: 35px">
                                                            <button class="btn btn-success btn-sm" type="button" @click="addGroup(i, capIndex)">
                                                                <i class="fa fa-plus"></i>
                                                            </button>
                                                            <button class="btn btn-danger btn-sm" type="button" @click="removeGroup(i, capIndex, zoneIndex)">
                                                                <i class="fa fa-times"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2" style="margin-top: 5%">
                                                    <button v-if="item.capacity.length - 1 === capIndex" class="btn btn-success btn-sm" type="button" @click="addCapItem(i)">
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm" type="button" @click="removeCapItem(i, capIndex)">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="text-right p-3">
                                                <button v-if="sub_service.length - 1 === i" class="btn btn-success" type="button" @click="addItem()">
                                                    <i class="fa fa-plus mr-1"></i>
                                                    Add More
                                                </button>
                                                <button class="btn btn-danger" type="button" @click="removeItem(i)">
                                                    <i class="fa fa-times mr-1"></i>Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right mt-2">
                                    <button type="submit" class="btn btn-primary">Submit</button>
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

    props: ["itemData", "srrv", "name"],
    data() {
        return {
            loading: false,
            ipTransit: false,
            circuitList: [],
            licenceList: [],
            zoneList: [],
            // color:'',
            service: {
                id: "",
                service: "",
            },
            sub_service: [{
                sub_service_name: "",
                capacity: [{
                    capacity_name: "",
                    circuit_id: "",
                    max: "",
                    zone: [{
                        // charge: "",
                        grp_or_zone: "",
                    }, ],
                }, ],
            }, ],
        };
    },
    created() {
        this.getData();
        // this.getCircuit();
        this.circuitOrLicence();
        this.groupZoneOrPop();
    },
    methods: {
         groupZoneOrPop() {
            axios.get("/get-group-zone-pop-list/"+this.srrv)
                .then((response) => {
                    this.loading = false;
                    this.zoneList = response.data.data;
                });
        },

        circuitOrLicence() {
            if (this.srrv == 7) {
                this.ipTransit = true;
                this.getLicence();

            } else {
                this.ipTransit = false;
                 this.getCircuit();
            }
        },

        getCircuit(){
            axios.get("/get-circuit-list")
                .then((response) => {
                    this.loading = false;
                    this.circuitList = response.data.data;
                });

        },

        getLicence() {
            axios.get("/get-customer-serve/wise/type-list")
                .then((response) => {
                    this.loading = false;
                    this.licenceList = response.data.data;
                });

        },

        getData() {
            if (this.itemData) {
                this.service.id = this.srrv;
                this.service.service = this.name;
                // this.sub_service = this.itemData;
                console.log(this.sub_service);
            }
        },
        onSubmit() {
            // this.loading = true;
            const data = {
                id: this.srrv,
                service: this.name,
                sub_service: this.sub_service,
                zone: this.zone,
                capacity: this.capacity,
            }
            axios
                .post("/sub-service-store", data)
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "Data Upload Successfull.",
                    });
                    this.$emit("executeMethod");
                    $("#sub-service-add-modal").modal("hide");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                    $("#sub-service-add-modal").modal("hide");
                });
        },

        addItem() {
            this.sub_service.push({
                service: "",
                capacity: [{
                    capacity_name: "",
                    circuit_id: "",
                    max: "",
                    zone: [{
                        charge: "",
                        grp_or_zone: "",
                    }, ],

                }, ],
            });
        },
        removeItem(i) {
            this.sub_service.splice(i, 1);
        },

        addCapItem(i) {
            this.sub_service[i].capacity.push({
                capacity_name: "",
                circuit_id: "",
                max: "",
                zone: [{
                    // charge: "",
                    grp_or_zone: "",
                }, ],
            });
        },

        removeCapItem(i, cap) {
            this.sub_service[i].capacity.splice(cap, 1);
        },

        addGroup(i, cap) {
            this.sub_service[i].capacity[cap].zone.push({
                // charge: "",
                grp_or_zone: "",
            });

            console.log(this.sub_service[i].capacity[cap].zone);
        },

        removeGroup(i, cap, zone) {
            this.sub_service[i].capacity[cap].zone.splice(zone, 1);
        }

    },
};
</script>

<style scoped></style>
