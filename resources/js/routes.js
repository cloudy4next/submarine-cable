const Dashboard = () => import("./components/Dashboard.vue");
const RolePermission = () =>
    import("./components/configuration/RolePermission.vue");
const UserList = () => import("./components/configuration/UserList.vue");
const SignList = () => import("./components/sign/SignList.vue");
const MailTo = () => import("./components/mail/MailList.vue");
const Event = () => import("./components/event/Event.vue");
const Profile = () => import("./components/Profile.vue");
const SignAdd = () => import("./components/sign/SignAdd.vue");
const Logout = () => import("./components/configuration/Logout.vue");
const CustomerList = () => import("./components/configuration/CustomerList.vue");
const CustomerBandwithList = () => import("./components/bandwith/IplcUpDownBandwith.vue");
const IPTCustomerTotalBandwith = () => import("./components/bandwith/IptUpDownBandwith.vue");
const ServiceList = () => import("./components/configuration/ServiceList.vue");
const SubServiceList = () => import("./components/configuration/SubServiceList.vue");
const TariffList = () => import("./components/Tariff/TariffList.vue");
const TariffView = () => import("./components/Tariff/TariffView.vue");
const DemandNote = () => import("./components/DemandNote.vue");
const DemandNoteList = () => import("./components/demandNote/DemandNoteList.vue");
const DemandNoteReportList = () => import("./components/report/DemandNoteReportList.vue");
const TotalRevenueReport = () => import("./components/report/TotalRevenueReport.vue");
const IplcRevgReport = () => import("./components/report/revReport.vue");
const AddDemandNote = () => import("./components/demandNote/createdemand.vue")
const DemandNoteReport = () => import("./components/demandNote/DemandNoteReport.vue");
const ColocationDemandNoteReport = () => import("./components/demandNote/colocation/DemandNoteReport.vue");
const AddColocationDemandNote = () => import("./components/demandNote/colocation/ColocationDemandNote.vue");
const ColocationDemandNoteList = () => import("./components/demandNote/colocation/ColocationList.vue");
const ColocationDemandNotestatus = () => import("./components/demandNote/colocation/ColocationList.vue");
const DemandNoteStatus = () => import("./components/demandNote/DemandNoteList.vue");
const LandingStationList = () => import("./components/customer/LandingStationList.vue");
const CustomerTypeList = () => import("./components/customer/CustomerTypeList.vue");
const BillingList = () => import("./components/billing/BillingList.vue");
const InvoiceGenerate = () => import("./components/billing/InvoiceGenerate.vue");

const IplcBillProcess = () => import("./components/billing/IplcBillProcess.vue");
const IplcBillUpdate = () => import("./components/billing/IplcBillUpdate.vue");
const IplcMonthlyInvoiceView = () => import("./components/billing/IplcIMonthlynvoiceList.vue");
const IplcBillingList = () => import("./components/billing/IplcListView.vue");
const IplcBillingReport = () => import("./components/billing/IplcListView.vue");
const IplcInvoiceList = () => import("./components/billing/IplcInvoiceList.vue");
const IplcBillView = () => import("./components/billing/IplcSingleView.vue");

const IplcBillReport = () => import("./components/report/IplcBillReportList.vue");
const IplcMonthWiseBillReport = () => import("./components/report/IplcBillReportList.vue");

const IPLCCustomerBillAdjust = () => import("./components/bandwith/IplcAdjustBill.vue");
const PortCustomerBillAdjust = () => import("./components/bandwith/portAdjustBill.vue");
const powerCustomerBillAdjust = () => import("./components/bandwith/powerAdjustBill.vue");


const IptBillProcess = () => import("./components/billing/ipt/IptBillProcess.vue");
const IptBillUpdate = () => import("./components/billing/ipt/IptBillUpdate.vue");
const IptBillingList = () => import("./components/billing/ipt/IptListView.vue");
const IptInvoiceList = () => import("./components/billing/ipt/IptInvoiceList.vue");
const IptBillView = () => import("./components/billing/ipt/IptSingleView.vue");
const IpTransitInvoiceReport = () => import("./components/billing/ipt/InvoiceReport.vue");

const IPTCustomerBillAdjust = () => import("./components/bandwith/IptAdjustBill.vue");


const ColocationBillProcess = () => import("./components/billing/colocation/ColocationBillProcess.vue");
const ColocationBillUpdate = () => import("./components/billing/colocation/ColocationBillUpdate.vue");
const ColocationBillingList = () => import("./components/billing/colocation/ColocationListView.vue");
const ColocationInvoiceList = () => import("./components/billing/colocation/ColocationInvoiceList.vue");
const colocationMonthlyInvoiceView = () => import("./components/billing/colocation/ColocationIMonthlynvoiceList.vue");
const ColocationBillView = () => import("./components/billing/colocation/ColocationSingleView.vue");
const colocationInvoiceReport = () => import("./components/billing/colocation/colocationInvoiceReport.vue");

const ColocationPowerBillProcess = () => import("./components/billing/colocationPower/ColocationBillProcess.vue");
const ColocationPowerBillUpdate = () => import("./components/billing/colocationPower/ColocationBillUpdate.vue");
const ColocationPowerBillingList = () => import("./components/billing/colocationPower/ColocationListView.vue");
const ColocationPowerInvoiceList = () => import("./components/billing/colocationPower/ColocationInvoiceList.vue");
const ColocationPowerBillView = () => import("./components/billing/colocationPower/ColocationSingleView.vue");
const ColocationPowerMonthlyInvoiceView = () => import("./components/billing/colocationPower/ColocationMonthlynvoiceList.vue");
const ColocationPowerInvoiceReport = () => import("./components/billing/colocationPower/colocationInvoiceReport.vue");

const GroupList = () => import("./components/customer/GroupList");
const InvoiceReport = () => import("./components/billing/InvoiceReport.vue");

const IplcList = () => import("./components/configuration/IplcList.vue");
const IptransitList = () => import("./components/configuration/IptransitList.vue");
const ColocationList = () => import("./components/configuration/ColocationList.vue");
const ColocationIplcList = () => import("./components/configuration/ColocationIplcList.vue");


// const IplcRevgReport = () => import("./components/configuration/IplcList.vue");



// const path = "d3cfdb7594b592d36a0179aaa03c3480";
// const path = "www.dream71.com";
export default [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
        {
        path: "/profile",
        name: "Profile",
        component: Profile,

    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,

    },
    {
        path: "/role-permission-list",
        name: "RolePermission",
        component: RolePermission,
    },
    {
        path: "/user-list",
        name: "UserList",
        component: UserList,
    },
    {
        path: "/user-sign-list",
        name: "SignList",
        component: SignList,
    },
    {
        path: "/user-mail-cc-list",
        name: "MailTo",
        component: MailTo,
    },
    {
        path: "/user-event-list",
        name: "Event",
        component: Event,
    },
    {
        path: "/user-sign-add/:id",
        name: "SignAdd",
        component: SignAdd,
    },
    {
        path: "/customer-list/:id",
        name: "CustomerList",
        component: CustomerList,
    },

    {
        path: "/iplc/customer-bandwith/up-down/:id",
        name: "CustomerBandwithList",
        component: CustomerBandwithList,
    },
    {
        path: "/ip-transit/customer-bandwith/up-down/:id",
        name: "IPTCustomerTotalBandwith",
        component: IPTCustomerTotalBandwith,
    },
    {
        path: "/services",
        name: "ServiceList",
        component: ServiceList,
    },
    {
        path: "/sub-services/:id/:name",
        props: true,
        name: "SubServiceList",
        component: SubServiceList,
    },
    {
        path: "/tariff-list/:id/:name",
        props: true,
        name: "TariffList",
        component: TariffList,
    },
    {
        path: "/tariff-view/:id",
        props: true,
        name: "TariffView",
        component: TariffView,
    },
    {
        path: "/demandNote/:id",
        name: "DemandNoteReport",
        props: true,
        component: DemandNoteReport,

    },
    {
        path: "/view-demanNote/:servName/:id",
        name: "DemandNoteList",
        props: true,
        component: DemandNoteList,

    },

    {
        path: "/create-demand-note/:servName/:id",
        name: "AddDemandNote",
        props: true,
        component: AddDemandNote,

    },
    {
        path: "/create-colocation-demand-note/:servName/:id",
        name: "AddColocationDemandNote",
        props: true,
        component: AddColocationDemandNote,

    },

    {
        path: "/colocation-demanNote-list/:servName/:id",
        name: "ColocationDemandNoteList",
        props: true,
        component: ColocationDemandNoteList,

    },
    {
        path: "/colocation/demandNote-Status/:demandId",
        name: "colocationDemandNoteStatus",
        props: true,
        component: ColocationDemandNotestatus,

    },
    {
        path: "/colocation/demandNote/:id",
        name: "ColocationDemandNoteReport",
        props: true,
        component: ColocationDemandNoteReport,

    },

    {
        path: "/demandNote-Status/:servName/:demandId/:id",
        name: "DemandNoteStatus",
        props: true,
        component: DemandNoteStatus,

    },
    {
        path: "/view-landing-stations",
        name: "LandingStationList",
        component: LandingStationList,

    },
    {
        path: "/view-customer-type",
        name: "CustomerTypeList",
        component: CustomerTypeList,

    },
    {

        path: "/view-billing-list",
        name: "BillingList",
        component: BillingList,
    },
    {
        path: "/invoice-genrate",
        name: "InvoiceGenerate",
        component: InvoiceGenerate,

    },

    {
        path: "/Iplc/bill-process/:id",
        name: "IplcBillProcess",
        props: true,
        component: IplcBillProcess,

    },
    {
        path: "/Iplc/billing-list/:id",
        name: "IplcBillingList",
        props: true,
        component: IplcBillingList,
    },
    {
        path: "/Iplc/billing-report/:id/:report",
        name: "IplcBillingReport",
        props: true,
        component: IplcBillingReport,
    },
    {
        path: "/Iplc/invoice-list/:id",
        name: "IplcInvoiceList",
        props: true,
        component: IplcInvoiceList,
    },
    {
        path: "/Iplc/bill-view/:id/:serviceId",
        name: "IplcBillView",
        props: true,
        component: IplcBillView,

    },

    {
        path: "/Iplc/bill-adjust/:id",
        name: "IPLCCustomerBillAdjust",
        // props: true,
        component: IPLCCustomerBillAdjust,

    },


    {
        path: "/Iplc/bill-update/:id/:serviceId",
        name: "IplcBillUpdate",
        props: true,
        component: IplcBillUpdate,

    },
    {
        path: "/Iplc/bill-view/invoice/:id/:serviceId",
        name: "IplcMonthlyInvoiceView",
        props: true,
        component: IplcMonthlyInvoiceView,

    },
    {
        path: "/Iplc/bill-invoicereport/:id",
        name: "IplcInvoiceReport",
        props: true,
        component: InvoiceReport,

    },

    // ip transit
    {
        path: "/Ip-transit/bill-process/:id",
        name: "IpTransitBillProcess",
        props: true,
        component: IptBillProcess,

    },
    {
        path: "/Ip-transit/billing-list/:id",
        name: "IpTransitBillingList",
        props: true,
        component: IptBillingList,
    },
    {
        path: "/Ip-transit/invoice-list/:id",
        name: "IpTransitInvoiceList",
        props: true,
        component: IptInvoiceList,
    },
    {
        path: "/Ip-transit/bill-view/:id",
        name: "IpTransitBillView",
        props: true,
        component: IptBillView,

    },
    {
        path: "/Ip-transit/bill-update/:id",
        name: "IpTransitBillUpdate",
        props: true,
        component: IptBillUpdate,

    },
    {
        path: "/Ip-transit/bill-adjust/:id",
        name: "IPTCustomerBillAdjust",
        // props: true,
        component: IPTCustomerBillAdjust,

    },
    {
        path: "/Ip-transit/bill-invoicereport/:id",
        name: "IpTransitInvoiceReport",
        props: true,
        component: IpTransitInvoiceReport,

    },



    // colocation port
    {
        path: "/Co-location/bill-process/:id",
        name: "colocationBillProcess",
        props: true,
        component: ColocationBillProcess,

    },
    {
        path: "/Co-location/billing-list/:id",
        name: "colocationBillingList",
        props: true,
        component: ColocationBillingList,
    },
    {
        path: "/Co-location/bill-view/invoice/:id/:serviceId",
        name: "colocationMonthlyInvoiceView",
        props: true,
        component: colocationMonthlyInvoiceView,

    },
    {
        path: "/Co-location/bill-invoicereport/:id",
        name: "colocationInvoiceReport",
        props: true,
        component: colocationInvoiceReport,

    },
    {
        path: "/Co-location/invoice-list/:id",
        name: "colocationInvoiceList",
        props: true,
        component: ColocationInvoiceList,
    },
    {
        path: "/Co-location/bill-view/:id",
        name: "colocationBillView",
        props: true,
        component: ColocationBillView,

    },
    {
        path: "/Co-location/bill-update/:id",
        name: "colocationBillUpdate",
        props: true,
        component: ColocationBillUpdate,

    },
    {
        path: "/colocation-port/bill-adjust/:id",
        name: "PortCustomerBillAdjust",
        props: true,
        component: PortCustomerBillAdjust,

    },

    // colocation power


    {
        path: "/Co-location-power-rack/bill-process/:id",
        name: "colocationPowerBillProcess",
        props: true,
        component: ColocationPowerBillProcess,

    },
    {
        path: "/Co-location-power-rack/billing-list/:id",
        name: "colocationPowerBillingList",
        props: true,
        component: ColocationPowerBillingList,
    },
    {
        path: "/Co-location-power-rack/invoice-list/:id",
        name: "colocationPowerInvoiceList",
        props: true,
        component: ColocationPowerInvoiceList,
    },
    {
        path: "/Co-location-power-rack/bill-view/:id",
        name: "colocationPowerBillView",
        props: true,
        component: ColocationPowerBillView,

    },
    {
        path: "/Co-location-power-rack/bill-update/:id",
        name: "colocationPowerBillUpdate",
        props: true,
        component: ColocationPowerBillUpdate,

    },

    {
        path: "/Co-location-power-rack/bill-view/invoice/:id/:serviceId",
        name: "ColocationPowerMonthlyInvoiceView",
        props: true,
        component: ColocationPowerMonthlyInvoiceView,

    },
    {
        path: "/Co-location-power-rack/bill-invoicereport/:id",
        name: "ColocationPowerInvoiceReport",
        props: true,
        component: ColocationPowerInvoiceReport,

    },
    {
        path: "/colocation-power/bill-adjust/:id",
        name: "powerCustomerBillAdjust",
        props: true,
        component: powerCustomerBillAdjust,

    },

    // Report route

    {
        path: "/Iplc/bill-report/:id/:serviceId",
        name: "IplcBillReport",
        props: true,
        component: IplcBillReport,

    },
    {
        path: "/Iplc/bill-month/wise/report/:date/:serviceId",
        name: "IplcMonthWiseBillReport",
        props: true,
        component: IplcMonthWiseBillReport,

    },

    {
        path: "/iplc/rev/report/:id",
        name: "IplcRevgReport",
        props: true,
        component: IplcRevgReport,


    },
    {
        path: "/view-demanNote/report/:servName/:id",
        name: "DemandNoteReportList",
        props: true,
        component: DemandNoteReportList,

    },
    {
        path: "/view-total/revenue/report",
        name: "TotalRevenueReport",
        props: true,
        component: TotalRevenueReport,

    },

    {
        path: "/view-group-list",
        name: "GroupList",
        component: GroupList,


    },
    // {
    //     path:"/invoicereport",
    //     name:"InvoiceReport",
    //     component:InvoiceReport,

    // },

    { path: "/*", component: Dashboard },
];
