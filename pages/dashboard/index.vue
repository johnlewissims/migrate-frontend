<template>
  <div>
    <Influencer v-if="user.role == 'I'" />
    <Sponsor v-if="user.role == 'S'" />
    <Agent v-if="user.role == 'A'" />
  </div>
</template>

<script>

  import Influencer from '@/pages/dashboard/influencer-dashboard.vue'
  import Sponsor from '@/pages/dashboard/sponsor-dashboard.vue'
  import Agent from '@/pages/dashboard/agent-dashboard.vue'
  export default{
    middleware: ['auth'],
    components: {
      Influencer,
      Sponsor,
      Agent
    },
    // data() {
    //   return {
    //     form: {
    //     }
    //   }
    // },
    mounted:function(){
      this.forward()
    },
    methods: {
      forward() {
        console.log(this.user);
        if(this.user.role == "S" || this.user.role == "A") {
          this.$router.push("/dashboard/library");
        }
      },
      submit() {

      }
    }
  }

</script>
