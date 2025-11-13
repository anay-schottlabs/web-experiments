<script setup>
import { ref, computed } from "vue"
import fireballImg from "./fireball_fireball.jpg"
import chargeImg from "./fireball_charge.jpg"
import shieldImg from "./fireball_shield.jpg"

// image sizes
const iconDim = 50
const optionIconDim = 75
const evalIconDim = 125

// the charge and shield counts for the player, also health
const charges = ref(1)
const shields = ref(3)
const health = ref(3)
// charge and shield counts for the computer, also health
const compCharges = ref(1)
const compShields = ref(3)
const compHealth = ref(3)

// actions
const fireball = "FIREBALL"
const charge = "CHARGE"
const shield = "SHIELD"
const compAction = ref(charge)

// current action changes as soon as we act
const currentAction = ref(charge)
// the choice is rendered after acting
// so we need a variable to store the chosen action
// otherwise it will change
const chosenAction = ref(charge)

// Fetch images for the selected action
function getImageFromAction(action)  {
    switch (action) {
        case fireball:
            return fireballImg
        case charge:
            return chargeImg
        case shield:
            return shieldImg
    }
}
const playerImage = computed(() => getImageFromAction(chosenAction.value))
const compImage = computed(() => getImageFromAction(compAction.value))

// check if an icon should be grayed out
function isGrayscale(index, count) {
    return index >= count
}

// determining if we can perform an action
function canAct(action, charges, shields) {
    // need at least 1 charge to use fireball
    if (action == fireball) return charges > 0
    // if we don't have full charges already, we can charge
    if (action == charge) return charges < 3
    // if we have shield slots left, we can shield
    if (action == shield) return shields > 0
}
const canFireball = computed(() => {
    return canAct(fireball, charges.value, shields.value)
})
const canCharge = computed(() => {
    return canAct(charge, charges.value, shields.value)
})
const canShield = computed(() => {
    return canAct(shield, charges.value, shields.value)
})

// pick the action (this will update UI as well)
function selectAction(action) {
    currentAction.value = action
}

// making the change to values of shields and charges based on the action
function act(actionVar, chargesVar, shieldsVar, isPlayer) {
    if (actionVar.value == charge) {
        // charging gives us a charge
        chargesVar.value++
        // not shielding resets shields
        shieldsVar.value = 3
        // if we can't charge anymore, select fireball as the default option
        if (!canCharge.value && isPlayer) currentAction.value = fireball
    }
    else if (actionVar.value == fireball) {
        // fireball consumes one charge
        chargesVar.value--
        // not shielding resets shields
        shieldsVar.value = 3
        // if we're out of charges, select charge as the default option
        if (!canFireball.value && isPlayer) currentAction.value = charge
    }
    else if (actionVar.value == shield) {
        // shielding consumes one shield
        shieldsVar.value--
        // if we're out of shields and can charge, select that as the default option
        if (!canShield.value && canCharge.value && isPlayer) currentAction.value = charge
        // if we're out of shields, can't charge, but can fireball, that is the default option
        if (!canShield.value && canFireball.value && isPlayer) currentAction.value = fireball
    }
}

// game states
const notPlaying = "NOT PLAYING"
const playing = "PLAYING"
const evaluating = "EVALUATING"
const playerWin = "PLAYER WIN"
const compWin = "COMP WIN"
const gameState = ref(notPlaying)

// outcomes
const playerScore = "+1"
const compScore = "-1"
const tie = "-"
const outcome = ref()

// game loop
const timer = ref(3)

function gameLoop() {
    let timeLoop = setInterval(() => {
        timer.value--
        if (timer.value == 0) {
            // fill up the compActions array with only valid actions
            const compActions = []
            if (canAct(fireball, compCharges.value, compShields.value)) compActions.push(fireball)
            if (canAct(charge, compCharges.value, compShields.value)) compActions.push(charge)
            if (canAct(shield, compCharges.value, compShields.value)) compActions.push(shield)
            
            // pick one random action for the computer to do
            var randomIndex = Math.floor(Math.random() * compActions.length)
            compAction.value = compActions[randomIndex]

            // change player and comp stats
            chosenAction.value = currentAction.value
            act(currentAction, charges, shields, true) // change player stats
            act(compAction, compCharges, compShields, false) // change comp stats

            // determine outcome
            // fireball beats charge
            // otherwise it's a tie
            if (chosenAction.value == fireball && compAction.value == charge) {
                outcome.value = playerScore // displays "+1"
                compHealth.value-- // subtracts 1 from comp health
            }
            else if (compAction.value == fireball && chosenAction.value == charge) {
                outcome.value = compScore // displays "-1"
                health.value-- // subtracts 1 from player health
            }
            else outcome.value = tie

            // if player health is 0 computer wins
            if (health.value == 0) {
                gameState.value = compWin
            }
            // if computer health is 0 player wins
            else if (compHealth.value == 0) {
                gameState.value = playerWin
            }

            // change game state
            gameState.value = evaluating

            // exit the timer loop
            clearInterval(timeLoop)

            setTimeout(() => {
                startRound()
            }, 3000)
        }
    }, 750)
}

function startRound() {
    gameState.value = playing // change game state
    timer.value = 3 // reset timer
    gameLoop()
}
</script>

<template>
    <div class="container text-white text-center flex w-75">
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
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_heart.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, compHealth) }">
                </img>
            </div>

            <div class="col fw-bold fs-1 title">
                Computer
            </div>
        </div>
        <hr class="border border-2 border-white opacity-100">
        
        <!-- COMPUTER SIDE ABOVE -->

        <div class="row">
            <!-- Display the timer if we're playing -->
            <div v-if="gameState == playing" class="col fw-bold big-text title">
                {{ timer }}
            </div>
            <!-- Show a play button if we're not playing -->
            <div
            v-else-if="gameState == notPlaying"
            class="col btn btn-primary fs-1 fw-bold title btn-lg m-5"
            @click="startRound">
                Play
            </div>
            <!-- If the timer is up and we're evaluating: -->
            <!-- Show the chosen icons of player and computer -->
            <!-- Show who won the round -->
            <div v-else-if="gameState == evaluating" class="row d-flex align-items-center">
                <div class="col">
                    <img
                    :src="playerImage"
                    :width="evalIconDim"
                    :height="evalIconDim">
                </div>
                <div class="col">
                    <p class="fw-bold big-text">{{ outcome }}</p>
                </div>
                <div class="col">
                    <img
                    :src="compImage"
                    :width="evalIconDim"
                    :height="evalIconDim">
                </div>
            </div>
        </div>

        <!-- PLAYER SIDE BELOW -->

        <hr class="border border-2 border-white opacity-100">
        <div class="row my-4">
            <div class="col fw-bold fs-1 title">
                You
            </div>
            <div class="col">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_heart.jpg"
                    :width="iconDim"
                    :height="iconDim"
                    :class="{ grayscale: isGrayscale(index, health) }">
                </img>
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
