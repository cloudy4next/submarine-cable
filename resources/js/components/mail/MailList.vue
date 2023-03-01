<template>
<div class="content-wrapper">
     <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Mail To</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <div>


                        </div>

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
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Email</th>
                                            <th class="p-0 m-0">
                                                <table class="table table-bordered table-striped p-0 m-0">
                                                    <tr>
                                                        <th colspan="2" class="text-center">DemandNote</th>
                                                    </tr>
                                                    <tr>
                                                        <th>IPLC</th>
                                                        <th>IPT</th>
                                                    </tr>
                                                </table>
                                            </th>

                                            <th class="p-0 m-0">
                                                <table class="table table-bordered table-striped p-0 m-0">
                                                    <tr>
                                                        <th colspan="2" class="text-center">Invoice</th>
                                                    </tr>
                                                    <tr>
                                                        <th>IPLC</th>
                                                        <th>IPT</th>
                                                    </tr>
                                                </table>
                                            </th>

                                            <th class="p-0 m-0">
                                                <table class="table table-bordered table-striped p-0 m-0">
                                                    <tr>
                                                        <th colspan="2" class="text-center">Report</th>
                                                    </tr>
                                                    <tr>
                                                        <th>IPLC</th>
                                                        <th>IPT</th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="listData.length == 0" class="text-center">
                                        <td colspan="6">Data Not Found</td>
                                    </tr>

                                    <tr
                                            v-for="(item, index) in listData"
                                            :key="index"
                                        >
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.designation }}</td>
                                            <td>{{ item.email }}</td>


                                            <td>
                                                <table class="table table-bordered table-striped">
                                                    <tr>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="iplcMailCheckedDemandNote(item)"
                                                                value="1"
                                                                v-modal="iplcMailDemandNote"
                                                                id="iplcMailDemandNote"
                                                                class="form-control-md"
                                                                @change="iplcMailUpdateDemandNote(item.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                value="1"
                                                                v-modal="iptMailDemandNote"
                                                                id="iptMailDemandNote"
                                                                :checked="iptMailCheckedDemandNote(item)"
                                                                class="form-control-md"
                                                                @change="iptMailUpdateDemandNote(item.id)">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                            <td>
                                                <table class="table table-bordered table-striped">
                                                    <tr>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="iplcMailCheckedInvoice(item)"
                                                                value="1"
                                                                v-modal="iplcMailInvoice"
                                                                id="iplcMailInvoice"
                                                                class="form-control-md"
                                                                @change="iplcMailUpdateInvoice(item.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                value="1"
                                                                :checked="iptMailCheckedInvoice(item)"
                                                                v-modal="iptMailInvoice"
                                                                id="iptMailInvoice"
                                                                class="form-control-md"
                                                                @change="iptMailUpdateInvoice(item.id)">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>


                                            <td>
                                                <table class="table table-bordered table-striped">
                                                    <tr>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="iplcMailCheckedReport(item)"
                                                                value="1"
                                                                v-modal="iplcMailReport"
                                                                id="iplcMailReport"
                                                                class="form-control-md"
                                                                @change="iplcMailUpdateReport(item.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input
                                                                type="checkbox"
                                                                value="1"
                                                                :checked="iptMailCheckedReport(item)"
                                                                v-modal="iptMailReport"
                                                                id="iptMailReport"
                                                                class="form-control-md"
                                                                @change="iptMailUpdateReport(item.id)">
                                                        </td>
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
    <!-- <sign-add /> -->
</div>
</template>


<script>
import moment from "moment";

export default {
    components: {

    },
    data() {
        return {
            loading: false,
            listData: [],
            iplcMailDemandNote: 0,
            iptMailDemandNote: 0,

            iplcMailInvoice: 0,
            iptMailInvoice: 0,

            iplcMailReport: 0,
            iptMailReport: 0,
        };
    },

    created() {
        this.moment = moment;
        this.getUserList();
    },
    methods: {

        // Demand note
        iplcMailCheckedDemandNote(item){
            if(item.mail_iplc_demandnote == 1)
            return true
        },

        iptMailCheckedDemandNote(item){
            if(item.mail_ipt_demandnote == 1)
            return true
        },

        iplcMailUpdateDemandNote(id){

            if(this.iplcMailDemandNote == 1){
                this.iplcMailDemandNote = 0;
            }else{
                this.iplcMailDemandNote = 1;
            }

            this.updateMailInfo(id);
        },

        iptMailUpdateDemandNote(id){

            if(this.iptMailDemandNote == 1){
                this.iptMailDemandNote = 0;
            }else{
                this.iptMailDemandNote = 1;
            }
            this.updateMailInfo(id);
        },


        // Invoice
        iplcMailCheckedInvoice(item){
            if(item.mail_iplc_invoice == 1)
            return true
        },

        iptMailCheckedInvoice(item){
            if(item.mail_ipt_invoice == 1)
            return true
        },

        iplcMailUpdateInvoice(id){

            if(this.iplcMailInvoice == 1){
                this.iplcMailInvoice = 0;
            }else{
                this.iplcMailInvoice = 1;
            }

            this.updateMailInfo(id);
        },

        iptMailUpdateInvoice(id){

            if(this.iptMailInvoice == 1){
                this.iptMailInvoice = 0;
            }else{
                this.iptMailInvoice = 1;
            }
            this.updateMailInfo(id);
        },


        // Report
        iplcMailCheckedReport(item){
            if(item.mail_iplc_report == 1)
            return true
        },

        iptMailCheckedReport(item){
            if(item.mail_ipt_report == 1)
            return true
        },

        iplcMailUpdateReport(id){

            if(this.iplcMailReport == 1){
                this.iplcMailReport = 0;
            }else{
                this.iplcMailReport = 1;
            }

            this.updateMailInfo(id);
        },

        iptMailUpdateReport(id){

            if(this.iptMailReport == 1){
                this.iptMailReport = 0;
            }else{
                this.iptMailReport = 1;
            }
            this.updateMailInfo(id);
        },

        updateMailInfo(id) {
            // this.loading = true;
            axios
                .post("/user-mail-store",{
                    iplcMailDemandNote:this.iplcMailDemandNote,
                    iptMailDemandNote:this.iptMailDemandNote,

                    iplcMailInvoice:this.iplcMailInvoice,
                    iptMailInvoice:this.iptMailInvoice,

                    iplcMailReport:this.iplcMailReport,
                    iptMailReport:this.iptMailReport,
                    id:id
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "User Mail info Update Successfully.",
                    });
                })
                .catch(() => {
                    this.loading = false;
                    Swal.fire({
                        icon: "warning",
                        title: "wrong creidentials!",
                    });
                });
        },



        getUserList() {
            this.loading = true;
            axios.get("/get-user-list").then((response) => {
                this.loading = false;
                this.listData = response.data.users;
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
