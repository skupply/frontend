<script>
    import Card from "../components/Card.vue"
    import { SearchOutline } from '@vicons/ionicons5'
    import { Icon } from '@vicons/utils'
    import { defineComponent, ref } from "vue"
    import { useMessage } from "naive-ui"

    export default defineComponent({
    setup() {
        const formRef = ref(null);
        const message = useMessage();
        return {
        formRef,
        formValue: ref({
            user: {
            name: "",
            age: ""
            },
            phone: "",
            search: {
                query: "",
                category: "",
                area: ""
            }
        }),
        rules: {
            search: {
                query: {
                    required: true,
                    message: "Inserisci un termine di ricerca",
                    trigger: ["blur", "input"]
                }
            }
        },
        handleValidateClick(e) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
            if (!errors) {
                message.success("Valid");
            } else {
                console.log(errors);
                message.error("Invalid");
            }
            });
        },
        options: [
            {
            label: "Tutte le categorie",
            value: "",
            },
        ]
        };
    },
    components: {
            Icon, 
            SearchOutline
        },
    });
</script>

<template>
    <div class="search-bg"> <!-- search section -->
        <n-grid cols="1 m:2" responsive="screen" class="centered-container" y-gap="40px">
            <n-grid-item style="display: flex; justify-content: center;" >
                <div>
                    <span class="t-h2"> Nuova ricerca </span>
                    <div class="searchCard">
                        <n-form
                            ref="formRef"
                            :label-width="80"
                            :model="formValue"
                            :rules="rules"
                            size="large"
                        >
                            <n-form-item label="Cosa cerchi?" path="search.query">
                                <n-input round v-model:value="formValue.search.query" placeholder="Quaderno, Compasso, Libro" />
                            </n-form-item>
                            <n-form-item label="In quale categoria?" path="search.category">
                                <n-select v-model:value="formValue.search.category" :options="options"/>
                            </n-form-item>
                            <n-form-item label="Dove?" path="search.area">
                                <n-input round v-model:value="formValue.search.area" placeholder="Tutta Italia" />
                            </n-form-item>
                            <n-button round size="large" type="info" @click="handleValidateClick">
                                <Icon size="30" color="#FFFFFF">
                                    <SearchOutline />
                                </Icon>
                                Cerca
                            </n-button>
                        </n-form>
                    </div>
                </div>
            </n-grid-item>
            <n-grid-item style="display: flex; justify-content: center;">
                    <img src="../images/market_home.svg" style="width: max(25vw, 290px);">
            </n-grid-item>
        </n-grid>
    </div>
    <div style="margin: 32px; display: flex; justify-content: center;">
        <span class="t-h3" style="color: #44355BFF;">Esplora le nostre categorie</span>
    </div>
    <div class="centered-container">
        <n-grid cols="1 m:2 l:4" responsive="screen" x-gap="32px" y-gap="32px" style="width: fit-content; margin-bottom: 96px;">
            <n-grid-item>
                <Card
                    subtitle="Scuole"
                    title="Elementari"
                    text="Some quick example text to build on the card title and make up the bulk of the card's content."
                    button="Seleziona"
                />
            </n-grid-item>
            <n-grid-item>
                <Card
                    subtitle="Scuole"
                    title="Elementari"
                    text="Some quick example text to build on the card title and make up the bulk of the card's content."
                    button="Seleziona"
                />
            </n-grid-item>
            <n-grid-item>
                <Card
                    subtitle="Scuole"
                    title="Elementari"
                    text="Some quick example text to build on the card title and make up the bulk of the card's content."
                    button="Seleziona"
                />
            </n-grid-item>
            <n-grid-item>
                <Card
                    subtitle="Scuole"
                    title="Elementari"
                    text="Some quick example text to build on the card title and make up the bulk of the card's content."
                    button="Seleziona"
                />
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style scoped>
    .search-bg{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #44355BFF;
        min-height: 70vh;
    }

    .searchCard{
        padding: 20px;
        border-radius: 20px;
        background-color: white;
        width: max(25vw, 290px);
    }

    .centered-container{
        display: flex;
        justify-content: center;
    }
</style>

