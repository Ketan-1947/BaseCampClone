<script setup lang="ts">

</script>

<template>
    <navBar />
    <main class="main">
        <div class="bg-board">
            <p class="sample">Sample</p>
            <p class="sample-board">Sample message board</p>
        </div>
        <div class="board">
            <slot></slot>
        </div>
    </main>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 20px;
    padding-top: 60px;
    box-sizing: border-box;
}

.bg-board {
    display: flex;
    /* justify-content:center; */
    width: 100%;
    max-width: 960px;
    height: 40px;
    background-color: rgb(22, 34, 41);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.sample {
    padding: 5px;
    background-color:#4e4b36;
    margin-top: 0px;
    margin-left: 15px;
    width: fit-content;
    height: fit-content;
    margin-bottom: auto;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.sample-board {
    padding-left: 300px;
    text-decoration: underline;
    font-size: 18px;
    font-weight: 500;
    color: #67b0f9;
    height: fit-content;
    margin-top: 3px;
}

.board {
    display: flex;
    flex-direction: column;
    background-color: #1b2930;
    width: 100%;
    max-width: 1060px;
    min-height: 750px;
    border-radius: 8px;
}

.board-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

}
</style>