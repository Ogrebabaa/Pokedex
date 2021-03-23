<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokedex</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/f922a2e803.js" crossorigin="anonymous"></script>
</head>
<body>
    <div class="pokedex-bkg flex-content-center">
        <div class="pokedex-container">
            <div class="screen_border flex-content-center"> 
                <div class="dot-container">
                    <span class="little-red-dot"></span>
                    <span class="little-red-dot"></span>
                </div>
                <div class="screen_display"> 
                    <img class="img_pokemon" id="img_pokemon" src="" alt="first_pokemon">
                    <div class="info_pokemon">
                        <p id="name_pokemon"></p>
                        <!-- <div class="list_type">
                            <img src="images/types/Fire.png" alt="fire">
                        </div> -->
                    </div>
                    
                </div>
                <button class="medium-red-dot" onclick="goShiny();"></button>
                <div class="burger-container">
                    <span class="burger-element"></span>
                    <span class="burger-element"></span>
                    <span class="burger-element"></span>
                    <span class="burger-element"></span>
                </div>
            </div>
            <div class="bottom_section">

                <form class="search" id="search" action="" method="post">
                    <input type="text" name="in_pokemon" id="in_pokemon" placeholder="Mew">
                    <input type="submit" id="submit_pokemon" value="Go!" onclick="search();">
                </form>

                <div class="btn-container">
                    <button class="control-button" onclick="prevPokemon();"><i class="fas fa-angle-left"></i></button>
                    <button class="control-button" onclick="nextPokemon();"><i class="fas fa-angle-right" ></i></button>
                </div>
                
            </div>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>