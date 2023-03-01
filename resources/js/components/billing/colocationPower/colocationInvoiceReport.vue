<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="conatiner-fluid">
                <div class="row mb-2">
                    <div class="col-md-2 offset-10">
                        <button @click="print" type="button" class="btn btn-info float-left">
                            <i class="fa fa-print"></i> Print </button>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mt-3">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-2">
                                        <img src="/assets/dist/logo/logo.png" />
                                    </div>
                                    <div class="col-md-8 text-center">
                                        <h3>
                                            <span style="color: green">বাংলাদেশ সাবমেরিন ক্যাবল কোম্পানি লিমিটেড
                                                (বিএসসিসিএল) <br />
                                            </span>
                                            <span style="color: blue"> Bangladesh Submarine Cable Company Limited
                                                (BSCCL) </span>
                                        </h3>
                                    </div>
                                    <div class="col-md-2">
                                        <img src="/assets/dist/logo/download.jpg" />
                                    </div>
                                </div>
                                <hr />
                                <!-- <div class="text-center"><h3><strong>Demand note for  finddata.services.service Connection</strong></h3></div> -->
                            </div>
                            <!-- start card-body -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <h2 class="text-center">
                                            <strong> Invoice</strong>
                                        </h2>
                                        <div class="col-md-12 tableStyle">
                                            <table class="table">
                                                <tr style="border: 1px solid black">
                                                    <td style="

                                  border: 1px solid black;

                                  width: 50%;

                                  padding-left: 20px;

                                "> To <br />Managing Director <br />
                                                         {{billInfo.company}}
                                                        <br />
                                                         {{billInfo.address}}
                                                        <br /> BIN:  {{billInfo.bin}}
                                                    </td>
                                                    <td style="border: 1px solid black"> Invoice No.:
                                                        BSCCL/BWP/IIG/BILL/SUMMIT/12-13/ <br /> Issue Date:
                                                         {{moment(billInfo.bill_process_date).format( "Do.MMMM .YYYY" )}}
                                                        <br /> Issue Bill for the Month:
                                                         {{moment(billInfo.billing_month).format( "MMMM.YYYY" )}}
                                                        <br /> VAT Registration No.:  {{billInfo.bin}}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end card-body -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <h6 class="text-center">
                                            <strong>Description of Bill
                                                ( {{billInfo.grpName}} )</strong>
                                        </h6>
                                        <table class="table table-bordered table-striped">
                                            <thead style="border: 1px solid black">
                                                <tr style="border: 1px solid black">
                                                    <th>SL</th>
                                                    <th>Billing Period</th>
                                                    <th> Rate for Rack Space (40,000/Rack) (6,000/4U)</th>
                                                    <th>Rate of Per KW (DC)</th>
                                                    <th>MRC For Rack Charge (BDT) TK</th>
                                                    <th>MRC For Power Consumption (BDT) TK</th>
                                                    <th>MRC For Rack & Power Consumption (BDT) TK</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="border: 1px solid black">
                                                    <td>1</td>

                                                    <td>
                                                       {{  moment(billInfo.billing_month).format( "DD.MM.YYYY" ) + " To " + moment(billInfo.billing_month) .add(1, "M") .format("DD.MM.YYYY")}}
                                                    </td>

                                                    <td>{{rateForRack(billInfo.total_rack)}}</td>
                                                    <td>18000</td>
                                                    <td>{{rateForRack(billInfo.total_rack)}}</td>
                                                    <td>{{rateForPower(billInfo.total_power)}}</td>
                                                    <!-- <td>{{rateForPower(billInfo.total_power)+rateForRack(billInfo.total_rack)}}</td> -->
                                                    <td>  {{subTotalForVat}} </td>
                                                    <td v-if="billInfo.remarks !='none' || billInfo.remarks =='0'">  {{billInfo.remarks}} </td>
                                                    <td v-else></td>
                                                </tr>

                                                <tr>
                                                    <td style="text-align: right" colspan="6">
                                                        <strong class="text-center">Total</strong>
                                                    </td>
                                                    <td colspan="9">{{subAdjustMontBillAndDemondnote(billInfo.total_power,billInfo.total_rack).toFixed(2)}} </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: right" colspan="6">
                                                        <strong class="text-center">Vat(5%)</strong>
                                                    </td>
                                                    <td colspan=""> {{vatSubAndAdjustWise().toFixed(2)}} </td>
                                                    <td colspan=""> VAT amount may be changed according to the opinion
                                                        of VAT authority. </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: right" colspan="6">
                                                        <strong class="text-center">Net Bill</strong>
                                                    </td>
                                                    <td colspan="9"> {{netTotalinAllCalculate().toFixed(2)}} </td>
                                                </tr>
                                                 <tr>
                                                    <td style="text-align: right" colspan="6">
                                                        <strong class="text-center">Previous Due</strong>
                                                    </td>
                                                    <td colspan="9">0.00</td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: right" colspan="6">
                                                        <strong class="text-center">Total Due</strong>
                                                    </td>
                                                    <td colspan="9">0.00</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="11" class="text-center"> In words (Taka) :
                                                      {{netTotalinAllCalculate() | toWords }}. </td>
                                                </tr>

                                                <!-- <tr>
                                                    <td colspan="11" class="text-center"> কথায়  (টাকা) :
                                                     {{ netTotalinAllCalculate() | toWords('BDT')}}  টাকা মাত্র . </td>
                                                </tr> -->
                                                <tr>
                                                    <td colspan="11" class="text-center">
                                                        <strong> In respect of the bill, please issue payorder for Tk.
                                                          {{ netTotalinAllCalculate().toFixed(2) }} in favour of “Bangladesh Submarine Cable
                                                            Company Limited”.</strong>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->
                    </div>
                    <!-- <div class="col-md-12 mb-5 ml-3">

                In words (Taka) :  billInfo.net_total | toWords BDT Only.

                <br /><strong>

                  In respect of the bill, please issue payorder for Tk.

                   billInfo.net_total in favour of “Bangladesh Submarine Cable

                  Company Limited”.</strong

                ></div> -->
                    <div class="col-md-6 text-center mb-5" style="padding-top: 20px">
                        <p class="mb-0">Deputy General Manager (Finance & Accounts)</p>
                        <p class="mb-0">Bangladesh Submarine Cable Co. Ltd. (BSCCL)</p>
                        <p class="mb-0">Phone : 8879285</p>
                        <p class="mb-0">Fax : 8879193</p>
                    </div>
                    <div class="col-md-6 text-center mb-5 mb-5" style="padding-top: 20px">
                        <p class="mb-0">Deputy General Manager (Customer Care)</p>
                        <p class="mb-0">Bangladesh Submarine Cable Co. Ltd. (BSCCL)</p>
                        <p class="mb-0">Phone : 8879192</p>
                        <p class="mb-0">Fax : 8879193</p>
                    </div>
                    <div class="col-md-12 text-left pl-4 pb-4">
                        <p class="mb-0">Copy To:</p>
                        <p class="mb-0">1. General Manager, (Admin & Finance), BSCCL.</p>
                        <p class="mb-0">2. General Manager (M & S), BSCCL</p>
                        <p class="mb-0">3. Deputy General Manager (BWP), BSCCL.</p>
                        <p class="mb-0"> 4. Deputy General Manager (Internal Audit), BSCCL. </p>
                        <p class="mb-0">5. PA to MD, BSCCL.</p>
                        <p class="mb-0">6. Office Copy.</p>
                    </div>
                    <!-- end row -->
                </div>
            </div>
        </section>
        <!-- div content wrapper -->
    </div>
</template>

<script>
    import moment from "moment";
    export default {
        data() {
            return {
                billList: [],
                billInfo: {},
                netTotalBill: 0,
                subTotalForVat: 0,
                subTotalWiseVat: 0,
                vatTotalBill: 0,
                subTotalBill: 0,
                //   customer: {},
            };
        },

        beforeCreate() {},
        created() {
            this.moment = moment;
            // alert('ookk')
            this.permissionforInvoiceGanarete();
        },

        methods: {

              rateForPower(rateList){
                var data = 0;
                    rateList.forEach(function(item, index, array) {
                        data += item.rate
                    })
                    return this.powerRate =  data;
                },

                rateForRack(rateList){
                var data = 0;
                    rateList.forEach(function(item, index, array) {
                        data += item.rate
                    })
                    return this.rackspaceRate =  data;
                },



            subAdjustMontBillAndDemondnote(total_power, total_rack){

                return (this.subTotalForVat = this.rateForPower(total_power) + (this.rateForRack(total_rack)));

            },

            vatSubAndAdjustWise(){
                return this.subTotalWiseVat = this.subTotalForVat/100*5;
            },

            netTotalinAllCalculate(){
                return this.subTotalWiseVat +this.subTotalForVat;
            },


            circuitName(item, index) {
                return item.circuit_id.split(',');
            },

            permissionforInvoiceGanarete() {
                axios
                    .post("/colocation/port-bill/invoice-ganarete", {
                        id: this.$route.params.id
                    })
                    .then((response) => {
                        this.billInfo = response.data.data;
                        // console.log(response.data.data.company)
                        // Toast.fire({
                        //     icon: "success",
                        //     title: "Successfully Done Invoice Generate.",
                        // });
                    })
                    .catch(() => {});
            },

            print() {
                window.print();
            },
        },

        computed: {

        },
    };

</script>

<style>
    .tableStyle {
        margin: 0 auto;
    }

</style>
