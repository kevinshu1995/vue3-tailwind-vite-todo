<template>
    <ul class="p-4 space-y-3">
        <!-- name, checkbox, delete -->
        <li
            v-for="(task, index) in taskList"
            :key="`task-${index}`"
            class="flex items-center space-x-2"
        >
            <label
                class="
                    flex-grow flex
                    items-center
                    space-x-3
                    cursor-pointer
                    hover:bg-gray-800 hover:pl-3
                    transition-all
                    rounded-lg
                    py-3
                    pr-3
                "
            >
                <input
                    type="checkbox"
                    class="peer"
                    :checked="task.isDone"
                    @input="
                        $emit('update:checked', {
                            value: $event.target.checked,
                            timestamp: task.timestamp,
                        })
                    "
                />
                <span
                    class="
                        font-bold
                        peer-checked:text-gray-600 peer-checked:line-through
                    "
                >
                    {{ task.name }}
                </span>
            </label>
            <Button
                text="X"
                buttonClass="text-white hover:bg-red-500 transition rounded-md"
                @click="$emit('deleteTask', task.timestamp)"
            />
        </li>
    </ul>
</template>

<script>
import Button from "./Button.vue";

export default {
    components: {
        Button,
    },
    props: {
        taskList: Array,
    },
    setup() {},
};
</script>
