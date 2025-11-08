<script setup>
import { ref, computed } from "vue"

const iconDim = 50
const optionIconDim = 75

const charges = ref(0)
const shields = ref(3)
const compCharges = ref(0)
const compShields = ref(3)

const fireball = "FIREBALL"
const charge = "CHARGE"
const shield = "SHIELD"
const currentAction = ref(charge)

function isGrayscale(index, count) {
    return index >= count
}

// need at least 1 charge to use fireball
const canFireball = computed(() => {
    return charges.value > 0
})
// if we don't have full charges already, we can charge
const canCharge = computed(() => {
    return charges.value < 3
})
// if we have shield slots left, we can shield
const canShield = computed(() => {
    return shields.value > 0
})

// pick the action (this will update UI as well)
function selectAction(action) {
    currentAction.value = action
}

// making the change to values of shields and charges based on the action
function act() {
    if (currentAction.value == charge) {
        // charging gives us a charge
        charges.value++
        // not shielding resets shields
        shields.value = 3
        // if we can't charge anymore, select fireball as the default option
        if (!canCharge.value) currentAction.value = fireball
    }
    else if (currentAction.value == fireball) {
        // fireball consumes one charge
        charges.value--
        // not shielding resets shields
        shields.value = 3
        // if we're out of charges, select charge as the default option
        if (!canFireball.value) currentAction.value = charge
    }
    else if (currentAction.value == shield) {
        // shielding consumes one shield
        shields.value--
        // if we're out of shields and can charge, select that as the default option
        if (!canShield.value && canCharge.value) currentAction.value = charge
        // if we're out of shields, can't charge, but can fireball, that is the default option
        if (!canShield.value && canFireball.value) currentAction.value = fireball
    }
}
</script>

<template>
    <div class="container text-white text-center flex w-50">
        <div class="row my-4">
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_shield.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, compShields) }">
                </img>
            </div>
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_charge.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, compCharges) }">
                </img>
            </div>
            <div class="col fw-bold fs-1 title">
                Computer
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
            <div class="col fw-bold fs-1 title">
                You
            </div>
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_charge.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, charges) }">
                </img>
            </div>
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_shield.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, shields) }">
                </img>
            </div>
        </div>
        <div class="row column-gap-3 my-4">
            <button
            class="col card pt-3 rounded-5"
            :class="{ selected: currentAction == fireball, disabled: !canFireball }"
            @click="() => { canFireball ? selectAction(fireball) : null }">
                <img class="card-image-top d-block mx-auto" src="./fireball_fireball.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Fireball
                </div>
            </button>
            <button
            class="col card pt-3 rounded-5"
            :class="{ selected: currentAction == charge, disabled: !canCharge}"
            @click="() => { canCharge ? selectAction(charge) : null }">
                <img class="card-image-top d-block mx-auto" src="./fireball_charge.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Charge
                </div>
            </button>
            <button
            class="col card pt-3 rounded-5"
            :class="{ selected: currentAction == shield, disabled: !canShield }"
            @click="() => { canShield ? selectAction(shield) : null }">
                <img class="card-image-top d-block mx-auto" src="./fireball_shield.jpg" :width="optionIconDim" :height="optionIconDim">
                <div class="card-body d-grid fs-3 fw-bold">
                    Shield
                </div>
            </button>
        </div>
        <button @click="act">Act</button>
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
    cursor: default;
}

.big-text {
    font-size: 7em;
}

.grayscale {
    filter: grayscale(100%);
}
</style>
