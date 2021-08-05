<template>
    <div
        class="
            min-h-screen
            bg-gradient-to-b
            from-gray-900
            to-gray-800
            text-white
        "
    >
        <div class="container pt-10 mx-auto px-2">
            <div class="-mx-2 flex flex-wrap space-y-10">
                <div class="px-2 w-full">
                    <h1 class="font-black text-5xl">Create New Task</h1>
                </div>
                <div class="px-2 w-full">
                    <div class="flex space-x-3">
                        <Textfield
                            v-model="newTask"
                            input-id="new-task"
                            input-name="new-task"
                            label="Type your new task here."
                            :class="taskTextFieldClass"
                            :isError="taskfieldError"
                        />
                        <Button text="Add Task" @onClick="addNewTask" />
                    </div>
                </div>
                <div class="px-2 w-full">
                    <div
                        class="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                    >
                        <div class="bg-gray-800 py-3 px-3">
                            <div class="-mx-2 flex flex-wrap space-y-3">
                                <div class="px-2 w-full font-bold text-lg">
                                    There are {{ taskComputed.length }} task{{
                                        taskComputed.length > 1 ? "s" : ""
                                    }}
                                    here.
                                </div>
                                <div
                                    class="
                                        px-2
                                        w-full
                                        flex flex-wrap
                                        justify-end
                                        space-x-3
                                    "
                                >
                                    <RadioInput
                                        v-for="(radio, index) in filterRadio"
                                        :key="`filter-radio-${index}`"
                                        :text="radio.text"
                                        :input-id="radio.id"
                                        :input-name="radio.name"
                                        :input-value="radio.value"
                                        @update:radioChecked="getTaskFilter"
                                    />
                                    <Button
                                        text="Clear all tasks"
                                        button-class="bg-red-500 hover:bg-red-600 focus:bg-red-700 py-1"
                                    />
                                </div>
                            </div>
                        </div>
                        <TaskList
                            :task-list="taskComputed"
                            @update:checked="setChecked"
                            @deleteTask="deleteTask"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Textfield from "./components/Textfield.vue";
import RadioInput from "./components/RadioInput.vue";
import Button from "./components/Button.vue";
import TaskList from "./components/TaskList.vue";
import Localstorage from "./hooks/localstorage.js";

export default {
    components: {
        Textfield,
        RadioInput,
        Button,
        TaskList,
    },
    setup() {
        const newTask = ref("");
        const taskfieldError = ref(false);
        const taskTextFieldClass = ref("");
        const tasks = ref([
            {
                timestamp: getTimestamp(),
                name: "Sleep",
                isDone: true,
            },
        ]);
        const filterRadio = ref([
            {
                text: "All Task",
                id: "btn-task-all",
                name: "task-filter",
                value: "all",
            },
            {
                text: "On progress",
                id: "btn-task-progress",
                name: "task-filter",
                value: "progress",
            },
            {
                text: "Done",
                id: "btn-task-done",
                name: "task-filter",
                value: "done",
            },
        ]);
        const taskFilter = ref("");

        const taskComputed = computed(() => {
            switch (taskFilter.value) {
                case "all":
                case "":
                    return tasks.value;
                case "progress":
                    return tasks.value.filter(item => !item.isDone);
                case "done":
                    return tasks.value.filter(item => item.isDone);
            }
        });

        onMounted(() => {
            getDefaultTask();
        });

        function getDefaultTask() {
            const localTask = Localstorage().get("task") || [];
            tasks.value = localTask;
        }

        function setChecked({ value, timestamp }) {
            tasks.value = tasks.value.map(_task => {
                if (_task.timestamp === timestamp) {
                    _task.isDone = value;
                }
                return _task;
            });
        }

        function getTaskFilter(value) {
            taskFilter.value = value;
        }

        function getTimestamp() {
            return Math.floor(new Date().getTime() / 1000);
        }

        function addNewTask() {
            if (!newTask.value) {
                taskfieldError.value = true;
                return;
            }
            taskfieldError.value = false;
            tasks.value.push({
                timestamp: getTimestamp(),
                name: newTask.value,
                isDone: false,
            });
            Localstorage().set("task", tasks.value);
            newTask.value = "";
        }

        function deleteTask(timestamp) {
            tasks.value = tasks.value.filter(_task => {
                return _task.timestamp !== timestamp;
            });
        }

        return {
            newTask,
            tasks,
            taskComputed,
            addNewTask,
            setChecked,
            deleteTask,
            getTaskFilter,
            taskTextFieldClass,
            taskfieldError,
            filterRadio,
        };
    },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
