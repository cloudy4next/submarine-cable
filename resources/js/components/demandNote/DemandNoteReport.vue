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
              <div class="card-header custom-header p-0 m-1">
                <div class="row">
                  <div class="col-md-2">
                    <img src="/assets/dist/logo/logo.png" />
                  </div>

                  <div class="col-md-8 text-center">
                    <h3>
                      <span style="color: green; font-size:25px">বাংলাদেশ সাবমেরিন ক্যাবল কোম্পানি লিমিটেড (বিএসসিসিএল)
                        <br />
                      </span>
                      <span style="color: blue">
                        Bangladesh Submarine Cable Company Limited (BSCCL)
                      </span>
                    </h3>
                  </div>
                  <div class="col-md-2">
                    <img src="/assets/dist/logo/download.jpg" />
                  </div>
                </div>
                <hr />
                <div class="text-center p-0 m-0">
                  <h3>
                    <strong>Demand Note for
                      {{ finddata.services.service }} Connection</strong>
                  </h3>
                </div>
              </div>

              <div class="card-body p-0 m-0">
                <div class="row">
                  <!-- <div class="col-md-1"></div> -->
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-8" style="margin-left: 20px">
                        <p>
                          Reference No: 14.34.0000.{{ Department }}.{{ Subject }}.{{ ClientId }}.{{ Year }}.{{
                            DemandNoteNumber }}
                        </p>
                        <p class="mb-0">
                            Name of the Company :<strong>{{ finddata.customers.com_name }}</strong>
                        </p>
                        <p class="mb-0">
                            BIN Number :{{ finddata.customers.bin_vat_etc }}
                        </p>
                        <p class="mb-0">
                            Address :{{ finddata.customers.address }}
                        </p>
                        <p class="mb-0">
                            Contact Person :{{ finddata.customers.name }}
                        </p>
                        <p class="mb-0">
                            Contact Number : :{{ finddata.customers.phone }}
                        </p>
                       <br>
                        <p class="mb-0 ">Customer License Type : {{ customerType }}</p>
                        <p class="mb-0 ">Submarine Cable : {{ finddata.subservice.sub_service_name }}</p>

                        <p class="mb-0" v-if="finddata.service_id == 1">
                          Foreign Drop Point of Circuit :
                          {{ finddata.groups.group_name }} <span v-if="finddata.country != 0">({{
                            finddata.countries.country_name }})</span>
                        </p>

                        <p class="mb-0" v-if="finddata.service_id == 1">
                          Bandwidth : 1 * {{ circuitType }}
                          <!-- ({{ finddata.subservice.sub_service_name }} ) -->

                        <p class="mb-0" v-if="finddata.service_id == 7">
                          Bandwidth :
                          {{ totalBand }}
                        </p>

                        <!-- <p class="mb-0" v-else>
                          Location :
                          {{ finddata.groups.group_name }}
                        </p> -->

                            <p v-for="(circuit, i) in circuitConnectionInformation" :key="i" class="mb-0">
                              Current Utilization :
                              <span v-if="circuit.is_approved == 2" >
                                 {{ finddata.on_process_notes }} * {{ circuit.name }}
                              </span>

                            </p>

                        <p v-for="(circuit, i) in circuitConnectionInformation" :key="i" class="mb-0">
                                  Current Pending :
                                  <span>
                                     {{ finddata.pending_notes }} * {{ circuit.name }}
                                  </span>

                        </p>
                        <!-- <p v-for="(circuit, i) in circuitConnectionInformation" :key="i" class="mb-0">
                          On Process Circuit :

                          <span v-if="circuit.is_approved == 2" class="badge">
                            {{ circuit.prcessing_qty }} * {{ circuit.name }}
                          </span>

                        </p> -->


                      </div>

                      <div class="col-md-3">
                        <p class="mt-0">
                          Date :{{
                            moment(finddata.created_at).format("DD.MM.YYYY")
                          }}
                        </p>

                        <div class="border-2 mb-4" style="border: 1px solid;">

                          <!-- <p class="mb-0" v-if="finddata.approved_date != NULL">
                            Activation Date :{{ moment(finddata.approved_date).format("DD.MM.YYYY") }}
                          </p> -->
                          <p class="mb-0">For Office Use Only</p>
                          <p class="mb-0">
                          <!-- v-if="finddata.service_id == 1"> -->
                            ID No : DN({{ cableType }})/{{ customerType }}/{{
                              circuitType
                            }}/000{{ iplcTotalDemandNote }}
                          </p>
                        </div>

                        <!-- <p class="mb-0" v-if="finddata.count_demand_note == 1">
                          Connection : New
                        </p>
                        <p class="mb-0" v-else>Connection : upgrade from to {{ second_last_circuit }}
                        </p> -->
                        <br>
                        <br>

                        <p class="mb-0" v-if="finddata.service_id == 1">Commitment Period : N/A</p>
                        <p class="mb-0">
                          Discount on Wet Segment MRC : {{ finddata.discount + "%" }}
                        </p>
                        <p class="mb-0">
                          Back-haul-Provider : {{ finddata.backhole_port }}
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
                      <th style="text-align:center">SL</th>
                      <th style="text-align:center">Description</th>
                      <th style="text-align:center">Amount (BDT)</th>
                      <th style="text-align:center">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align:center">1</td>
                      <td>
                        Registration Charge
                        <!-- {{ finddata.subservice.sub_service_name }} -->
                      </td>
                      <td class="text-right">{{ RegistrationCharge().toFixed(2) }}</td>
                      <td><input type="text" class="form-control"></td>
                    </tr>
                    <tr>
                      <td style="text-align:center">2</td>
                      <td>
                        Installation Charge
                        <!-- {{ finddata.capacity.capacity_name }} -->
                      </td>
                      <td class="text-right">
                        {{ this.InstallationCharge().toFixed(2) | comma
                        }}
                      </td>
                      <td class="text-center" v-if="finddata.service_id == 7">
                        {{ finddata.ports.port_name + " * Port Qty " + finddata.portqty }}
                        <input type="text" class="form-control">
                      </td>
                      <td class="text-center" v-if="finddata.service_id == 1">
                        <input type="text" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center">3</td>
                      <td>
                        Monthly Recurring Charge (MRC) for Wet Segment
                        <!-- {{ finddata.capacity.capacity_name }} -->
                      </td>
                      <td class="text-right">{{ MrcFloat().toFixed(2) | comma }}</td>
                      <td class="text-center">
                        <!-- On the slab of {{ finddata.capacity.capacity_name }} -->
                        <input type="text" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center">4</td>
                      <td>MRC for Wet Segment after Discount</td>
                      <td class="text-right">
                        {{ totalAfterDiscount.toFixed(2) | comma }}
                      </td>
                      <td class="text-center">
                        {{ finddata.discount.toFixed(2) + " % Discount" }}
                        <!-- <input type="text" class="form-control"> -->
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center">5</td>
                      <td>Total MRC</td>
                      <td class="text-right">
                        {{ totalAfterDiscount.toFixed(2) | comma }}
                      </td>
                      <td class="text-center"> 4
                        <!-- <input type="text" class="form-control"> -->
                      </td>
                    </tr>

                    <tr v-if="finddata.add_sub == 1 && finddata.specialDiscount != 0">
                      <td style="text-align:center">6</td>
                      <td>{{ finddata.remarks }}</td>
                      <td class="text-right">
                        {{
                          (totalAfterDiscount + finddata.specialDiscount).toFixed(2) | comma
                        }}
                      </td>
                      <td class="text-center">
                        {{ finddata.specialDiscount.toFixed(2) + " BDT " + " is Add" }}
                        <input type="text" class="form-control">
                      </td>
                    </tr>

                    <tr v-if="finddata.add_sub == 2 && finddata.specialDiscount != 0">
                      <td style="text-align:center">6</td>
                      <td>{{ finddata.remarks }}</td>
                      <td class="text-right">
                        {{
                          (totalAfterDiscount - finddata.specialDiscount).toFixed(2) | comma
                        }}
                      </td>
                      <td class="text-center">
                        {{
                          finddata.specialDiscount.toFixed(2) +
                          " BDT " +
                          "This amount is Subtract "
                        }}
                        <input type="text" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center">7</td>
                      <td>VAT (@ {{ vat }} % on all charges)</td>
                      <td class="text-right">{{ Vatno5().toFixed(2) | comma }}</td>
                      <td class="text-center"> (1+2+5) * {{ vat }} %
                        <!-- {{ vat }} %  <input type="text" class="form-control"> -->
                      </td>
                    </tr>
                    <!-- <tr> -->
                      <!-- <td style="text-align:center">8</td> -->
                      <!-- <td>MRC with Vat</td> -->
                      <!-- <td class="text-right">{{ mrcAfterVat.toFixed(2) | comma }}</td> -->
                      <!-- <td class="text-center"> -->
                        <!-- {{ vat }} % Amount {{ vatAmount }}  -->
                        <!-- <input type="text" class="form-control"> -->
                      <!-- </td> -->
                    <!-- </tr> -->

                    <tr>
                      <td style="text-align:center">8</td>
                      <td>Subtotal Amount</td>
                      <td class="text-right">
                        <span> {{  SubTotal().toFixed(2) | comma
                        }}
                        </span>
                      </td>
                      <td style="text-align:center">(1+2+5+7)</td>
                    </tr>


                    <tr>
                      <td style="text-align:center">9</td>
                      <td>Security Deposit</td>
                      <td class="text-right">
                        <!-- {{ finddata.deposit.toFixed(2) }} -->
                        {{ SeqDeposit().toFixed(2) | comma }}
                      </td>
                      <td style="text-align:center">(5)*1.05</td>
                      <!-- <td class="text-center">{{mrcVatDeposit +' BDT '}}</td> -->
                    </tr>


                    <tr>
                      <td style="text-align:center">10</td>
                      <td class="text-center">
                        <strong>Total Payable Amount</strong>
                      </td>
                      <td class="text-right">
                        <!-- {{ mrcVatDepositWithReg.toFixed(2) }} -->
                        <!-- {{ (totalAfterDiscount*1.05) + mrcVatInstallationReg()+ RegistrationCharge() + InstallationCharge()}} -->
                        {{ TotalPayAmount().toFixed(2) | comma }}
                      </td>
                      <td style="text-align:center">(8+9)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- end card body -->
            </div>
          </div>
          <div class="col-md-10 offset-1 mb-2">
            <p>
              In words (Taka) : {{ TotalPayAmount() | toWords }}.
            </p>
          </div>
          <div class="col-md-6 text-center" style="padding-top: 25px" v-if="manager[0]">
            <p class="mb-0"> <img :src="manager[0].sign" alt="Photo" width="250" height="80px"> </p>
            <!-- <p class="mb-0"> <img :src="previewImage"  alt="Photo" width="250" height="80px"> </p> -->
            <p class="mb-0">{{ manager[0].name }}</p>
            <p class="mb-0">{{ manager[0].designation }}</p>
          </div>
          <div class="col-md-6 text-center mb-5" style="padding-top: 25px" v-if="manager[1]">
            <p class="mb-0"> <img :src="manager[1].sign" alt="Photo" width="250" height="80px"> </p>
            <p class="mb-0">{{ manager[1].name }}</p>
            <p class="mb-0">{{ manager[1].designation }}</p>
          </div>
          <div class="col-md-12 text-left pl-4 pb-3" v-if="finddata.service_id == 1">
            <p class="mb-0"> <b>Note :</b> <strong>
                Please issue payorder in favour of "Bangladesh Submarine Cable Company Limited" with an amount of Tk. {{
                  TotalPayAmount().toFixed(2) | comma }}
              </strong> </p>
            <p class="mb-0 pl-5"> <strong>
                VAT amount may be changed according to the opinion of the VAT authority
              </strong></p>
            <p class="mb-0 pl-5">
              <textarea class="form-control" rows="1" cols="7">ln addition to the standard IPLC Agreement, the terms and reference mentioned in the tariff scheme will be applicable.</textarea>                                                                                                                                                                                                                                                                     </textarea>
            </p>
          </div>

          <div class="col-md-12 text-left pl-4 pb-3" v-if="finddata.service_id == 1">
            <p class="mb-0"> <b>Copy To: 1 Deputy General Manager, Customer Care, BSCCL</b> </p>
            <p class="mb-0 pl-5"> <b class="pl-3">2 Manager, Finance & Accounts, BSCCL</b></p>
          </div>

          <div class="col-md-12 text-left pl-4 pb-3" v-if="finddata.service_id == 7">
            <p class="mb-0"> <b>Copy To: 1 General Manager (O&M). BSCCL</b> </p>
            <p class="mb-0 pl-5"> <b class="pl-3">2 Deputy General Manager(CC). BSCCL</b></p>
            <p class="mb-0 pl-5"> <b class="pl-3">3 Deputy General Manager(F&A). BSCCL</b></p>
            <p class="mb-0 pl-5"> <b class="pl-3">4 PA to Managing Director,BSCCL</b></p>
            <p class="mb-0 pl-5"> <b class="pl-3">5 Office Copy</b></p>
          </div>


        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    // id: {
    //   required: true,
    //   type: Number,
    // },
  },
  data() {
    return {
      previewImage: "../uploads/sign.png",
      finddata: {},
      manager: [],
      circuitConnectionInformation: [],
      second_last_circuit: '',
      totalBand: '',
      id: "",
      iptransitTotalDemandNote: "",
      iplcTotalDemandNote: "",
      vat: 5,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.moment = moment;
    this.findDemandInfo();
    this.countTotalIplcDemandTote(1);
    this.countTotalIpTransitDemandTote(7);
  },
  methods: {

    findDemandInfo() {
      this.loading = true;
      axios.post("/get-demand-note-info", { id: this.id }).then((response) => {
        this.loading = false;
        this.finddata = response.data.data;
        this.totalBand = response.data.totalBand;
        this.manager = response.data.manager;
        this.circuitConnectionInformation = response.data.connectionData;
        // this.second_last_circuit = response.data.second_last_circuit;
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

    RegistrationCharge() {
      if (this.finddata.count_demand_note <= 1) {
        if (this.finddata.service_id == 1) {
          return 20000;
        } else {
          return 10000;
        }
      } else {
        return 0;
      }
    },

      MrcFloat(){
        return parseFloat(this.finddata.mrc_ws);
      },
      SubTotal() {
            return parseFloat(this.finddata.sub_total);
      },
        SeqDeposit() {
                return parseFloat(this.finddata.seq_deposit);
        },
     TotalPayAmount() {
            return parseFloat(this.finddata.total_pay_amount);
        },

    InstallationCharge() {
      if (this.finddata.service_id == 1) {
        return this.finddata.capacity.instl_charge
      } else {
        return this.finddata.ports.port_rate * this.finddata.portqty
      }
    },
    Vatno5() {
    //   return (this.RegistrationCharge() + this.InstallationCharge() + this.totalAfterDiscount) * .05;
                return parseFloat(this.finddata.vat);

    },
    mrcVatInstallationReg() {
      return this.totalAfterDiscount + this.vatAmount;
    },

    subtotalAmount() {
      let subtotal_amount = this.mrcVatInstallationReg() + this.RegistrationCharge() + this.InstallationCharge()
      return subtotal_amount + (this.totalAfterDiscount * 1.05);
    },

    totalPayable() {
      return this.RegistrationCharge() + this.InstallationCharge() + this.Vatno5() +
        this.totalAfterDiscount + (this.totalAfterDiscount * 1.05)
    },

    print() {
      window.print();
    },
  },
  computed: {

    Department() {
      if (this.finddata.service_id == 1) {
        return 123;
      } else if (this.finddata.service_id == 7) {
        return 404;
      }
    },

    Subject() {
      if (this.finddata.service_id == 1) {
        return 52;
      } else if (this.finddata.service_id == 7) {
        return 16;
      }
    },

    ClientId() {
      return this.finddata.customers.id;
    },

    Year() {
      return moment(this.finddata.created_at).format("YY");
    },

    DemandNoteNumber() {
      if (this.finddata.service_id == 1) {
        return this.iplcTotalDemandNote;
      } else if (this.finddata.service_id == 7) {
        return this.iptransitTotalDemandNote;
      }
    },

    cableType() {
      if (this.finddata.sub_service_id == 105) {
        return 5;
      } else {
        return 4;
      }
    },

    customerType() {
      return this.finddata.customers.custype.cus_type_name;
    },

    circuitType() {
      if (this.finddata.service_id == 1) {
        return this.finddata.circuit.circuit_name;
      } else if (this.finddata.service_id == 7) {
        return "N/A";
      }
    },

      totalAfterDiscount() {
            return parseFloat(this.finddata.mrc_ws_ad);
    },
    vat() {
      return this.finddata.zonelist.vat;
    },
    vatAmount() {
      return (this.totalAfterDiscount * this.vat) / 100;
    },
    mrcAfterVat() {
        // return this.totalAfterDiscount + this.vatAmount;
        return parseFloat(this.finddata.vat_mrc);

    },
    mrcVatDeposit() {
      // return this.mrcAfterVat + this.finddata.deposit;
      return this.mrcAfterVat + (this.totalAfterDiscount * 1.05);
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
    },

  },
};
</script>

<style lang="" scoped>
</style>
