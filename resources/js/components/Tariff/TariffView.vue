<template>
<div class="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h3>Services Name : {{ findData[0].subservice.service.service}}</h3>
                    <h6>Sub-Services Name : {{ findData[0].subservice.sub_service_name}}</h6>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" class="btn btn-outline-primary" @click="TariffList(findData[0].subservice.service)">
                        <i class="fa fa-plus mr-1"></i> Tariff List
                    </button>
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
                            <table id="example1" class="table table-bordered table-striped table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th colspan="7" class="text-center"><strong>{{ findData[0].subservice.sub_service_name}}</strong></th>
                                    </tr>
                                    <tr>
                                        <th>SL</th>
                                        <th>Capacity</th>
                                        <th>Inist Charge</th>
                                        <th>Group/Zone</th>
                                        <th>Tariff</th>
                                        <th>Vat (%)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                      <tr v-if="findData.length == 0" class="text-center">
                                        <td colspan="6">Data Not Found</td>
                                        <span>Data Not Found</span>
                                        <td colspan="2"></td>
                                    </tr>

                                      <tr v-for="(item,index) in findData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{ item.capacity_name}}</td>
                                        <td>{{ item.instl_charge}}</td>
                                         <td>
                                            <table class="table table-bordered table-striped table-hover table-sm">
                                                <tr v-for="(zone, i ) in item.zone" :key="i" >
                                                    <td>{{ zone.groups.group_name }}</td>
                                                </tr>
                                            </table>
                                        </td>
                                         <td>
                                            <table class="table table-bordered table-striped table-hover table-sm">
                                                <tr v-for="(zone, i ) in item.zone" :key="i" >
                                                    <td>{{ zone.charge }}</td>
                                                </tr>
                                            </table>
                                        </td>
                                         <td>
                                            <table class="table table-bordered table-striped table-hover table-sm">
                                                <tr v-for="(zone, i ) in item.zone" :key="i" >
                                                    <td>{{ zone.vat }}</td>
                                                </tr>
                                            </table>
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
    props:{
        id:{
            required: true,
            type: Number,
        }
    },
    data() {
        return {
            selectedSubService: null,
            loading: false,
            visibleModal: false,
            servId: this.id,
            servName: this.name,
            subServiceName: '',
            findData: [],


        };
    },
    created() {
        this.findCapacity();
    },
    methods: {
        addTariffInSubService(item) {
            this.selectedSubService = item
            console.log(this.selectedSubService)

            this.visibleModal = true;
            $("#tariff-modal").modal("show");

        },

        TariffList(service){
            console.log(service);
            this.$router.push({
                path: "/tariff-list/:id/:name",
                props: true,
                name: "TariffList",
                params: {
                    id: service.id,
                    name: service.service,
                }
            });
        },

        findCapacity(){
            this.loading = false;
            axios.post("/get-capacity-list", {sub_service_id:this.id}).then((response) => {
            this.loading = false;
            this.findData = response.data.data;
            });
        }


    },
};
</script>

<style lang=""></style>
