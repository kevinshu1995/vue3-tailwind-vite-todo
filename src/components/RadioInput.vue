<template>
    <label :for="inputId" class="relative inline-block">
        <input
            type="radio"
            :id="inputId"
            :name="inputName"
            :value="inputValue"
            class="hidden peer"
            :radio-checked="radioChecked"
            @change="$emit('update:radioChecked', $event.target.value)"
        />
        <span
            class="
                py-1
                px-3
                cursor-pointer
                bg-transparent
                border border-green-500
                hover:bg-green-500 hover:text-white
                focus:text-white
                whitespace-nowrap
                peer-checked:bg-green-500 peer-checked:text-white
                text-green-500
                rounded-lg
                inline-block
            "
            @click="$emit('onClick')"
        >
            {{ text }}
        </span>
    </label>
</template>

<script>
import Button from "./Button.vue";
export default {
    components: {
        Button,
    },
    props: {
        text: String,
        inputId: String,
        inputName: String,
        inputValue: String,
        radioChecked: [Boolean, String],
    },
    setup() {},
};
</script>
