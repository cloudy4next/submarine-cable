<template>
  <div class="wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          <a
            class="nav-link"
            data-widget="navbar-search"
            href="#"
            role="button"
          >
            <i class="fas fa-search"></i>
          </a>
          <div class="navbar-search-block">
            <form class="form-inline">
              <div class="input-group input-group-sm">
                <input
                  class="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                  <button
                    class="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li> -->
        <!-- <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div
                        class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                    >
                        <span class="dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm"
                                >3 mins</span
                            >
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer"
                            >See All Notifications</a
                        >
                    </div>
                </li> -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">

          <span class="text-black">{{ authName }}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div class="dropdown-divider"></div>
          <a href="/logout"  class="dropdown-item dropdown-footer">Logout</a>

        </div>
      </li>

      </ul>
    </nav>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/dashboard" class="brand-link">
        <img
          width="100"
          src="/assets/dist/img/logo.png"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">BSCCL</span>
      </a>
      <div class="sidebar">
        <!-- <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img
                            src="dist/img/user2-160x160.jpg"
                            class="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div class="info">
                        <a href="#" class="d-block">Alexander Pierce</a>
                    </div>
                </div> -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >

            <li class="nav-item">
              <a href="/dashboard" class="nav-link">
                <i class="fa fa-home" aria-hidden="true"></i>
                <p>
                  Dashboard
                </p>
              </a>
            </li>

            <!-- customer -->
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-users" aria-hidden="true"></i>
                <p>
                  Customers
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li class="nav-item" v-if="$can('Iplc-customer-view')">
                    <router-link :to="{ name: 'CustomerList', params: { id: 13 } }" class="nav-link">
                    <i class="far fa-user nav-icon"></i>
                    <p>Co-location List (Port)</p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="$can('Iplc-customer-view')">
                    <router-link :to="{ name: 'CustomerList', params: { id: 23 } }" class="nav-link">
                    <i class="far fa-user nav-icon"></i>
                    <p>Co-location List (Power)</p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="$can('Iplc-customer-view')">
                  <router-link :to="{ name: 'CustomerList', params:{id: 1} }" class="nav-link">
                    <i class="far fa-user nav-icon"></i>
                    <p>Customer List (IPLC)</p>
                  </router-link>
                </li>
                <li class="nav-item" v-if="$can('IpTransit-customer-view')">
                  <router-link :to="{ name: 'CustomerList', params:{id: 7} }" class="nav-link">
                    <i class="far fa-user nav-icon"></i>
                    <p>Customer List (IPT)</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- start demand note  -->
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-credit-card" aria-hidden="true"></i>
                <p>
                  Demand Note
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li class="nav-item" v-if="$can('coloc-iplc-demand-note-View')">
                  <router-link
                    :to="{ name: 'ColocationDemandNoteList', params: { servName: 'Iplc-Colocation', id: 13 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>Co-location List (Port)</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('colocation-demandnote-view')">
                  <router-link
                    :to="{ name: 'ColocationDemandNoteList', params: { servName: 'Colocation-Service', id: 23 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>Co-location List (Power)</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iplc-demandNote-View')">
                  <router-link
                    :to="{ name: 'DemandNoteList', params: { servName: 'IPLC', id: 1 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>IPLC List</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iptransit-demandNote-View')">
                  <router-link
                    :to="{ name: 'DemandNoteList', params: { servName: 'IP-Transit', id: 7 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>IP Transit List</p>
                  </router-link>
                </li>

              </ul>
            </li>

            <!-- end demand note -->

            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-balance-scale" aria-hidden="true"></i>
                <p>
                  Bill
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li class="nav-item" v-if="$can('Iplc-billing')">
                  <router-link
                    :to="{
                      name: 'IplcBillingList',
                      params: { id: 1 },
                    }"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>IPLC</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iptransit-billing')">
                  <router-link
                    :to="{
                      name: 'IpTransitBillingList',
                      params: { id: 7 },
                    }"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>IP Transit</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iptransit-billing')">
                 <router-link
                    :to="{ name: 'colocationBillingList', params: { servName: 'Colocation-Service', id: 13 } }"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                     <p>Colocation (Port)</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iptransit-billing')">
                 <router-link
                    :to="{ name: 'colocationPowerBillingList', params: { servName: 'Colocation-Power', id: 23 } }"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                     <p>Colocation (Power) </p>
                  </router-link>
                </li>

                <!-- <li class="nav-item">
                  <router-link
                    :to="{ name: 'IplcInvoiceList' }"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Invoice List (IPLC)</p>
                  </router-link>
                </li> -->

              </ul>
            </li>

            <li class="nav-item" v-if="$can('service-view')">
              <a href="#" class="nav-link">
                <i class="fa fa-server" aria-hidden="true"></i>
                <p>
                  Services
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li
                  class="nav-item"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <router-link
                    :to="{
                      name: 'SubServiceList',
                      params: { id: item.id, name: item.service },
                    }"
                    class="nav-link"
                  >
                    <i class="far fa-edit nav-icon"></i>
                    <p>{{ item.service }}</p>
                    <!-- <p @click="addSubCategory(item.id, item.service)">{{ item.service }}</p> -->
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item" v-if="$can('tariff-view')">
              <a href="#" class="nav-link">
               <i class="fa fa-cart-plus" aria-hidden="true"></i>
                <p>
                  Tariff
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li
                  class="nav-item"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <router-link
                    :to="{
                      name: 'TariffList',
                      params: { id: item.id, name: item.service },
                    }"
                    class="nav-link"
                  >
                    <i class="fa fa-plus nav-icon"></i>
                    <p>{{ item.service }}</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <router-link :to="{ name: 'Event' }" class="nav-link">
                    <i class="fa fa-calendar nav-icon"></i>
                    <p>Event</p>
              </router-link>
            </li>


            <li class="nav-item">
              <a href="/database-bekup" class="nav-link">
                 <i class="fa fa-database" aria-hidden="true"></i>
                <p>
                  Database Bekup
                </p>
              </a>
            </li>


            <li class="nav-item" v-if="$can('Reports')">
              <a href="#" class="nav-link">
                <i class="fa fa-history" aria-hidden="true"></i>
                <p>
                  Report Generate
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">
                <li class="nav-item">
                  <router-link class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Report</p>
                  </router-link>
                </li>

                <li class="nav-item" v-if="$can('Iplc-demandNote-View')">
                  <router-link
                    :to="{ name: 'DemandNoteReportList', params: { servName: 'IPLC', id: 1 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>IPLC Billing Report</p>
                  </router-link>
                </li>

                 <li class="nav-item" v-if="$can('Iplc-billing')">
                    <router-link
                      :to="{
                        name: 'IplcBillingReport',
                        params: { id: 1, report: 1 },
                      }"
                      class="nav-link"
                    >
                      <i class="fa fa-list-ul"></i>
                      <p>IPLC Bill Details Report</p>
                    </router-link>
                  </li>

                 <li class="nav-item" v-if="$can('Iplc-billing')">
                      <router-link
                      :to="{
                        name: 'TotalRevenueReport',
                      }"
                      class="nav-link"
                    >
                      <i class="fa fa-list-ul"></i>
                      <p>Total Revenue Report</p>
                    </router-link>
                  </li>

                 <li class="nav-item" v-if="$can('Iplc-billing')">
                      <router-link
                      :to="{
                        name: 'IplcRevgReport',
                        params: { id: 1, report: 1 },
                      }"
                      class="nav-link"
                    >
                      <i class="fa fa-list-ul"></i>
                      <p>Revenue Report</p>
                    </router-link>
                  </li>

                <!-- <li class="nav-item" v-if="$can('Iptransit-demandNote-View')">
                  <router-link
                    :to="{ name: 'DemandNoteReportList', params: { servName: 'IP-Transit', id: 7 } }"
                    class="nav-link"
                  >
                    <i class="fa fa-list-ul"></i>
                    <p>IP Transit List</p>
                  </router-link>
                </li> -->
              </ul>
            </li>

            <li class="nav-item" v-if="$can('Settings')">
              <a href="#" class="nav-link">
                <i class="fa fa-cog" aria-hidden="true"></i>
                <p>
                  Settings
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">

                <li class="nav-item">
                  <router-link :to="{ name: 'UserList' }" class="nav-link">
                    <i class="far fa-user nav-icon"></i>
                    <p>Users</p>
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link :to="{ name: 'SignList' }" class="nav-link">
                    <i class="fa fa-edit nav-icon"></i>
                    <p>Sign Info</p>
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link :to="{ name: 'MailTo' }" class="nav-link">
                    <i class="fa fa-envelope nav-icon"></i>
                    <p>Mail</p>
                  </router-link>
                </li>

                <!-- <li class="nav-item">
                  <router-link :to="{ name: 'Event' }" class="nav-link">
                    <i class="fa fa-calendar nav-icon"></i>
                    <p>Event</p>
                  </router-link>
                </li> -->

                <li class="nav-item" >
                  <router-link
                    :to="{ name: 'RolePermission' }"
                    class="nav-link"
                  >
                    <i class="fa fa-cogs nav-icon"></i>
                    <p>Role & Permission</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    :to="{ name: 'CustomerTypeList' }"
                    class="nav-link"
                  >
                    <i class="far fa-file nav-icon"></i>
                    <p>Customer Type</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'ServiceList' }" class="nav-link">
                    <i class="fa fa-database nav-icon"></i>
                    <p>Services</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'GroupList' }" class="nav-link">
                    <i class="fa fa-sticky-note nav-icon"></i>
                    <p>Group & Pop</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    :to="{ name: 'LandingStationList' }"
                    class="nav-link"
                  >
                    <i class="fa fa-map-marker nav-icon"></i>
                    <p>Landing Station</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-cogs" aria-hidden="true"></i>
                <p>
                  Manage Application
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview custom-treeview-padding">

              </ul>
            </li> -->

          </ul>
        </nav>
      </div>
    </aside>
    <router-view :key="$route.fullPath"></router-view>

    <footer class="main-footer pb-5">
      <div class="float-left">
          <strong>Copyright &copy; 2014-2022 BSCCL All rights reserved.</strong>
      </div>
      <div class="float-right">
        <strong> Developed By <a href="https://www.dream71.com/" target="_blank"> Dream 71</a></strong>
      </div>

    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      authName: "",
      listData: [],
    };
  },
  created() {
    this.getServiceList();
    this.getAuthuserName();
  },

  methods: {
    getServiceList() {
      this.loading = true;
      axios.get("/service-list").then((response) => {
        this.loading = false;
        this.listData = response.data.data;
      });
    },
    getAuthuserName() {
      axios
        .get("/get-auth-user")
        .then(({ data }) => (this.authName = data))
        .catch();
    },
      logout:function(){
                axios.get('logout').then(response => {
                    if (response.status === 302 || 401) {
                        //console.log('logout')
                        window.location.href = '/';
                    }
                    else {
                        window.location.href = '/';
                    }
                }).catch(error => {

                });
            },
  },
};
</script>

<style scoped>
 .custom-treeview-padding li{
    padding-left: 20px;
 }
</style>
