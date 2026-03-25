<script setup>

    

</script>
<template>
        <header class="header"> 
            <img src="../assets/logo.png" alt="logo" class="logo">
            <nav class="navigation-bar">
                <a href="#">home</a>
                <a href="#">lineup</a>
                <a href="#">pings</a>
                <a href="#">hey!</a>
                <a href="#">Activity</a>
                <a href="#">My Stuff</a>
                <a href="#">Find</a>
            </nav>
            <div class="userlogo">K</div>
        </header>
        <br>
        <main class="main">
            <div class="board">
                <div class="board-header">
                    <button class="create-message">create</button>
                    <div class="board-title">Message Board</div>
                    <span class = 'board-options'>
                        <div class="filter">filter</div>
                        <div class="options">...</div>
                    </span>
                </div>
                <div class="pinned">
                    <p>pinned to top</p>
                </div>
                <div class="messages">
                    messages
            </div>
            </div>
        </main>
</template> 
<style>
    body{
        background-color: #0b151b;
        color: white;
        box-sizing: border-box;

    }
    .header{
        display: flex;
        justify-content: space-between;
        background-color: rgb(11,21,27,0.7);
        position: fixed;
        width: 99%;
    }
    .main{
        display: flex;
        justify-content: center;
        margin:0px 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .board{
        background-color: #1b2930;
    	width: 100%;
        max-width: 860px;
        min-height: 750px;
        border-radius: 8px;
        padding:5px;
    }
    .board-header{
        display: flex;
        justify-content: space-between ;
        border-bottom: 1px solid #3e4d54;
    }
    .board-options{
        display: flex;
        gap:10px;
    }


    
</style>