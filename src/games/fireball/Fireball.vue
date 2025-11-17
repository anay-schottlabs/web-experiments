<script setup>
import { ref, computed } from "vue"
import fireballImg from "./fireball_fireball.jpg"
import chargeImg from "./fireball_charge.jpg"
import shieldImg from "./fireball_shield.jpg"

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

// timing variables
const showOutcomeDelay = 3000
const countdownTick = 750

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
const tie = "0"
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

            // change game state
            gameState.value = evaluating

            // exit the timer loop
            clearInterval(timeLoop)

            setTimeout(() => {
                startRound()
            }, showOutcomeDelay)
        }
    }, countdownTick)
}

function startRound(restartGame=false) {
    // if player health is 0 computer wins
    if (health.value == 0 && !restartGame) {
        gameState.value = compWin
    }
    // if computer health is 0 player wins
    else if (compHealth.value == 0 && !restartGame) {
        gameState.value = playerWin
    }
    // if no one won or lost, play the round as normal
    else {
        gameState.value = playing // change game state
        timer.value = 3 // reset timer
        if (restartGame) {
            charges.value = 1
            shields.value = 3
            health.value = 3
            compCharges.value = 1
            compShields.value = 3
            compHealth.value = 3
            currentAction.value = charge
            compAction.value = charge
            chosenAction.value = charge
        }
        gameLoop()
    }
}
</script>

<template>
    <div class="px-[10vw]">
        <div class="grid grid-cols-4 gap-x-[13vw] py-10">
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_shield.jpg"
                    :class="{ grayscale: isGrayscale(index, compShields) }">
                </img>
            </div>
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_charge.jpg"
                    :class="{ grayscale: isGrayscale(index, compCharges) }">
                </img>
            </div>
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_heart.jpg"
                    :class="{ grayscale: isGrayscale(index, compHealth) }">
                </img>
            </div>
            <div class="text-palette-black text-center font-bold text-6xl">
                Bot
            </div>
        </div>
        <hr class="border-palette-black border-3">
        
        <!-- COMPUTER SIDE ABOVE -->

        <div class="py-5 text-center">
            <!-- Display the timer if we're playing -->
            <div v-if="gameState == playing" class="text-palette-black text-9xl font-bold">
                {{ timer }}
            </div>
            <!-- Show a play button if we're not playing -->
            <div
            v-else-if="gameState == notPlaying"
            class="btn bg-palette-blue border-none shadow-none text-4xl p-10 w-[30vw]
            hover:shadow-2xl transition-all drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)]"
            @click="() => startRound(true)">
                Play
            </div>
            <!-- If the timer is up and we're evaluating: -->
            <!-- Show the chosen icons of player and computer -->
            <!-- Show who won the round -->
            <div v-else-if="gameState == evaluating" class="grid grid-cols-3 flex items-center">
                <img :src="playerImage" class="w-[15vh] h-[15vh] place-self-center">
                <p
                class="font-bold text-9xl"
                :class="{ 'text-palette-negative': outcome == compScore,
                'text-palette-positive': outcome == playerScore, 'text-palette-neutral': outcome == tie }">
                    {{ outcome }}
                </p>
                <img :src="compImage" class="w-[15vh] h-[15vh] place-self-center">
            </div>
            <!-- Show who won the the game -->
            <div
            v-else-if="gameState == playerWin || gameState == compWin"
            class="grid grid-cols-2 flex items-center">
                <p
                class="font-bold text-8xl text-palette-black">
                    {{ gameState == playerWin ? "You Win!" : "You Lose!" }}
                </p>
                <div
                class="btn bg-palette-blue border-none shadow-none text-4xl p-10 w-[30vw]"
                @click="() => startRound(true)">
                    Play Again
                </div>
            </div>
        </div>

        <!-- PLAYER SIDE BELOW -->

        <hr class="border-palette-black border-3">
        <div class="grid grid-cols-4 gap-[13vw] py-10">
            <div class="text-palette-black text-center font-bold text-6xl">
                You
            </div>
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_heart.jpg"
                    :class="{ grayscale: isGrayscale(index, health) }">
                </img>
            </div>
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_charge.jpg"
                    :class="{ grayscale: isGrayscale(index, charges) }">
                </img>
            </div>
            <div class="grid grid-cols-3">
                <img
                    v-for="(_, index) in Array.from({ length: 3 })"
                    src="./fireball_shield.jpg"
                    :class="{ grayscale: isGrayscale(index, shields) }">
                </img>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-5">
            <button
            class="card bg-palette-white shadow-lg rounded-2xl transition-all drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] h-[25vh]"
            :class="{
                selected: currentAction == fireball,
                disabled: !canFireball,
                'hover:ring-4 hover:ring-palette-blue hover:shadow-2xl hover:cursor-pointer': canFireball
            }"
            @click="() => { canFireball ? selectAction(fireball) : null }">
                <figure>
                    <img class="scale-20" src="./fireball_fireball.jpg">
                </figure>
                <div
                class="card-body card-title text-4xl font-bold transition-all"
                :class="{ 'text-palette-black': currentAction != fireball && canFireball }">
                    Fireball
                </div>
            </button>
            <button
            class="card bg-palette-white shadow-lg rounded-2xl transition-all drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] h-[25vh]"
            :class="{
                selected: currentAction == charge,
                disabled: !canCharge,
                'hover:ring-4 hover:ring-palette-blue hover:shadow-2xl hover:cursor-pointer': canCharge
            }"
            @click="() => { canCharge ? selectAction(charge) : null }">
                <figure>
                    <img class="scale-20" src="./fireball_charge.jpg">
                </figure>
                <div
                class="card-body card-title text-4xl font-bold transition-all"
                :class="{ 'text-palette-black': currentAction != charge && canCharge }">
                    Charge
                </div>
            </button>
            <button
            class="card bg-palette-white shadow-lg rounded-2xl transition-all drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] h-[25vh]"
            :class="{
                selected: currentAction == shield,
                disabled: !canShield,
                'hover:ring-4 hover:ring-palette-blue hover:shadow-2xl hover:cursor-pointer': canShield
            }"
            @click="() => { canShield ? selectAction(shield) : null }">
                <figure>
                    <img class="scale-20" src="./fireball_shield.jpg">
                </figure>
                <div
                class="card-body card-title text-4xl font-bold transition-all"
                :class="{ 'text-palette-black': currentAction != shield && canShield }">
                    Shield
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.selected {
    border: 0.4em solid var(--color-palette-blue);
    color: var(--color-palette-blue);
}

.disabled {
    border: 0.2em solid grey;
    color: var(--color-palette-neutral);
    cursor: default;
}
</style>
