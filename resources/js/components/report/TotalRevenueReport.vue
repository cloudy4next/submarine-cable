<template>
    <div class="content-wrapper">
        <div class="modal-header">
            <h4 class="modal-title mr-3" style="color: blue">
                <b>Billing Reports (IPLC)</b>
            </h4>
            <div class="col-md-2">
            <button
              @click="print"
              type="button"
              class="btn btn-info float-left"
            >
              <i class="fa fa-print"></i>
              Print
            </button>
          </div>
        </div>

        <div class="modal-body">
            <div class="card card-primary">
                <div class="overlay" v-if="loading">
                    <i class="fa fa-spinner fa-spin"></i>
                </div>
                <div class="card-body" v-if="visibleForm">

                        <div class="row">

                            <div class="col-md-4 text-center pb-3" style=""></div>
                            <div class="col-md-4 text-center pb-3" style="">
                                <label for="inputMonth" class="form-label">Please Select Month</label>
                                <input id="inputMonth" type="date" v-model="dateForBill" class="form-control"  @change="dateWiseBillShow()"/>
                            </div>
                            <div class="col-md-4 text-center pb-3" style=""></div>

                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped table-bordered table-hover w-100" style="min-width: 100%; padding-buttom:200px" >
                                    <thead class="thead-light">
                                        <tr>
                                            <th scope="col">SL</th>
                                            <th
                                                title="Clients Name & Address"  style="width:150px">
                                                Clients Name & Address
                                            </th>

                                            <th scope="col"
                                                title=" Businees Type">
                                                Businees Type
                                            </th>
                                                <th>
                                                    <table>
                                                    <tr>
                                                        <th colspan="2" class="text-center"  style="min-width:200px">Bandwidth used</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="min-width:140px">Circuit Details</th>
                                                        <th style="min-width:60px">STM Used</th>
                                                    </tr>
                                                    </table>
                                                </th>
                                                <th scope="col"
                                                title="Activation Date">Activation Date</th>
                                                <th>Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="border: 2px solid red; border-radius: 10px;"
                                            v-for="(item, index) in demandNoteList" :key="index">
                                            <td scope="row">{{ index }}</td>
                                            <td>{{ item.customer_name }}</td>
                                            <td class="dateFillSize">
                                            <span
                                                    class="badge badge-primary dateFillSize"
                                                    >{{
                                                        item.type
                                                    }}</span
                                                >
                                            </td>
                                            <td>
                                            <table>
                                                <tr>
                                                    <td class="dateFillSize">
                                                    <p
                                                            v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                            class="badge"
                                                            >{{
                                                                circuit.circuit_designation
                                                            }}
                                                            </p>
                                                    </td>

                                                    <td class="dateFillSize">
                                                        <h6
                                                            v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                            class="badge badge-success"
                                                            >{{
                                                                circuit.name
                                                            }}</h6
                                                        >
                                                    </td>

                                                </tr>
                                            </table>
                                            </td>



                                            <td class="dateFillSize">
                                                <p
                                                v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                class="badge"
                                                >{{
                                                    circuit.approved_date
                                                }}
                                                </p>
                                            </td>
                                            <td class="dateFillSize">
                                            <p
                                                v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                class="badge"
                                                >{{
                                                    circuit.remarks
                                                }}
                                                </p>
                                            </td>


                                        </tr>
                                    </tbody>

                                </table>
                                <br>
                                <br>
                                <br>

                                <table class="" style="min-width: 100%; padding-top:200px;">
                                        <tfoot>
                                        <tr>
                                            <td> <b>Assistant Manager(Billing)</b></td>
                                            <td> <b>Deputy  Manager (CC & Billing)</b></td>
                                            <td> <b>Manager (CC)</b></td>
                                            <td> <b>Deputy General Manager (F&A)</b></td>
                                            <td> <b>Deputy General Manager (CC)</b></td>
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>
                        </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["item"],
    data() {
        return {
            loading: false,
            visibleForm: false,
            dateForBill: "",

        };
    },

    created() {
        this.visibleForm = true;
        this.service_id = this.$route.params.id;
        this.getSubServiceList();
        // alert(this.$route.params.id);
    },

    methods: {

        dateWiseBillShow(){
            // alert('oookkk');
            // alert(this.dateForBill);
        axios
            .post("/get/month/wise/total/revenue/report",{
            date:this.dateForBill,
            })
            .then((res) => {
            this.loading = false;
            this.demandNoteList = res.data.data;
            });
        },


        print() {
            window.print();
        },
    },

    computed: {},
};
</script>

<style scoped>
.bulk-tag {
    margin-left: 14%;
    margin-bottom: 0px;
    margin-top: 7px;
}

table {
    width: 100%;
}

tbody tr td {
    width: auto;
}
.inputFillSize {
    width: 100%;
}

.dateFillSize {
    width: 70px;
}
.mrcAndDiscount {
    width: 95px;
}
</style>
