<script>

</script>

<template>
    <n-config-provider :theme-overrides="theme">
    <!--inserire nav bar-->
    <!--non vi è un tag form ma più campi input messi in un div, manca gestore input e bottone per conferma, 
        è presente uno span con id = errorMsg da poter usare assieme a js in caso di errori di login,
        ogni tag input non registra le info inserite-->

    <!--image e form per login-->
    <n-space justify="space-around" align="center" style="padding-top: 12vh; padding-left: 16vw; padding-right: 16vw;">
        <img src="../images/Login.png"/>

        <n-card bordered style="width: 27vw;">
            <span class="ag-t-h1">Login</span>

            <!--la parte di login vera e propria-->
            <n-space vertical style="align-content: end; padding-bottom: 24px; padding-top: 32px;">
                <n-space vertical>
                    <span class="ag-t-small-bold">Email</span>
                    <n-input size="large" round placeholder="Email"/><!--il type email non esiste in naive, bisogna creare un validatore-->
                </n-space>

                <n-space vertical>
                    <span class="ag-t-small-bold">Password</span>
                    <n-input size="large" round type="password" show-password-on="mousedown" placeholder="Password"/>
                </n-space>

                <a href="" class="ag-t-small" style="text-decoration: none">Password dimenticata?</a>
            </n-space>

            <!-- bottoni e link esterni-->
            <n-space vertical style="row-gap: 56px; padding-bottom: 32px;">
                <n-space vertical size="medium">
                    <n-button round size="large" type="primary" block @click="">Accedi</n-button>
                    <span id="errorMsg" class="c-error">Fatal login error</span><!--span per l'inserimento di messaggi di errori dovuti al login-->
                </n-space>
                    
                <n-space vertical size="medium">
                    <span class="ag-t-small">Non hai ancora un account?</span>
                    <n-button round size="large" type="info" block @click="">Registrati</n-button>
                </n-space>
            </n-space>
        </n-card>
    </n-space>

    <!--inserire footer-->
    </n-config-provider>
</template>

<style scoped>

</style>