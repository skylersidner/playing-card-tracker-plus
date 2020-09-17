# playing-card-tracker
Tracks which cards have been played in a game so far

##Improvements:
* ~~Allow the Ace to be either “high” or “low” (right side or left side of the rows) with a toggle~~
* ~~Add confirmation popup for reset~~
* Add Jquery local script file and remove cdn link
* Add a color-picker and a way to select each suit
* Add different sizing/scaling with radio buttons
* Add tabs for “Tracking” and “Settings” and move options to settings tab
* Add a way to persist state of the cards selected in local storage (not session storage)
* Add Bootstrap and a theme
* Add a web server

Once there's an API server
* Add a way to persist selection state in a DB 
* Add a way to persist settings state in DB
* Add logging
* Add/refactor error handling
* Add authentication (just login/username) to DB and bind their current selections to that user ID
* Add persisting more than one selection to DB (and CRUD management)
