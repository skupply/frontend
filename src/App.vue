<script>
  import { Bag } from '@vicons/ionicons5'
  import { Icon } from '@vicons/utils'
  import {RouterLink, RouterView} from 'vue-router'

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

<!--
  <n-button round size="large" type="info" icon-placement='left'>
      <Icon>
        <Bag />
      </Icon>
      Negozio
    </n-button>
-->

  <n-config-provider :theme-overrides="theme">
    <RouterView />
  </n-config-provider>  

</template>

<style>
/*
tutti questi stili sono disponibili in ogni pagina in quanto non scoped
*/
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll; 
}

body::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

.ag-t-h1{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 62px;
  color: #44355B;
}

.ag-t-large{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #1D1D1D;
}

.ag-t-large-bold{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #1D1D1D;
}

.ag-t-h3{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 44px;
  text-align: center;
  color: #FEFEFE;
}

.ag-t-medium{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #FEFEFE;
}

</style>