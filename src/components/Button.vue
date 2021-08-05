<template>
    <button :class="buttonStyle" @click="$emit('onClick')">
        {{ text }}
    </button>
</template>

<script>
import { computed } from "vue";
export default {
    props: {
        buttonClass: String,
        text: String,
    },
    setup(props) {
        const buttonStyle = computed(() => {
            const defaultFormat = "rounded-lg px-4 py-2";
            const defaultTheme =
                "bg-green-500 hover:bg-green-600 focus:bg-green-700";
            return [defaultFormat, props.buttonClass || defaultTheme].join(" ");
        });

        return {
            buttonStyle,
        };
    },
};
</script>
