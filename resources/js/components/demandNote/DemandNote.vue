<template>
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-md-2 offset-10">
                        <button
                            @click="print"
                            type="button"
                            class="btn btn-info"
                        >
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
                    <div class="col-sm-12">
                        <p>Reference No: 14.34.0000.123.52.028.21</p>
                    </div>
                    <div class="col-md-6 offset-3">
                        <h3>
                            <strong>Demand note for IPLC Connection</strong>
                        </h3>
                    </div>
                    <div class="col-md-4 offset-8">
                        <p class="mb-0">Date :02/01/2022</p>
                        <p class="mb-0">For Office Use Only</p>
                        <p class="mb-0">ID No :: DN(5)/IIG/10G/0276</p>
                        <p class="mb-0">Date :02/01/2022</p>
                    </div>
                    <div class="col-md-11 offset-1 mb-3">
                        <p class="mb-0">
                            Name of the Company :
                            <strong>ABCD Limited (IIG)</strong>
                        </p>
                        <p class="mb-0">BIN Number :111111111111111111111</p>
                        <p class="mb-0">Address :ABCD</p>
                        <p class="mb-0">Contact Person :ABCD, CTO</p>
                        <p class="mb-0">Contact Number :1234</p>
                        <p class="mb-0">Ref no. :ABCD, Dated 15/Dec/2021</p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-0">User Type : IIG</p>
                        <p class="mb-0">
                            Wet Segment Route : Kuakata-Equinix (SG)
                        </p>
                        <p class="mb-0">Bandwidth : 1x10G (SMW5)</p>
                        <p class="mb-0">
                            Current IPLC Utilization : 1x10G (SMW5) on process
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-0">
                            Connection (New/Renewal) : Upgrade from 10G to 20G
                        </p>
                        <p class="mb-0">Commitment Period : N/A</p>
                        <p class="mb-0">
                            Discount applicable : 8% on Wet Segment MRC
                        </p>
                        <p class="mb-0">
                            Back-haul Provider :
                            <strong>Fiber@Home Ltd. (NTTN)</strong>
                        </p>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="card">
                            <div class="card-body">
                                <table
                                    id="example1"
                                    class="table table-bordered table-striped"
                                >
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
                                                Registration charge for SMW5 Wet
                                                Segment
                                            </td>
                                            <td class="text-right">-</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                Installation charge for SMW5 Wet
                                                Segment
                                            </td>
                                            <td class="text-right">
                                                500,000.00
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                Monthly Recurring Charge (MRC)
                                                for Wet Segment (SMW5)
                                            </td>
                                            <td class="text-right">
                                                2,700,000.00
                                            </td>
                                            <td class="text-center">
                                                <strong
                                                    >On the slab of
                                                    2x10G</strong
                                                >
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                MRC for Wet Segment after
                                                discount
                                            </td>
                                            <td class="text-right">
                                                2,484,000.00
                                            </td>
                                            <td class="text-center">
                                                8% Management Discount
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>
                                                Total Monthly Recurring Charge
                                            </td>
                                            <td class="text-right">
                                                2,484,000.00
                                            </td>
                                            <td class="text-center">4</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>VAT (@ 5% on all charges)</td>
                                            <td class="text-right">
                                                149,200.00
                                            </td>
                                            <td class="text-center">
                                                (1+2+5)x0.05
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>Sub-Total Amount</td>
                                            <td class="text-right">
                                                <strong>3,133,200.00</strong>
                                            </td>
                                            <td class="text-center">
                                                (1+2+5+6)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>
                                                Security deposit (One month’s
                                                rental)
                                            </td>
                                            <td class="text-right">
                                                2,608,200.00
                                            </td>
                                            <td class="text-center">
                                                (5)x1.05
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td class="text-center">
                                                <strong
                                                    >Total Payable
                                                    Amount</strong
                                                >
                                            </td>
                                            <td class="text-right">
                                                <strong>5,741,400.00</strong>
                                            </td>
                                            <td class="text-center">(7+8)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 offset-2 mb-5">
                        <p>
                            In words (Taka) : Tk. Fifty Seven Lac Forty One
                            Thousand and Four Hundred Only.
                        </p>
                    </div>
                    <div class="col-md-6 text-center">
                        <p class="mb-0">Muhammed Shoeb Ali</p>
                        <p class="mb-0">
                            DGM (Bandwidth Planning), Additional Charge
                        </p>
                    </div>
                    <div class="col-md-6 text-center mb-5">
                        <p class="mb-0">Shukanta Kumar Debnath, FCA</p>
                        <p class="mb-0">DGM (Finance & Accounts)</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {
        this.findDemandNote();
    },
    methods: {
        print() {
            window.print();
        },

        findDemandNote(){
            this.loading = true;
            var id = 1;
            axios.get("/demand-note/view",{id: this.id}).then((response) =>{
                this.loading = false;
                this.viewData = response.data.data;
            });
        },

        // getSubServiceList() {
        //     this.loading = true;
        //     axios.post("/get-sub-service-list",{id: this.servId}).then((response) => {
        //         this.loading = false;
        //         this.listData = response.data.data;
        //     });
        // },

    },
};
</script>
<style lang=""></style>
