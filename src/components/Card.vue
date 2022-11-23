<script setup>
    defineProps({
        subtitle : String,
        title: String,
        text: String,
        button: String,
    })
</script>

<template>
    <div class="card-bg">
        <div class="card-container">
            <n-text depth="3">{{subtitle}}</n-text>
            <n-h5><n-text type="primary" class="title">{{title}}</n-text></n-h5>
            <n-text class="text">{{text}}</n-text>
            <n-button type="primary" round size="medium" class="button">{{button}}</n-button>
        </div>
    </div>
</template>

<style scoped>
    .card-bg{
        border-radius: 20px;
        background-color: #FFFFFF;
        width: 250px;
        filter: drop-shadow(0 4px 24px #44355B28);
    }
    .card-container{
        display: flex;
        flex-direction: column;
        padding: 24px;
    }
    .title{
        line-height: 26.4px;
        margin-top: 16px;
    }

    .text{
        margin-top: 16px;
    }
    .button{
        margin-top: 32px
    }
</style>

