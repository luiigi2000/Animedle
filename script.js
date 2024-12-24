const animes = ["onepiece", "attackontitan", "deathnote", "chainsawman", "demonslayer", "bocchitherock", "myheroacademia", "jujitsukaisen", "swordartonline", "neongenesisevangelion"];  //add what the user will guess to get the anime right, add new anime here
const inputElement = document.getElementById("guess");
let state = "photo";
let chosen = "";
let userInput = "";
let blurr = 40;
let count = "";
document.getElementById("ending").style.display = "none";
let img = "";
let score = 10;
document.getElementById("answer").style.display = "none";
let display = false;
document.getElementById("first").style.display = "none";
let run = false;

//add new songs here by id
const sounds = {
    58: "evangelion1",
    57: "evangelion2",
    56: "evangelion3",
    55: "evangelion4",
    54: "evangelion5",
    52: "jujitsu1",
    51: "jujitsu2",
    50: "jujitsu3",
    49: "jujitsu4",
    48: "jujitsu5",
    46: "bocchi1",
    45: "bocchi2",
    44: "bocchi3",
    43: "bocchi4",
    42: "bocchi5",
    40: "hero1",
    39: "hero2",
    38: "hero3",
    37: "hero4",
    36: "hero5",
    34: "sword1",
    33: "sword2",
    32: "sword3",
    31: "sword4",
    30: "sword5",
    28: "demon1",
    27: "demon2",
    26: "demon3",
    25: "demon4",
    24: "demon5",
    22: "chainsaw1",
    21: "chainsaw2",
    20: "chainsaw3",
    19: "chainsaw4",
    18: "chainsaw5",     
    16: "death1",
    15: "death2",
    14: "death3",
    13: "death4",
    12: "death5",
    10: "onepiece1",
    9: "onepiece2",
    8: "onepiece3",
    7: "onepiece4",
    6: "onepiece5",
    4: "aot1",
    3: "aot2",
    2: "aot3",
    1: "aot4",
    0: "aot5"
}

inputElement.addEventListener("keydown", function (event) {
    if(state!="stop"){
        if (event.key == "Enter") {
            userInput = inputElement.value.trim();
            document.getElementById("log").innerHTML = userInput;
            inputElement.value = '';
    
            if (state == "photo" && userInput) {
                photo();
            } else if (state == "intro" && userInput) {
                intro();
            }else if(state == "photo" && !userInput){
                document.getElementById("log").innerHTML = "Please insert a guess!";
            }else if(state == "between" || state == "ending"){
                
            }else{
                document.getElementById("log").innerHTML = "Please insert a guess!";
            }
        }
    }
});

function photo() {
    if (!chosen) {
        document.getElementById("log").innerHTML = "Guess the anime from the picture!";
        chosen = animes[Math.round(Math.random() * (animes.length - 1))];
        count = 4;
        img = document.getElementById("result");
        img_select();
        img.style.filter = `blur(${blurr}px)`;
        img.style.display = "block";
    }
    if(run==true){
        img = document.getElementById("result");
        if(userInput==chosen){
            state="between";
            img.style.filter = `blur(${0}px)`;
            sound.src = document.getElementById("victory").src;
            sound.play();
            document.getElementById("log").innerHTML = "Correct!";
            document.getElementById("answer").style.display = "block";
            document.getElementById("answer").innerHTML = chosen;
            setTimeout(wait,2500)
        }else if(userInput != chosen && blurr > 15){
            score--;
            sound.src = document.getElementById("wrong").src;
            sound.play();
            blurr -= 7;
            img.style.filter = `blur(${blurr}px)`;
        }else{
            document.getElementById("log").innerHTML = "The answer was "+chosen+"!";
            score=5;
            img.style.filter = `blur(${0}px)`;
            document.getElementById("answer").style.display = "block";
            document.getElementById("answer").innerHTML = chosen;
            state="display";
            setTimeout(wait,2000)
        }
    }
    run = true;
}

function intro() {
    if(!chosen){
        document.getElementById("log").innerHTML = score;
        if(score==4) score=5;
        else score++;

        document.getElementById("log").innerHTML = "Guess the anime from the intro!";
        chosen = animes[Math.round(Math.random() * (animes.length - 1))];
 
        if(chosen=="attackontitan") count=4;                                                     //change when adding new animes, starting count (highest value in the map)
        else if(chosen=="onepiece") count=10;
        else if(chosen=="deathnote") count=16;
        else if(chosen=="chainsawman") count=22;
        else if(chosen=="demonslayer") count=28;
        else if(chosen=="swordartonline") count = 34;
        else if(chosen=="myheroacademia") count = 40;
        else if(chosen=="bocchitherock") count = 46;
        else if(chosen=="jujitsukaisen") count = 52;
        else if(chosen=="neongenesisevangelion") count = 58;

        let sound = document.getElementById("sound");
        sound.style.display = "block";
        document.getElementById("answer").innerHTML = chosen;
    }
        
    if(sounds[count]) sound.src = document.getElementById(sounds[count]).src;

    if (userInput == chosen) {
        sound.style.display = "none";
        sound.src = document.getElementById("victory").src;                      
        userInput="";                                                              
        sound.play();
        img_select();
        img.style.display = "block";
        state="ending";
        document.getElementById("log").innerHTML = "Correct!";
        document.getElementById("answer").style.display = "block";
        setTimeout(wait,2500)

    } else if(count==5||count==-1||count==11||count==17||count==23||count==29||count==35||count==41||count==47||count==53){         //change when adding new animes, inbetween counts in the map
        state="ending";
        score--;
        img_select();
        img.style.display = "block";
        document.getElementById("log").innerHTML = "The answer was "+chosen+"!";
        sound.style.display = "none";
        document.getElementById("answer").style.display = "block";
        document.getElementById("answer").innerHTML = chosen;
        setTimeout(wait,2500)
    }else{
        score--;
        count--;
        sound.play();
    }
}

function wait(){
    if(state=="display"){
        sound.play();
        img.style.display = "none";
        chosen="";
        state="intro";
        document.getElementById("log").innerHTML = "Enter any value to move on!";
        display = false;
    }

    if(state!="ending" && !display){
        document.getElementById("answer").style.display = "none";
        state="intro";
        img.style.display = "none";
        chosen="";
        document.getElementById("log").innerHTML = "Enter any value to move on!";
    }
    if(state=="ending"){
        document.getElementById("answer").style.display = "none";
        img.style.display = "none";
        ending();
    }
}

function ending(){
    let face = ""
    if(score<=4){
        sound.src = document.getElementById("sad").src;
        sound.play()
        face = ":("
    }else if(score==5){
        sound.src = document.getElementById("weezer").src;
        sound.play()
    }else if(score == 6 || score == 7){
        sound.src = document.getElementById("win").src;
        sound.play()
        face = ":)"
    }else if(score == 9 || score ==8){
        sound.src = document.getElementById("win").src;
        sound.play()
        face = ":D"
    }else{
        sound.src = document.getElementById("win").src;
        sound.play()
        face = ":o"
    }
    document.getElementById("amnt").innerHTML = "Total Anime's in game to guess: "+animes.length+"!"
    document.getElementById("score").innerHTML = "You got a score of "+score+"/10!"+" "+face;
    document.getElementById("ending").style.display = "block";
    sound.style.display = "none";
    state="stop";
    inputElement.remove();
    document.getElementById("log").remove();
    document.getElementById("guess").style.display = "none"
}

function img_select(){        //change when adding new anime
    if (chosen == "onepiece") img.src = "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*pw9xsKqnq2dkGT4P";
    else if (chosen == "attackontitan") img.src = "https://www.giantfreakinrobot.com/wp-content/uploads/2023/09/attack-on-titan-4-900x506.jpg";
    else if (chosen=="deathnote") img.src = "https://img.rgstatic.com/content/show/234db6f9-8184-48db-8c95-c1213d9675c2/poster-342.webp";
    else if (chosen=="chainsawman") img.src = "https://m.media-amazon.com/images/I/81EyGIrto3L._SL1500_.jpg";
    else if (chosen=="demonslayer") img.src = "https://www.hindustantimes.com/ht-img/img/2023/06/14/550x309/demon_slayer_season_3_release_1681007034048_1686759381730.jpg";
    else if (chosen=="neongenesisevangelion") img.src = "https://resizing.flixster.com/HOvNpMi5Tt3puZzsPXa2FHBSw8M=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p451029_b_v8_aa.jpg";
    else if (chosen=="jujitsukaisen") img.src = "https://xonomax.com/cdn/shop/files/750341.jpg?v=1721570131&width=600";
    else if (chosen=="bocchitherock") img.src = "https://animetv-jp.net/wp-content/uploads/2024/06/GPUwbGzXMAAjRKz-e1717608182772-768x433.jpeg";
    else if (chosen=="myheroacademia") img.src = "https://assets1.ignimgs.com/2016/06/27/myheroacademia1600jpg-6d9905jpg-6aaf4f.jpg?width=3840";
    else if (chosen=="swordartonline") img.src = "https://upload.wikimedia.org/wikipedia/en/0/02/Sword_Art_Online_DVD_1_cover.jpg";
}

document.getElementById("reset").addEventListener("click", function(){
    location.reload();
});

document.getElementById("begin").addEventListener("click", function(){
    document.getElementById("start").style.display = "none";
    document.getElementById("first").style.display = "block";
    photo();
});


