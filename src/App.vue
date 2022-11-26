<script>
  import { RouterView } from 'vue-router'

  import Footer from './components/Footer.vue'
  import NavBar from './components/NavBar.vue'

  export default {
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
          },
          Typography: {
            headerFontSize1: "56px",
            headerFontSize2: "48px",
            headerFontSize3: "40px",
            headerFontSize4: "32px",
            headerFontSize5: "24px",
            headerFontSize6: "20px",
            headerMargin1: "0",
            headerMargin2: "0",
            headerMargin3: "0",
            headerMargin4: "0",
            headerMargin5: "0",
            headerMargin6: "0",
            textColor3Depth: "#BDBDBDFF"
          }
        }
      }
    }
  }
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <NavBar />
    <n-message-provider>
      <RouterView />
    </n-message-provider>
    <Footer />
  </n-config-provider>  
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
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

.t-h2{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height:52.3px;
  text-align: center;
  color: #FEFEFE;
}

.t-h5{
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  color: #44355B;
}

.t-normal{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

.t-normal-bold{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  color: #44355B;
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

.t-medium-bold{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #828282;
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