<template>
  <div>
    <Influencer v-if="user.role == 'Influencer'" />
    <Sponsor v-if="user.role == 'Sponsor'" />
  </div>
</template>

<script>

  import Influencer from '@/pages/dashboard/influencer-dashboard.vue'
  import Sponsor from '@/pages/dashboard/sponsor-dashboard.vue'
  export default{
    middleware: ['auth'],
    components: {
      Influencer,
      Sponsor
    },
    // data() {
    //   return {
    //     form: {
    //     }
    //   }
    // },
    // mounted:function(){
    //   this.method1()
    // },
    // methods: {
    //   method1:function(){
    //     console.log(this.user);
    //   },
    //   submit() {
    //
    //   }
    // }
  }

</script>
