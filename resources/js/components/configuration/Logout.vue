<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.logoutUser();
  },
  data() {},
  methods: {
    logoutUser() {
      // alert('ok');
    //   this.loading = true;
    //   axios.get("/logout")
    //   .then((response) => {
    //     this.loading = false;
    //     this.$router.push({
    //         path:"/"
    //     });
    //     Swal.fire({
    //       icon: "success",
    //       title: "Successfully Logout from System",
    //     });
    //  //   this.$router.push({ name: "/" });
    //   });
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

<style>
</style>
