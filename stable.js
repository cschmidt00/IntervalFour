var Bot = require('bot');
var PF = require('pathfinding');
//var bot = new Bot('jlsdoar1', 'training', 'http://vindinium.org'); //Put your bot's code here and change training to Arena when you want to fight others.
var bot = new Bot('4m7ch2h0', 'arena', 'http://52.53.211.7:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////

        /*                                      *
         * This Code is global data!            *
         *                                      */

        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir;
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];

        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);


        /*                                      *
         * This Code Decides WHAT to do         *
         *                                      */
        var task;
        var closestEnemy = enemyBots[0];
        var enemyIndex;
        var enemyMineIndex;
        task = "freemines";
        // This funcion finds which enemy is the closest
        function checkClosestEnemy()
        {
            for(enemyIndex=0; enemyBots.length > enemyIndex; enemyIndex++)
            {
                if (bot.findDistance(myPos, enemyBots[enemyIndex].posArray) < bot.findDistance(myPos, closestEnemy.posArray))
                {
                    closestEnemy = enemyBots[enemyIndex];
                    var closestEnemyPos = bot["bot"+enemyIndex].posArray;
                    return closestEnemyPos;
                    
                }
            }
            
        }
        // This function checks to find which bot has the most amount of mines
        function checkMostMines()
        {
            var mostMines = enemyBots[0];
            for(i=0; enemyBots.length > i; i++)
            {
                if ( mostMines.mineCount < enemyBots[i].mineCount)
                {
                    mostMines = enemyBots[i];
                    
                }
            }
            return mostMines.id;
            console.log("This bot has most mines: " + mostMines.length)
        }
        // This function takes the closest mine of the current leader(leader as in who has the most mines)
        function takeNearestMine()
            {
                for(i = 0; bot["bot" + checkMostMines()].mines.length > i; i++)
                {
                    var closestMine = bot["bot" + checkMostMines()].mines[0];
                    if(bot.findDistance(myPos, bot["bot" + checkMostMines()].mines[i]) < bot.findDistance(myPos, closestMine))
                    {
                        closestMine = bot["bot" + checkMostMines()].mines[i];
                        
                    }
                }
                console.log("this is Closestmine: " + closestMine);
                return closestMine;
            }
// This if statement is setting the task to tavern if my bots health goes below 50
        if(bot.yourBot.life < 50){
            task = "tavern";
        }
//this if statement is finding the distance between my bot and the closestenemy and checking to see if the distance is below 3 and if I have more health than them and if it is it sets the task to attack
        if(bot.findDistance(myPos, checkClosestEnemy())<=3 && bot.yourBot.life > bot["bot"+enemyIndex].life)
        {
            task = "attack";
        }
//This if statement is checking to see if my minecount is more than the player with the most mines and sets the task to steal if it is true
        console.log("most mines: " + checkMostMines());
        if(bot.yourBot.mineCount < bot["bot" + checkMostMines()].mineCount)
            {
                task = "steal";
            }

        /*                                      *
         * This Code Determines HOW to do it    *
         *                                      */

        // This Code find the nearest freemine and sets myDir toward that direction //
        if(task === "freemines") 
        {
            var closestMine = bot.freeMines[0];
            for(i = 0; i < bot.freeMines.length; i++)
            {
                if(bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) 
                {
                    closestMine = bot.freeMines[i];
                }
            }
            console.log("Claiming a Free Mine!");
            myDir = bot.findPath(myPos, closestMine);
        }
        //this code find the closest tavern and goes to it
        else if(task === "tavern")
        {
            var closestTavern = bot.taverns[0];
            for(i = 0; i <bot.taverns.length; i++) 
            {
                if(bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i]))
                {
                    closestTavern = bot.taverns[i];
                }
            }
            console.log("Getting A Tavern");
            myDir = bot.findPath(myPos, closestTavern);
        }
        //This code goes to the enemy that is within 3 blocks of me and has less health than me which attacks them
        else if (task === "attack"){
            console.log("Attacking");
            myDir = bot.findPath(myPos, checkClosestEnemy());
        }
        //This code makes my bot go to the closest mine that is claimed by the current leader
        else if (task === "steal")
        {
            console.log ("Stealing mine from leader");
            myDir = bot.findPath(myPos, takeNearestMine());
        }
        else {
            myDir = "none";
        }
        /*                                                                                                                              *
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */
        if(myDir === "none") {
           /* console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            bot.goDir = dirs[rand];
            */
            task = "tavern"; //this makes my bot collect taverns if my bot has nowhere to go instead of walking around randomally
        } else {
            bot.goDir = myDir;
        }
        
        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
};
bot.runGame();
