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
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <div class="row">
                                <div class="col-md-3">
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
                                                v-model="invoice.sub_service_id"
                                            >
                                                <option
                                                    v-for="(
                                                        item, index
                                                    ) in subServiceList"
                                                    :key="index"
                                                    :value="item.id"
                                                >
                                                    {{ item.sub_service_name }}
                                                </option>
                                                <option
                                                    value=""
                                                    selected="selected"
                                                    disabled
                                                >
                                                    Select Submarine
                                                </option>
                                            </select>
                                            <span
                                                class="invalid-feedback d-block"
                                                >{{ errors[0] }}</span
                                            >
                                        </div>
                                    </ValidationProvider>
                                </div>

                                <!-- new License -->
                                <div class="col-md-3">
                                    <ValidationProvider
                                        name="licence_id"
                                        rules="required|min_value:1"
                                        v-slot="{ errors }"
                                    >
                                        <div class="form-group">
                                            <label
                                                >License
                                                <span class="text-danger"
                                                    >*</span
                                                >
                                            </label>
                                            <select
                                                class="form-control"
                                                style="width: 100%"
                                                v-model="invoice.licence_id"
                                            >
                                                <option
                                                    value=""
                                                    selected="selected"
                                                    disabled
                                                >
                                                    Select License
                                                </option>
                                                <option
                                                    v-for="(
                                                        item, index
                                                    ) in licenceList"
                                                    :key="index"
                                                    :value="item.id"
                                                >
                                                    {{ item.cus_type_name }}
                                                </option>
                                            </select>
                                            <span
                                                class="invalid-feedback d-block"
                                                >{{ errors[0] }}</span
                                            >
                                        </div>
                                    </ValidationProvider>
                                </div>
                                <!-- end new License -->

                                <!-- Zone Name -->
                                <div class="col-md-3">
                                    <ValidationProvider
                                        name="grp_or_zone_id"
                                        rules="required|min_value:1"
                                        v-slot="{ errors }"
                                    >
                                        <div class="form-group">
                                            <label
                                                >Group/Zone<span
                                                    class="text-danger"
                                                    >*</span
                                                >
                                            </label>
                                            <select
                                                class="form-control"
                                                style="width: 100%"
                                                v-model="invoice.grp_or_zone_id"
                                            >
                                                <option
                                                    value=""
                                                    selected="selected"
                                                    disabled
                                                >
                                                    Select Zone
                                                </option>
                                                <option
                                                    v-for="(
                                                        item, index
                                                    ) in groupZoneList"
                                                    :key="index"
                                                    :value="item.id"
                                                    v-if="
                                                        item.sub_service_id ==
                                                        invoice.sub_service_id
                                                    "
                                                >
                                                    {{ item.group_name }}
                                                    <!-- <input type="hidden" v-model=""> -->
                                                </option>
                                            </select>
                                            <span
                                                class="invalid-feedback d-block"
                                                >{{ errors[0] }}</span
                                            >
                                        </div>
                                    </ValidationProvider>
                                </div>
                                <!-- end Zone Name -->

                                <!-- Customer Name -->
                                <div class="col-md-3">
                                    <ValidationProvider
                                        name="customer_id"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <div class="form-group">
                                            <label>
                                                Customer
                                                <span class="text-danger"
                                                    >*</span
                                                ></label
                                            >
                                            <select
                                                class="form-control"
                                                style="width: 100%"
                                                v-model="invoice.customer_id"
                                            >
                                                <option
                                                    value=""
                                                    selected="selected"
                                                    disabled
                                                >
                                                    Select Customer
                                                </option>
                                                <option value="0">
                                                    All Customer
                                                </option>
                                                <option
                                                    v-for="(
                                                        item, index
                                                    ) in customerList"
                                                    :key="index"
                                                    :value="item[0].customer_id"
                                                >
                                                    {{
                                                        item[0].customers
                                                            .com_name
                                                    }}
                                                </option>
                                            </select>
                                            <span
                                                class="invalid-feedback d-block"
                                                >{{ errors[0] }}</span
                                            >
                                        </div>
                                    </ValidationProvider>
                                </div>
                                <!-- end customer -->
                            </div>

                            <div class="row">

                              <div class="col-md-12 text-center pb-3" style="padding-top: 30px;">
                                <button
                                    type="button"
                                    @click="showCustomerAndMrcInfo()"
                                    class="btn btn-primary float-center"
                                >
                                    Search
                                </button>
                                </div>
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
                                                v-for="(item, index, i) in demandNoteList" :key="index"
                                            >
                                                <td scope="row">{{ i+1}}</td>
                                                <td>
                                                    <input
                                                        type="hidden"
                                                        :id="
                                                            index + '_customer'
                                                        "
                                                        :value="
                                                            item.customer_id
                                                        "
                                                    />{{ item.customer_name }}
                                                </td>
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
                                                              style="display: block;"
                                                              >{{
                                                                  circuit.circuit_designation
                                                              }}
                                                              </p>
                                                      </td>

                                                      <td class="dateFillSize">
                                                          <p
                                                              v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                              class="badge badge-success " style="display: block;"
                                                              >{{
                                                                  circuit.name
                                                              }}</p
                                                          >
                                                      </td>

                                                  </tr>
                                                </table>
                                                </td>



                                                <td class="dateFillSize">
                                                   <p
                                                    v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                    class="badge"
                                                    style="display: block;"
                                                    >{{
                                                        circuit.approved_date
                                                    }}
                                                    </p>
                                                </td>
                                                <td class="dateFillSize">
                                                <p
                                                    v-for="(circuit, cIndex) in item.CablAndGroupWiseCircuits":key="cIndex"
                                                    class="badge"
                                                    style="display: block;"
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


                        </form>
                    </ValidationObserver>
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
            subServiceList: [],
            licenceList: [],
            groupZoneList: [],
            customerList: [],
            demandNoteList: [],
            circuitRate: 0,
            circuit5: 0,
            circuit6: 0,
            circuit7: 0,
            circuitDiscountRate: 0,
            circuitDiscount: 0,
            totalWithDiscount: 0,
            discountAmount: 0,
            rateForDiscount: 0,
            circuitRateDiscount: 0,

            rateForMbcAry: [],
            adjustAry: [],
            addOrSubAry: [],
            discountWiseOldMrcAry: [],
            OldMrcAry: [],
            mrcAry: [],
            vatAry: [],
            netAmountAry: [],
            allCustomer: [],

            customerId: "",
            rateForMbc: 0,
            adjust: 0,
            addOrSub: 1,
            discountWiseOldMrc: 0,
            OldMrc: 0,
            mrc: 0,
            vat: 0,
            vatResult: 0,
            remarks: [],
            mrcAndMbcCount: 0,

            invoice: {
                demand_note_id: "",
                service_id: this.$route.params.id,
                sub_service_id: "",
                licence_id: "",
                grp_or_zone_id: "",
                customer_id: "",
                cus_type_id: "",
                billing_month: "",
            },
        };
    },

    created() {
        this.visibleForm = true;
        this.service_id = this.$route.params.id;
        this.getSubServiceList();
        // alert(this.$route.params.id);
    },
    watch: {
        "invoice.sub_service_id": function () {
            this.getLicenceList(this.invoice.service_id);
        },

        "invoice.licence_id": function () {
            this.getzoneList(
                this.invoice.service_id,
                this.invoice.sub_service_id
            );
        },

        "invoice.grp_or_zone_id": function () {
            this.getcustomerList(
                this.invoice.service_id,
                this.invoice.sub_service_id,
                this.invoice.licence_id,
                this.invoice.grp_or_zone_id
            );
        },
    },

    methods: {
        // getTotalCircuitDiscount(circuitList) {
        //     this.circuitDiscount = 0;

        //     circuitList.forEach((value, index) => {
        //         this.circuitDiscount += value.discount;
        //     });

        //     return this.circuitDiscount;
        // },

        // billInfo(item, index) {
        //     return parseFloat(item.bill);
        // },
        // billInfoWith10Discount(item, index) {
        //     return (this.billInfo(item, index) - (this.billInfo(item, index)/100*item.discount)).toFixed(2)
        // },

        // mrcMbcAndAdjustCalculation(item, index) {
        //     const mrcAndMbcCount = parseFloat(item.mbc) + parseFloat(this.billInfoWith10Discount(item, index) );
        //     let mrc = 0;

        //     if (item.add_sub == 1) {
        //         mrc = mrcAndMbcCount + parseFloat(item.adjust);
        //     } else {
        //         mrc = mrcAndMbcCount - parseFloat(item.adjust);
        //     }
        //     return mrc.toFixed(2);
        // },

        // mrcMbcAdjustWiseVatCalculation(item, index) {
        //     const vat =
        //         (this.mrcMbcAndAdjustCalculation(item, index) / 100) * 5;
        //     return vat.toFixed(2);
        // },

        // mrcMbcAdjustVatCalculation(item, index) {
        //     const netAmount =parseFloat(this.mrcMbcAndAdjustCalculation(item, index)) + parseFloat(this.mrcMbcAdjustWiseVatCalculation(item, index));

        //     this.rateForMbcAry[index] = item.mbc;
        //     this.adjustAry[index] = item.adjust;
        //     this.addOrSubAry[index] = item.add_sub;
        //     this.discountWiseOldMrcAry[index] = this.billInfoWith10Discount(item,index);
        //     this.OldMrcAry[index] = item.bill;
        //     this.mrcAry[index] = this.mrcMbcAndAdjustCalculation(item, index);
        //     this.vatAry[index] = this.mrcMbcAdjustWiseVatCalculation(item,index);
        //     this.allCustomer[index] = item.customer_id;
        //     this.netAmountAry[index] = netAmount;
        //     this.remarks[index] = item.remarks;
        //     return netAmount.toFixed(2);
        // },

        getSubServiceList() {
            // this.loading = true;
            axios
                .post("/get-sub-service-list", {
                    service_id: this.$route.params.id,
                })
                .then((res) => {
                    this.loading = false;
                    this.subServiceList = "";
                    this.licenceList = "";
                    this.groupZoneList = "";
                    this.subServiceList = res.data.data;
                })
                .catch(() => {});
        },

        getLicenceList(id) {
            // this.loading = true;
            axios
                .post("/get-license-type", { service_id: id })
                .then((res) => {
                    this.loading = false;
                    this.licenceList = "";
                    this.groupZoneList = "";
                    this.licenceList = res.data.data;
                })
                .catch(() => {});
        },
        getzoneList(service_id, sub_service_id) {
            // this.loading = true;
            axios
                .post("/get-group/zone", {
                    service_id: service_id,
                    sub_service_id: sub_service_id,
                })
                .then((res) => {
                    this.loading = false;
                    this.groupZoneList = "";
                    this.groupZoneList = res.data.data;
                })
                .catch(() => {});
        },

        getcustomerList(
            service_id,
            sub_service_id,
            licence_id,
            grp_or_zone_id
        ) {
            // this.loading = true;
            axios
                .post("/get/service/sub-service/group-zone/wise/customer", {
                    service_id: service_id,
                    sub_service_id: sub_service_id,
                    licence_id: licence_id,
                    grp_or_zone_id: grp_or_zone_id,
                })
                .then((res) => {
                    this.loading = false;
                    this.customerList = res.data.data;
                })
                .catch(() => {});
        },

        showCustomerAndMrcInfo() {
            // this.loading = true;
            axios
                .post(
                    "/get/service/sub-service/group-zone/customer/wise/demandNote/report",
                    {
                        service_id: this.invoice.service_id,
                        sub_service_id: this.invoice.sub_service_id,
                        grp_or_zone_id: this.invoice.grp_or_zone_id,
                        customer_id: this.invoice.customer_id,
                    }
                )
                .then((res) => {
                    this.loading = false;
                    this.demandNoteList = res.data.data;
                    //    this.allCircuitList = res.data.allCircuit;
                })
                .catch(() => {});
        },

        onSubmit() {
            console.log(this.vatAry);
            axios
                .post("/bill-rocess", {
                    allCustomer: this.allCustomer,
                    demandNoteList: this.demandNoteList,
                    netAmountAry: this.netAmountAry,
                    remarks: this.remarks,
                    rateForMbcAry: this.rateForMbcAry,
                    adjustAry: this.adjustAry,
                    addOrSubAry: this.addOrSubAry,
                    discountWiseOldMrcAry: this.discountWiseOldMrcAry,
                    OldMrcAry: this.OldMrcAry,
                    mrcAry: this.mrcAry,
                    vatAry: this.vatAry,
                    service_id: this.invoice.service_id,
                    sub_service_id: this.invoice.sub_service_id,
                    grp_or_zone_id: this.invoice.grp_or_zone_id,
                    licence_id: this.invoice.licence_id,
                    billing_month: this.invoice.billing_month,
                })
                .then((res) => {
                    this.loading = false;
                    this.$router.push({
                        // name: 'IplcBillProcess',
                        name: "IplcBillingList",
                        params: { id: this.$route.params.id },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Successfully Process Monthly bill info .",
                    });
                    this.$emit("executeMethod");
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong.. Please try again!",
                    });
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
p{
    padding:5px;
    margin:5px;
}
</style>
