<script setup>
import { ref, computed } from "vue"

// Time
const timeSeconds = ref(0)

// Converting time value to a formatted string
const timeText = computed(() => {
    const minutes = Math.floor(timeSeconds.value / 60);
    const extraSeconds = timeSeconds.value - minutes * 60
    return `${minutes}:${extraSeconds < 10 ? 0 : ""}${extraSeconds}`
})

// State
const state = ref(PAUSED)
const PAUSED = "PAUSED"
</script>

<template>
    <div class="grid grid-cols-4 flex h-[80vh]">
        <div class="flex grid grid-cols-10">
            <div class="text-palette-black font-bold text-5xl text-center col-span-9">Signals</div>
            <div class="divider divider-horizontal before:bg-palette-black after:bg-palette-black"></div>
        </div>
        <div class="col-span-2 m-auto grid grid-rows-2 gap-10">
            <div class="text-palette-black text-9xl font-bold">
                {{ timeText }}
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button class="btn">
                    {{ timeSeconds == 0 ? "Start" : "Continue" }}
                </button>
                <button class="btn">
                    {{ state == PAUSED ? "Reset" : "Stop" }}
                </button>
            </div>
        </div>
        <div class="flex grid grid-cols-10">
            <div class="divider divider-horizontal before:bg-palette-black after:bg-palette-black"></div>
            <div class="text-palette-black font-bold text-5xl text-center col-span-9">Settings</div>
        </div>
    </div>
</template>
