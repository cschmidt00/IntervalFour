# Vindinium Server
[Documentation](u.smtcs.rocks/vinddoc)  
####How to set up this Vindinium client
Goal: After following the steps below, you should have vindinium set up and ready to run inside of your IDE  (C9.io). You should be able to use the terminal (alt-t) to run your bot with the command: node test.js or node stable.js depending on which file you are running.

##To setup your IDE (C9.io is used here)
Click on + to create new workspace  
name your workspace  
Under “Clone from git or Mercurial URL” paste in https://github.com/MattHesby/vindinium-js-starter  
Under “Choose a template” click on Node.js  
Click “Create Workspace”  
Go to Terminal (alt-t)  
enter: npm install  
enter: npm install pathfinding  
enter: npm install colors  
enter: npm install cli-table  
go to vindinium.org and Create a New Bot  
copy the provided key  
In your IDE open the file test.js  
paste the provided key in the space provided on line 3  
####If provided a private server -  
go to the private server and Create a New Bot  
copy the provided key  
In your IDE open the file test.js  
paste the provided key in the space provided on line 4  
Change ‘PRIVATE_SERVER_HERE’ to the url provided for the private server  

##To run your Bot
Make sure you have either line 3 or line 4 commented out with //  
line 3 is set up to test your bot on vindinium.org  
line 4 is set up to play your bot on a private server (if provided)  
go to your terminal  
to run your stable version of your bot, enter: node stable.js  
to run your test version of your bot, enter: node test.js  

##To make changes to your bot
All students should have a stable bot that will run.  Make changes only to your test.js.  When your test.js bot is running well from the changes you have made, copy/paste from your test, to your stable.  That way you can always join in any competitions without having to try and debug first.
