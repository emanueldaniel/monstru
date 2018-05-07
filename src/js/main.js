import Vue from 'vue';

const $ = require('jquery');

global.$ = global.jQuery = $;

require("../scss/main.css");
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

window.daniel = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        attack: function () {
            var damage = this.damage(3, 10)
            this.monsterHealth -= damage;
            this.turns.push({
                text: "PLAYER ATTACK MONSTER WITH: " + damage,
                is_player: true
            });

            if (!this.checkWin()) {
                damage = this.damage(5, 12)
                this.playerHealth -= damage;
                if (!this.checkWin()) {
                    this.turns.push({
                        text: "MONSTER ATTACK PLAYER WITH: " + damage,
                        is_player: false
                    });
                }
            }
        },
        specialAttack: function () {
            var damage = this.damage(10, 20)
            
            this.monsterHealth -= damage
            this.turns.push({
                text: "player attack monster with:" + damage ,
                is_player:true
            });
            if (!this.checkWin()) {
                damage = this.damage(5, 12)
                this.playerHealth -= damage;
               if ( !this.checkWin()){
                     this.turns.push({
                         text: "monster attack player with :" + damage,
                         is_player:false
                     });
               }
            }
        },
        heal: function () {
            if (this.playerHealth < 90) {
                this.playerHealth += 10;

                this.playerHealth -= this.damage(5, 12);
                this.checkWin();
            }
        },
        damage: function (min, max) {
            return Math.max(Math.floor(Math.random() * (max - min + 1))) + min;
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm("Yon won! Do you want to restart?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if (confirm("Yon lost! Do you want to restart?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});


// curs 18
var widget1=new Vue({
    el:"#apps",
    data: {
        title: "titlu",
        findName:'',
        students:[
            'Daniel',
            'Beniamin',
            'Paul',
            'flavius',
            'Vladut'
        ]
    },
    computed: {
        search: function () {
            var inputText = new RegExp(this.findName, "i");
            // var inputText = this.findName.toLocaleLowerCase();
            return this.students.filter(el => el.match(inputText));
        }
    },
    watch: {
        findName: function(value){
            console.log("Changed: "  + value);
        }
    }
})

var widget2 =new Vue({
    el: "#apps2",
    data: {
        title: "Search in List ",
    },
     
    methods : {
        changeTitle : function(){
            this.title = " search in list 2 ";
            widget1.title=this.title;
        },
        destroy: function(){
            this.$this.destroy();
        }
    },

    beforeCreate :function() {
         console.log("beforeCreate");
    },
    created :function(){
        console.log("Created");
    },
    beforeMount : function(){
        console.log("beforeMount");
    },
    mounted  :function(){
        console.log("mounted");
    },

    beforeUpdate :function(){
        console.log("beforeUpdate");
    },

     updated : function(){
         console.log("update");
     },
     beforeDestroy:function(){
         console.log("beforeDestroy");
     },
       destroyed:function(){
           console.log("destroyed");
       }
})

widget1.title  = " SEARCH "

widget1.$mount(document.getElementById("apps2"));

console.log(widget1);
console.log(widget2);
