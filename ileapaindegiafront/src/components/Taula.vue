<script setup>
    defineProps({
            zutabeak:{},
            lerroak:{},
        });
    const emit = defineEmits(['popukIreki']);
</script>
<template>
    <!-- Taula -->
    <table id="tabla" class="table table-hover table-striped">
        <thead>
            <tr>
                <th scope="col" v-for="izena in zutabeak">{{ izena }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="lerro in lerroak">
                <td v-for="datua in lerro">{{datua}}</td>
            </tr>
        </tbody>
    </table>
</template>