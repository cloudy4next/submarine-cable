<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <!--
                <div class="col-sm-9" style="padding-left:20px; padding:0px">
                    <p>Reference No: 14.34.0000.123.52.028.21</p>
                </div> -->
                    <div class="col-md-2">
                        <button @click="print" type="button" class="btn btn-info">
                            <i class="fa fa-print"></i>
                            Print
                        </button>
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
                                            <span style="color:green">বাংলাদেশ সাবমেরিন ক্যাবল কোম্পানি লিমিটেড (বিএসসিসিএল)
                                                <br>
                                            </span>
                                            <span style="color:blue">
                                                Bangladesh Submarine Cable Company Limited (BSCCL)
                                            </span>
                                        </h3>
                                    </div>
                                    <div class="col-md-2">
                                        <img src="/assets/dist/logo/download.jpg" />
                                    </div>
                                </div>
                                <hr>
                                <div class="text-center">
                                    <h3>
                                        <strong>Demand note for {{ finddata.services.service }} Connection</strong>
                                    </h3>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <!-- <div class="col-md-1"></div> -->
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-8" style="margin-left:20px">
                                                <p>Reference No:
                                                    14.34.0000.{{ Department }}.{{ Subject }}.{{ ClientId }}.{{ Year }}.{{
                                                        DemandNoteNumber }}
                                                </p>
                                                <p class="mb-0">Name of the Company :<strong>{{ finddata.customers.com_name
                                                }}</strong></p>
                                                <p class="mb-0">BIN Number : {{ finddata.customers.bin_vat_etc }}</p>
                                                <p class="mb-0">Address :{{ finddata.customers.address }}</p>
                                                <p class="mb-0">Contact Person : {{ finddata.customers.name }}</p>
                                                <p class="mb-0">Contact Number : {{ finddata.customers.phone }}</p>

                                                <p class="mb-0">Customer Type : {{ customerType }}</p>
                                                <p class="mb-0">Wet Segment Route : {{ finddata.zonelist.grp_or_zone }}</p>
                                                <p class="mb-0">Bandwidth : {{ circuitType }} (
                                                    {{ finddata.subservice.sub_service_name }} )</p>
                                                <!-- <p class="mb-0">Current Utilization : </p> -->
                                            </div>
                                            <div class="col-md-3">
                                                <p class="mt-0">Issue Date
                                                    :{{ moment(finddata.created_at).format('DD.MM.YYYY') }}</p>
                                                <p class="mb-0" v-if="finddata.approved_date != NULL">Approval Date
                                                    :{{ moment(finddata.approved_date).format('DD.MM.YYYY') }} </p>
                                                <p class="mb-0">For Office Use Only</p>
                                                <p class="mb-0" v-if="finddata.service_id == 1">ID No ::
                                                    DN({{ cableType }})/{{ customerType }}/{{ circuitType }}/{{
                                                        iplcTotalDemandNote }}
                                                </p>

                                                <p class="mb-0" v-if="finddata.count_demand_note == 1">
                                                    Connection :New
                                                </p>
                                                <p class="mb-0" v-else>
                                                    Connection :Renewal
                                                </p>
                                                <p class="mb-0">Commitment Period :</p>
                                                <p class="mb-0">
                                                    Discount applicable : {{ finddata.discount + ' %' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- <hr><br> -->
                            <div class="card-body">
                                <table id="example1" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                Registration charge(Non-recurring Charge)
                                            </td>
                                            <td class="text-right" v-if="finddata.count_demand_note <= 1">
                                                <span v-if="finddata.service_id == 1"> {{ (3000 * finddata.rackQty) }}
                                                    BDT</span>
                                                <span v-else>0 BDT</span>
                                            </td>
                                            <td class="text-right" v-else>
                                                00.00
                                            </td>
                                            <td></td>
                                        </tr>
                                        <!-- <tr>
                                            <td>2</td>
                                            <td>
                                                Installation charge for {{ finddata.capacity.capacity_name }}
                                            </td>
                                            <td class="text-right">
                                                <span>{{ finddata.capacity.instl_charge + ' BDT' }}</span>
                                            </td>
                                        </tr> -->
                                        <tr v-if="finddata.service_id == 23">
                                            <td>2</td>
                                            <td>
                                                MRC for Rack Space
                                            </td>
                                            <td class="text-right">
                                                {{ totalRackPrice + ' BDT' }}
                                            </td>
                                            <td class="text-center">
                                                {{ 'Rack Price is ' + finddata.rack + ' & Qty ' + finddata.rackQty }}
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td>3</td>
                                            <td>
                                                Monthly Recurring Charge (MRC) for
                                                {{ finddata.capacity.capacity_name }}
                                            </td>
                                            <td class="text-right">
                                                {{ finddata.mrc }} BDT
                                            </td>
                                            <td class="text-center">On the slab of {{ finddata.capacity.capacity_name }}
                                            </td>
                                        </tr> -->
                                        <tr v-if="finddata.service_id == 23">
                                            <td>3</td>
                                            <td>
                                                Power Consumption
                                            </td>
                                            <td class="text-right">
                                                {{ totalPowerPrice + ' BDT' }}
                                            </td>
                                            <td class="text-center">
                                                {{ 'Rack Price is ' + finddata.Power + ' & Qty ' + finddata.PowerQty }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                Total MRC after discount
                                            </td>
                                            <td class="text-right">
                                                {{ totalAfterDiscount + ' BDT' }}
                                            </td>
                                            <td class="text-center">
                                                {{ finddata.discount + ' %' }}
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td>5</td>
                                            <td>
                                                Total Monthly Recurring Charge
                                            </td>
                                            <td class="text-right">
                                                {{ totalAfterDiscount + ' BDT' }}
                                            </td>
                                            <td class="text-center"></td>
                                        </tr> -->

                                        <!-- 
                                        <tr v-if="finddata.add_sub == 1">
                                            <td>6</td>
                                            <td>{{ finddata.remarks }}</td>
                                            <td class="text-right">
                                                {{ totalAfterDiscount + (finddata.specialDiscount) + ' BDT' }}
                                            </td>
                                            <td class="text-center">
                                                {{ finddata.specialDiscount + ' BDT ' + ' is Add' }}
                                            </td>
                                        </tr> -->
                                        <!-- <tr v-if="finddata.add_sub == 2">
                                            <td>6</td>
                                            <td>{{ finddata.remarks }}</td>
                                            <td class="text-right">
                                                {{ totalAfterDiscount - (finddata.specialDiscount) + ' BDT' }}
                                            </td>
                                            <td class="text-center">
                                                {{ finddata.specialDiscount + ' BDT ' + 'This amount is Subtract ' }}
                                            </td>
                                        </tr> -->


                                        <tr>
                                            <td v-if="finddata.service_id == 23">5</td>
                                            <td v-else>7</td>
                                            <td>VAT(5% on all charges) </td>
                                            <td class="text-right">
                                                {{ vatAmount }} BDT
                                            </td>
                                            <!-- <td class="text-center">
                                                {{ vat }} % Amount {{ vatAmount + ' BDT ' }}
                                            </td> -->
                                        </tr>
                                        <tr>
                                            <td v-if="finddata.service_id == 23">6</td>
                                            <td v-else>6</td>
                                            <td>
                                                Total Payable Amount
                                            </td>
                                            <td class="text-right">
                                                {{ totalPayable }}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td v-if="finddata.service_id == 23">7</td>
                                            <td v-else>8</td>
                                            <td>
                                                Security deposit (One month’s rental - refundable)
                                            </td>
                                            <td class="text-right">{{ finddata.deposit + ' BDT ' }}</td>

                                            <!-- <td class="text-center">{{mrcVatDeposit +' BDT '}}</td> -->
                                        </tr>

                                        <!-- <tr>
                                            <td v-if="finddata.service_id == 23">11</td>
                                            <td v-else>9</td>
                                            <td>Sub-Total Amount</td>
                                            <td class="text-right" v-if="finddata.count_demand_note <= 1">
                                                <span v-if="finddata.service_id == 1">
                                                    {{ mrcVatDeposit + 20000 }} BDT
                                                </span>
                                                <span v-else>
                                                    {{ mrcVatDeposit + 10000 }} BDT
                                                </span>
                                            </td>
                                            <td class="text-right" v-else>
                                                {{ mrcVatDeposit }}</td>
                                            <td></td>
                                        </tr> -->

                                        <tr>
                                            <td v-if="finddata.service_id == 23"></td>
                                            <td v-else>6</td>
                                            <td class="text-center">
                                                <strong>Total</strong>
                                            </td>
                                            <td class="text-right">
                                                {{ mrcVatDepositWithReg }}</td>
                                            <td></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 offset-2 mb-5">
                        <p>
                            In words (Taka) : {{ mrcVatDepositWithReg | toWords }}.
                        </p>
                    </div>


                    <div class="col-md-6 text-center" style="padding-top: 100px" v-if="manager[0]">
                        <!-- <p class="mb-0"> <img :src="manager[0].sign"  alt="Photo" width="250" height="80px"> </p> -->
                        <p class="mb-0"> <img :src="previewImage" alt="Photo" width="250" height="80px"> </p>
                        <p class="mb-0">{{ manager[0].name }}</p>
                        <p class="mb-0">{{ manager[0].designation }}</p>
                    </div>
                    <div class="col-md-6 text-center mb-5" style="padding-top: 100px" v-if="manager[1]">
                        <p class="mb-0"> <img :src="previewSign" alt="Photo" width="250" height="80px"> </p>
                        <p class="mb-0">{{ manager[1].name }}</p>
                        <p class="mb-0">{{ manager[1].designation }}</p>
                    </div>
                    <div class="col-md-12 text-left pl-4 pb-4">
                        <p class="mb-0"> <b>Note :</b> <strong>
                                Please issue payorder in favour of "Bangladesh Submarine Cable Company Limited" with an
                                amount of Tk. {{ mrcVatDepositWithReg.toFixed(2) }}
                            </strong> </p>
                        <p class="mb-0 pl-5"> <strong>
                                VAT amount may be changed according to the opinion of the VAT authority
                            </strong></p>
                        <p class="mb-0 pl-5">ln addition to the standard IPLC Agreement, the terms and reference mentioned
                            in the tariff scheme will be applicable.</p>

                    </div>


                    <div class="col-md-12 text-left pl-4 pb-4" v-if="finddata.service_id == 23">
                        <p class="mb-0"> <b>Copy To: 1 General Manager (O&M). BSCCL</b> </p>
                        <p class="mb-0 pl-5"> <b class="pl-3">2 Deputy General Manager(CC). BSCCL</b></p>
                        <p class="mb-0 pl-5"> <b class="pl-3">3 Deputy General Manager(F&A). BSCCL</b></p>
                        <p class="mb-0 pl-5"> <b class="pl-3">4 PA to Managing Director,BSCCL</b></p>
                        <p class="mb-0 pl-5"> <b class="pl-3">5 Office Copy</b></p>
                    </div>

                    <div class="col-md-12 text-left pl-4 pb-4" v-else>
                        <p class="mb-0"> <b>Copy To: 1 Deputy General Manager, Customer Care, BSCCL</b> </p>
                        <p class="mb-0 pl-5"> <b class="pl-3">2 Manager, Finance & Accounts, BSCCL</b></p>
                    </div>


                </div>
            </div>
        </section>
    </div>
</template>

<script>
import moment from 'moment';
export default {

    props: {
        id: {
            required: true,
            type: Number,
        }
    },
    data() {
        return {
            previewImage: "../../uploads/sign.png",
            previewSign: "../../uploads/sign2.png",
            finddata: {},
            manager: [],
            id: '',
            iptransitTotalDemandNote: '',
            iplcTotalDemandNote: '',
            vat: 5,
        };
    },
    created() {
        // alert('ookk');
        this.id = this.$route.params.id;
        this.moment = moment;
        this.findDemandInfo();
        this.countTotalIplcDemandTote(1);
        this.countTotalIpTransitDemandTote(7);
    },
    methods: {

        findDemandInfo() {
            this.loading = true;
            axios.post("/get-colocation/demand-note-info", { id: this.$route.params.id }).then((response) => {
                this.loading = false;
                this.finddata = response.data.data;
                this.manager = response.data.manager;
            });
        },
        countTotalIplcDemandTote(id) {
            this.loading = true;
            axios.post("/count-total-demand-note", { id: id }).then((response) => {
                this.loading = false;
                this.iplcTotalDemandNote = response.data.data;
            });
        },
        countTotalIpTransitDemandTote(id) {
            this.loading = true;
            axios.post("/count-total-demand-note", { id: id }).then((response) => {
                this.loading = false;
                this.iptransitTotalDemandNote = response.data.data;
            });
        },

        print() {
            window.print();
        },
    },
    computed: {
        Department() {
            return 'Co-Department';
        },
        Subject() {
            return 'Co-Subject';
        },
        ClientId() {
            return this.finddata.customer_id;
            // return 'Co-ClientId';
        },
        Year() {
            return moment(this.finddata.created_at).format('YY');
        },
        DemandNoteNumber() {
            return 'Co-DemandNoteNumber';
        },
        cableType() {
            return 'Co-cable Type N/A';
        },
        customerType() {
            return this.finddata.customers.custype.cus_type_name;
            //  return 'Co-customer Type';
        },
        circuitType() {

            return 'Co-circuit Type';
        },
        totalAfterDiscount() {
            return this.finddata.mrc2 - (this.finddata.mrc2 * this.finddata.discount / 100);
        },
        // totalAfterDiscountAndAdjust() {
        //     if (this.finddata.add_sub == 1) {
        //         return this.totalAfterDiscount + this.finddata.specialDiscount+' BDT ' +'This amount is Add ';
        //     } else {
        //         return this.totalAfterDiscount - this.finddata.specialDiscount+' BDT ' +'This amount is Subtract ';
        //     }
        // },
        totalRackPrice() {
            return this.finddata.rack * this.finddata.rackQty
        },
        totalPowerPrice() {
            return this.finddata.Power * this.finddata.PowerQty
        },

        vat() {
            return this.finddata.zonelist.vat;
        },
        vatAmount() {
            return this.totalAfterDiscount * this.vat / 100;
        },
        mrcAfterVat() {
            return this.totalAfterDiscount + this.vatAmount;
        },
        mrcVatDeposit() {
            return this.mrcAfterVat + this.finddata.deposit;
        },
        totalPayable() {

            this.regFee = 0;

            if (this.finddata.count_demand_note <= 1) {
                this.regFee = (3000 * this.finddata.rackQty);
            } else {
                this.regFee = 0;
            }
            return this.regFee + this.totalAfterDiscount + this.vatAmount;
        },
        mrcVatDepositWithReg() {
            if (this.finddata.count_demand_note <= 1) {
                if (this.finddata.service_id == 1) {
                    return this.mrcVatDeposit + 20000;
                } else {
                    return this.mrcVatDeposit + 10000;
                }
            } else {
                return this.mrcVatDeposit;
            }
        }



    }
};
</script>

<style lang="" scoped>

</style>
