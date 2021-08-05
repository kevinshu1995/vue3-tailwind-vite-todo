<template>
    <div class="relative text-gray-100">
        <label
            v-if="!modelValue"
            :for="inputId"
            class="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                translate-x-5
                cursor-text
            "
        >
            {{ label }}
        </label>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :id="inputId"
            :name="inputName"
            type="text"
            :class="[
                'px-4',
                'py-2',
                'rounded-lg',
                'outline-none',
                'border',
                isError ? 'border-red-500' : 'border-transparent',
                'focus:border-green-500',
            ]"
        />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        inputId: String,
        inputName: String,
        label: String,
        isError: Boolean,
    },
    setup() {},
};
</script>
