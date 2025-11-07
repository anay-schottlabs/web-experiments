<script setup>
const iconDim = 50;
const optionIconDim = 75;
</script>

<template>
    <div class="container text-white text-center flex w-50">
        <div class="row">
            <div class="col fw-bold fs-1 title">
                Computer
            </div>
        </div>
        <div class="row my-4">
            <div class="col d-flex justify-content-end mx-3">
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
            </div>
            <div class="col d-flex justify-content-start mx-3">
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
            </div>
        </div>
        <hr class="border border-2 border-white opacity-100">
        <div class="row">
            <div class="col fw-bold big-text title">
                GO
            </div>
        </div>
        <hr class="border border-2 border-white opacity-100">
        <div class="row my-4">
            <div class="col d-flex justify-content-end mx-3">
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_charge.jpg" :width="iconDim" :height="iconDim"></img>
            </div>
            <div class="col d-flex justify-content-start mx-3">
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
                <img src="./fireball_shield.jpg" :width="iconDim" :height="iconDim"></img>
            </div>
        </div>
        <div class="row column-gap-3 my-4">
            <button class="col card pt-3 rounded-5">
                <img class="card-image-top d-block mx-auto" src="./fireball_charge.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Charge
                </div>
            </button>
            <button class="col card pt-3 rounded-5">
                <img class="card-image-top d-block mx-auto" src="./fireball_fireball.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Fireball
                </div>
            </button>
            <button class="col card pt-3 rounded-5">
                <img class="card-image-top d-block mx-auto" src="./fireball_shield.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Shield
                </div>
            </button>
        </div>
        <div class="row">
            <div class="col fw-bold fs-1 title">
                You
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-color: #090040;
    color: white;
    border: 0.15em solid white;
}

.selected {
    border: 0.4em dashed #FFCC00;
}

.disabled {
    border: 0.15em solid grey;
    color: grey;
}

.big-text {
    font-size: 7em;
}
</style>
