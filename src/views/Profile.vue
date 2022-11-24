<script>
import { useUserStore } from '../stores/user'

export default{
    setup () {
        return {
            userName: useUserStore().getUsername(),//da prendere il valore dalla sessione
        }
    },
    data(){
        return {
            theme:{
                Button: {
                    paddingRoundLarge: "26px 56px"
                }
            },
            buttonText: "venditore",
            visualizzaPrivato: true,
        }
    },
    methods: {
        changeVisualizzaPrivato(){
            this.visualizzaPrivato = !this.visualizzaPrivato;
            this.visualizzaPrivato ? this.buttonText = "venditore" : this.buttonText = "privato";
        }
    }
}

</script>

<template>
<n-config-provider :theme-overrides="theme">
    <n-space vertical style="background-color: #44355B; height: calc(100vh - 64px)" justify="center">

        <n-space justify="space-evenly" align="center" style="padding-bottom: 27px;">
            <span class="t-h1" style="color: white">Ciao {{userName}} !</span>
            <n-button round size="large" type="info" @click="changeVisualizzaPrivato">Vai al profilo {{buttonText}}</n-button>
        </n-space>
       
        <n-space justify="center" align="center">

            <n-card size="large" style="width:90vw">

                <!--visualizza opzioni pagina privata-->
                <div v-if="visualizzaPrivato">
                    <n-tabs type="line" animated>
                        <n-tab-pane name="Offerte" tab="Offerte">
                            <span class="t-medium-bold">Offerte</span>
                        </n-tab-pane>

                        <n-tab-pane name="Acquisti" tab="Acquisti">
                            <span class="t-medium-bold">Acquisti</span>
                        </n-tab-pane>

                    </n-tabs>    
                </div>

                <!--visualizza opzioni pagina privata venditore-->
                <div v-else>
                    <n-tabs type="line" animated>
                        <n-tab-pane name="Annunci" tab="Annunci">
                            <span class="t-medium-bold">Annunci</span>
                        </n-tab-pane>

                        <n-tab-pane name="Proposte" tab="Proposte">
                            <span class="t-medium-bold">Proposte</span>
                        </n-tab-pane>

                        <n-tab-pane name="Ordini" tab="Ordini">
                            <span class="t-medium-bold">Ordini</span>
                        </n-tab-pane>

                        <n-tab-pane name="Pagamenti" tab="Pagamenti">
                            <span class="t-medium-bold">Pagamenti</span>
                        </n-tab-pane>

                        <n-tab-pane name="Bozze" tab="Bozze">
                            <span class="t-medium-bold">Bozze</span>
                        </n-tab-pane>
                    </n-tabs>
                </div>

            </n-card>
        </n-space>

    </n-space>
</n-config-provider>

</template>

<style scoped>
</style>