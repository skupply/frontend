<script>

</script>

<template>
  <!--sezione sotto navigation bar-->
  <n-space style="padding: 128px 0px 128px 0px" justify="space-evenly" size="large">
    <n-space vertical size="large">
      <span class="ag-t-h1">La scuola a misura<br/>di portafoglio</span>
      <span class="ag-t-large">Visita il nostro marketplace dove moltissimi<br/>
          studenti comprano e vendono ma soprattutto<br/>
          risparmiano su centinaia di prodotti scolastici.</span>
      <n-button round size="large"  type="info" block>Visita il negozio</n-button>
    </n-space>

    <n-space justify="end" size="large">
      <img src="../images/Landing.png" class="landingImage">
    </n-space>
  </n-space>

  <!--sezione centrale pagina-->

  <div class="centerDiv">
    <n-space vertical justify="center" align="center">

      <n-space vertical size="large" align="center" style="padding-bottom: 7vh">
        <span class="ag-t-h3">Come funziona?</span>
        <span class="ag-t-medium">Su Skupply tutto è semplice. Scopri come sfruttare al meglio la piattaforma! </span>
      </n-space>

      <!--cards-->
      <n-grid :cols="5" :rows="3" :y-gap="30">
        <!--card1-->
        <n-grid-item :offset="1" style="width:60vw;" span="4">
          <n-card>
            <n-layout size="large">
              <n-layout has-sider>
                <n-layout-sider width=400 style="margin-left:2vw">
                  <span class="ag-t-large-bold">Cerca, trova e risparmia!</span><br/><br/>
                  <span class="ag-t-medium" style="color: #000000">Si sta avvicinando l’inizio dell’anno scolastico e la lista della spesa è lunga?
                  <br/>Entra in Skupply e risparmia cercando tra centinaia di prodotti di seconda mano.</span>
                </n-layout-sider>
                <n-layout-content align="end" style="padding-right: 2vw">
                  <img src="../images/HomeCard1.png" style="max-width:auto; max-height:auto">  
                </n-layout-content>
              </n-layout>
            </n-layout>
            </n-card>
        </n-grid-item>

        <!--card2-->
        <n-grid-item :offset="1" style="width:60vw">
          <n-card>
            <n-layout size="large">
              <n-layout has-sider>
                <n-layout-content style="margin-left:2vw">
                  <img src="../images/HomeCard2.png" style="max-width:auto; max-height:auto">  
                </n-layout-content>
                <n-layout-sider width=350 style="margin-right:2vw">
                  <span class="ag-t-large-bold">Guadagna da ciò che non usi più!</span><br/><br/>
                  <span class="ag-t-medium" style="color: #000000">Quante volte hai comprato del materiale per utilizzarlo un paio di volte e dimenticarlo nel cassetto?
                    <br/>È ora di dargli nuova vita e di guadagnarci qualcosina.</span>
                </n-layout-sider>
              </n-layout>
            </n-layout>
            </n-card>
        </n-grid-item>

        <!--card3-->
        <n-grid-item :offset="1" style="width:60vw" span="3">
          <n-card>
            <n-layout size="large">
              <n-layout has-sider>
                <n-layout-sider width=370 style="margin-left:2vw">
                  <span class="ag-t-large-bold">Semplice, veloce e sicuro!</span><br/><br/>
                  <span class="ag-t-medium" style="color: #000000">Sfoglia il negozio, contatta i venditori, riempi il carrello e ricevi comodamente a casa.
                    <br/>Se qualcosa non dovesse andare per il meglio saremo lieti di occuparcene.</span>
                </n-layout-sider>
                <n-layout-content align="end" style="padding-right: 2vw">
                  <img src="../images/HomeCard3.png" style="max-width:auto; max-height:auto">  
                </n-layout-content>
              </n-layout>
            </n-layout>
            </n-card>
        </n-grid-item>
      </n-grid>  
    </n-space>
  </div>

  <!--sezione che sta tra la parte centrale e il footer della pagina-->
  <n-space style="padding: 100px 0px 100px 0px" justify="space-evenly" size="large" align="center">
    <n-space vertical>
      <span class="ag-t-h1">Pronto per iniziare?</span>
      <span class="ag-t-large">Sfoglia gli annunci o creane uno</span>
    </n-space>

    <n-space justify="space-between" size="large">
      <n-button round size="large" type="info" block>Visita il negozio</n-button>
      <n-button round size="large" type="primary" block>Inizia a vendere</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
 .landingImage{
  height: auto;
  width: auto;
}
.centerDiv{
  background: #44355B;
  box-shadow: 0px -4px 24px rgba(63, 61, 86, 0.2);
  align-items: baseline;
  padding-bottom: 16vh;
  padding-top: 16vh;
  background-image: url("../images/Vectors.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

</style>