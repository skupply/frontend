<script>
  import { Bag } from '@vicons/ionicons5'
  import { Icon } from '@vicons/utils'
  import { RouterView} from 'vue-router'

  import Footer from './components/Footer.vue'

  export default {
    components: {
      Bag,
      Icon
    },
    data() {
      return {
        theme: {
          common: {
            primaryColor: '#44355BFF',
            primaryColorHover: '#695D7CFF',
            primaryColorPressed: '#362A49FF',
            primaryColorSuppl: '#695D7CFF',

            infoColor: '#FA4F2EFF',
            infoColorHover: '#FB7258FF',
            infoColorPressed: '#C83F25FF',
            infoColorSuppl: '#FB7258FF',
          }
        }
      }
    }
  }
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <!-- Inserire Navbar -->

    <n-message-provider>
      <RouterView />
    </n-message-provider>
    <Footer />
  </n-config-provider>  
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    -ms-overflow-style: none; /* for Internet Explorer */
    scrollbar-width: none; /* for old versions of Firefox */
    overflow-y: scroll; 
}

body::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

.t-h1{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 62px;
  color: #44355B;
}

.t-large{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #1D1D1D;
}

.t-large-bold{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #1D1D1D;
}

.t-h3{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 44px;
  text-align: center;
  color: #FEFEFE;
}

.t-medium{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #FEFEFE;
}

.t-small-bold{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #1D1D1D;
}

.t-small{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #828282;
}

.c-error{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #CF4040; 
}
</style>