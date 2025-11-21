<script setup>
import { ref, computed } from "vue"

// Time
const timeSeconds = ref(0)

// Converting time value to a formatted string
function getTimeString(seconds) {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = seconds - minutes * 60
    return `${minutes}:${extraSeconds < 10 ? 0 : ""}${extraSeconds}`
}

const timeText = computed(() => getTimeString(timeSeconds.value))

const chosenSignalText = ref("")
const chosenSignalTime = ref(30)
const chosenSignalTimeText = computed(() => getTimeString(chosenSignalTime.value))

// Time signals
class TimeSignal {
    constructor(atSeconds, text) {
        this.atSeconds = atSeconds // the time in seconds at which the signal should be shown
        this.text = text // what to show on screen when showing the signal
        this.done = false // whether the time signal was shown already or not
    }
}

const timeSignals = ref([])

// Settings
const showStopwatch = ref(true);
const showTimeSignals = ref(true);

// State
const state = ref(PAUSED)
const PAUSED = "PAUSED"
const ACTIVE = "ACTIVE"

const defaultSignalText = "SIGNAL"
const activeTimeSignal = ref(defaultSignalText)
const showDuration = 1;

var loop

function startTimer() {
    state.value = ACTIVE
    loop = setInterval(() => {
        timeSeconds.value++

        let foundSignal = false
        for (let timeSignal of timeSignals.value) {
            let timeDiff = timeSeconds.value - timeSignal.atSeconds
            // show the time signal for 3 seconds
            if (timeDiff >= 0 && timeDiff <= showDuration) {
                activeTimeSignal.value = timeSignal.text
                foundSignal = true
                break
            }
            else if (timeDiff > showDuration) timeSignal.done = true
        }
        if (!foundSignal) activeTimeSignal.value = defaultSignalText
    }, 1000)
}

function stopTimer() {
    state.value = PAUSED
    clearInterval(loop)
}

function resetTimer() {
    timeSeconds.value = 0
}

function addTimeSignal(atSeconds, text) {
    // reset variables
    chosenSignalTime.value = 30
    chosenSignalText.value = ""
    // add the time signal
    const signalsSorted = timeSignals.value // copy time signals to a new array
    signalsSorted.push(new TimeSignal(atSeconds, text)) // add the new time signal
    signalsSorted.sort((a, b) => a.atSeconds - b.atSeconds) // sort by time
    timeSignals.value = signalsSorted // assign sorted array back to default array to display in ui
}
</script>

<template>
    <div class="grid grid-cols-4 flex h-[80vh]">

        <!-- TIME SIGNALS PANEL BELOW -->

        <div class="flex grid grid-cols-10">
            <div class="col-span-9">
                <div class="text-palette-black font-bold text-5xl text-center mb-10">
                    Signals
                </div>
                <button
                class="btn bg-palette-black text-lg py-6 font-bold shadow-none mb-7
                border-none hover:shadow-xl hover:ring-4 hover:ring-palette-blue w-full"
                onclick="add_signal.showModal()">
                    Add
                </button>
                <div
                v-for="signal in timeSignals"
                class="card card-body text-palette-black bg-palette-white ring-4 ring-palette-blue w-full mb-5 cursor-pointer"
                :class="{ 'ring-palette-neutral': signal.done, 'text-palette-neutral': signal.done }">
                    <span class="text-center text-3xl">
                        <span class="font-bold">
                            {{ signal.text }}
                        </span>
                        at {{ getTimeString(signal.atSeconds) }}
                    </span>
                </div>
            </div>
            <div class="divider divider-horizontal before:bg-palette-black after:bg-palette-black"></div>
        </div>

        <!-- STOPWATCH PANEL BELOW -->

        <div class="col-span-2 m-auto grid grid-rows-3 gap-5 w-full">
            <div
            class="bg-palette-black rounded-4xl text-9xl font-bold text-center w-3/4 mx-auto p-8 cursor-default"
            :class="{ 'text-white': activeTimeSignal != defaultSignalText,
            'text-palette-black': activeTimeSignal == defaultSignalText }"
            v-show="showTimeSignals">
                {{ activeTimeSignal }}
            </div>
            <div class="text-palette-black text-9xl font-bold text-center" v-show="showStopwatch">
                {{ timeText }}
            </div>
            <div class="mx-auto w-1/2" v-show="showStopwatch">
                <div v-if="state == PAUSED" class="grid grid-cols-2 gap-2">
                    <button
                    class="btn bg-palette-black text-lg py-6 font-bold shadow-none
                    border-none hover:shadow-xl hover:ring-4 hover:ring-palette-blue"
                    @click="startTimer">
                        {{ timeSeconds == 0 ? "Start" : "Continue" }}
                    </button>
                    <button
                    class="btn bg-palette-black text-lg py-6 font-bold shadow-none
                    border-none hover:shadow-xl hover:ring-4 hover:ring-palette-blue"
                    @click="resetTimer">
                        Reset
                    </button>
                </div>
                <div v-if="state == ACTIVE">
                    <button
                    class="btn bg-palette-black text-lg py-6 font-bold shadow-none w-full
                    border-none hover:shadow-xl hover:ring-4 hover:ring-palette-blue"
                    @click="stopTimer">
                        Stop
                    </button>
                </div>
            </div>
        </div>

        <!-- SETTINGS PANEL BELOW -->

        <div class="flex grid grid-cols-10">
            <div class="divider divider-horizontal before:bg-palette-black after:bg-palette-black"></div>
            <div class="col-span-9">
                <div class="text-palette-black font-bold text-5xl text-center mb-10">
                    Settings
                </div>
                <div class="grid grid-rows-2 gap-4">
                    <div class="grid grid-cols-12 items-center">
                        <h3 class="col-span-11 text-xl font-bold text-palette-black truncate">
                            Show Time Signals
                        </h3>
                        <input
                            type="checkbox"
                            v-model="showTimeSignals"
                            class="col-span-1 justify-self-end toggle border-palette-neutral bg-palette-white text-palette-neutral
                            checked:border-palette-blue checked:bg-palette-blue checked:text-palette-white toggle-lg" />
                    </div>
                    <div class="grid grid-cols-12 items-center">
                        <h3 class="col-span-11 text-xl font-bold text-palette-black truncate">
                            Show Stopwatch
                        </h3>
                        <input
                            type="checkbox"
                            v-model="showStopwatch"
                            class="col-span-1 justify-self-end toggle border-palette-neutral bg-palette-white text-palette-neutral
                            checked:border-palette-blue checked:bg-palette-blue checked:text-palette-white toggle-lg" />
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALS BELOW -->

        <dialog id="add_signal" class="modal">
            <div class="modal-box bg-palette-black">
                <h3 class="text-2xl font-bold text-white">Add a time signal</h3>
                <div class="mt-5 grid grid-rows-3 gap-0">
                    <input
                    type="text"
                    placeholder="Signal"
                    maxlength="5"
                    class="input bg-palette-white border-none text-palette-black w-full"
                    v-model="chosenSignalText" />
                    <div class="grid grid-cols-4 p-2 place-items-center mb-2">
                        <h4 class="text-2xl font-bold text-white text-center">{{ chosenSignalTimeText }}</h4>
                        <input
                        type="range"
                        min="30"
                        max="900"
                        step="30"
                        v-model="chosenSignalTime"
                        class="col-span-3 range w-full" 
                        style="--range-bg: var(--color-palette-white); --range-thumb: var(--color-palette-blue); --range-fill: 0">
                    </div>
                    <form method="dialog" class="my-1">
                        <button
                        @click="() => addTimeSignal(chosenSignalTime, chosenSignalText)"
                        class="btn bg-palette-black shadow-none ring-2 w-full"
                        :class="{ 'btn-disabled': chosenSignalText == '', 'ring-palette-neutral': chosenSignalText == '',
                        'ring-palette-white': chosenSignalText != '' }">
                            Done
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>
