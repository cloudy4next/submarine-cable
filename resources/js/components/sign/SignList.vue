<template>
<div class="content-wrapper">
     <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>User Sign List</h1>
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
                            <!-- <form @submit="formSubmit" enctype="multipart/form-data"></form> -->
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Designation</th>
                                                <th>Img</th>
                                                <th>Sign</th>
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

                                                <td>
                                                    <input :ref="`fileInputImg`+index" type="file" accept="image/*" style="display:none" v-on:change="uploadImage($event,index)"/>
                                                    <button :id="`fileInputButton`+index" @click="onImageUpload(`fileInputImg`+index)"><img class="btn" :ref="`prevImage`+index" :src="previewImage" for="imgupload" alt="Photo" height="50px"></button>
                                                </td>


                                                <td>
                                                    <input :ref="`fileInputSign`+index" type="file" accept="image/*" style="display:none" v-on:change="uploadSign($event,index)"/>
                                                    <button :id="`fileInputButton`+index" @click="onSignUpload(`fileInputSign`+index)"><img class="btn" :ref="`prevSign`+index" :src="previewSign" for="imgupload" alt="Photo" height="50px"></button>
                                                </td>



                                                <!-- old code of img reader -->
                                                <!-- <td>
                                                    <input id="fileInputSign" type="file" accept="image/*" style="display:none" v-on:change="uploadSign($event,index)"/>
                                                    <button id="fileInputButton" onclick="document.getElementById('fileInputSign').click()"><img class="btn" :src="previewSign" for="signUpload" alt="Photo" height="50px"></button>
                                                </td> -->

                                                <td>
                                                    <table class="table table-bordered table-striped">
                                                        <tr>
                                                            <td class="text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    :checked="iplcSignCheckedDemandNote(item)"
                                                                    value="1"
                                                                    v-model="iplcSignDemandNote"
                                                                    id="iplcSignDemandNote"
                                                                    class="form-control-md"
                                                                    @change="iplcSignUpdateDemandNote(item.id)">
                                                            </td>
                                                            <td class="text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    value="1"
                                                                    v-model="iptSignDemandNote"
                                                                    id="iptSignDemandNote"
                                                                    :checked="iptSignCheckedDemandNote(item)"
                                                                    class="form-control-md"
                                                                    @change="iptSignUpdateDemandNote(item.id)">
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
                                                                    :checked="iplcSignCheckedInvoice(item)"
                                                                    value="1"
                                                                    v-model="iplcSignInvoice"
                                                                    id="iplcSignInvoice"
                                                                    class="form-control-md"
                                                                    @change="iplcSignUpdateInvoice(item.id)">
                                                            </td>
                                                            <td class="text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    value="1"
                                                                    :checked="iptSignCheckedInvoice(item)"
                                                                    v-model="iptSignInvoice"
                                                                    id="iptSignInvoice"
                                                                    class="form-control-md"
                                                                    @change="iptSignUpdateInvoice(item.id)">
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
                                                                    :checked="iplcSignCheckedReport(item)"
                                                                    value="1"
                                                                    v-model="iplcSignReport"
                                                                    id="iplcSignReport"
                                                                    class="form-control-md"
                                                                    @change="iplcSignUpdateReport(item.id)">
                                                            </td>
                                                            <td class="text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    value="1"
                                                                    :checked="iptSignCheckedReport(item)"
                                                                    v-model="iptSignReport"
                                                                    id="iptSignReport"
                                                                    class="form-control-md"
                                                                    @change="iptSignUpdateReport(item.id)">
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

            previewImage: "uploads/avatar.jpg",
            previewSign: "uploads/sign.png",
            loading: false,
            listData: [],
            iplcSignDemandNote: 0,
            iptSignDemandNote: 0,

            iplcSignInvoice: 0,
            iptSignInvoice: 0,

            iplcSignReport: 0,
            iptSignReport: 0,
        };
    },

    created() {
        this.moment = moment;
        this.getUserList();
    },
    methods: {
        onImageUpload(ref){
            ref,this.$refs[ref][0].click();
        },
        onSignUpload(ref){
            ref,this.$refs[ref][0].click();
        },

        // Demand note
        iplcSignCheckedDemandNote(item){
            if(item.sign_iplc_demandnote == 1)
            return true
        },

        iptSignCheckedDemandNote(item){
            if(item.sign_ipt_demandnote == 1)
            return true
        },

        iplcSignUpdateDemandNote(id){

            if(this.iplcSignDemandNote == 1){
                this.iplcSignDemandNote = 0;
            }else{
                this.iplcSignDemandNote = 1;
            }

            this.updateSignInfo(id);
        },

        iptSignUpdateDemandNote(id){

            if(this.iptSignDemandNote == 1){
                this.iptSignDemandNote = 0;
            }else{
                this.iptSignDemandNote = 1;
            }
            this.updateSignInfo(id);
        },


        // Invoice
        iplcSignCheckedInvoice(item){
            if(item.sign_iplc_invoice == 1)
            return true
        },

        iptSignCheckedInvoice(item){
            if(item.sign_ipt_invoice == 1)
            return true
        },

        iplcSignUpdateInvoice(id){

            if(this.iplcSignInvoice == 1){
                this.iplcSignInvoice = 0;
            }else{
                this.iplcSignInvoice = 1;
            }

            this.updateSignInfo(id);
        },

        iptSignUpdateInvoice(id){

            if(this.iptSignInvoice == 1){
                this.iptSignInvoice = 0;
            }else{
                this.iptSignInvoice = 1;
            }
            this.updateSignInfo(id);
        },


        // Report
        iplcSignCheckedReport(item){
            if(item.sign_iplc_report == 1)
            return true
        },

        iptSignCheckedReport(item){
            if(item.sign_ipt_report == 1)
            return true
        },

        iplcSignUpdateReport(id){

            if(this.iplcSignReport == 1){
                this.iplcSignReport = 0;
            }else{
                this.iplcSignReport = 1;
            }

            this.updateSignInfo(id);
        },

        iptSignUpdateReport(id){

            if(this.iptSignReport == 1){
                this.iptSignReport = 0;
            }else{
                this.iptSignReport = 1;
            }
            this.updateSignInfo(id);
        },

        uploadImage(e, index){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    //this.previewImage = e.target.result;
                    this.$refs[`prevImage`+index][0].src = e.target.result;
                    console.log(this.$refs[`prevImage`+index]);
                    console.log(this.previewImage);
                };
        },


        uploadSign(e, index){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);

                reader.onload = e =>{
                    this.$refs[`prevSign`+index][0].src = e.target.result;
                    console.log(this.$refs[`prevSign`+index]);
                    console.log(this.previewSign);
                };


                let formData = new FormData();
                formData.append('imageTest', image);


                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                axios.post('/user-sign-img-store', formData, config)
                .then(function (response) {

                })
                .catch(function (error) {

                });
        },

        // uploadSign(e, index){
        //     const image = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = e =>{
        //         this.previewSign = e.target.result;
        //         console.log(this.previewSign);
        //     };
        // },


        updateSignInfo(id) {
            // this.loading = true;
            axios
                .post("/user-sign-store",{
                    iplcSignDemandNote:this.iplcSignDemandNote,
                    iptSignDemandNote:this.iptSignDemandNote,

                    iplcSignInvoice:this.iplcSignInvoice,
                    iptSignInvoice:this.iptSignInvoice,

                    iplcSignReport:this.iplcSignReport,
                    iptSignReport:this.iptSignReport,
                    id:id
                })
                .then((res) => {
                    this.loading = false;
                    Toast.fire({
                        icon: "success",
                        title: "User Sign info Update Successfully.",
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
