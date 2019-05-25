
var path = require('path');

// will receive the list of the friends
var friends = require('../data/friends.js');

// Export API routes
module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Add a new friend entry
    app.post('/api/friends', function (req, res) {
        var userInput = req.body;
        var userResponses = userInput.scores;
        var friendName = '';
        var friendImage = '';
        var totalDifference = 10000;

        // will check the existing friends in the list
        for (var i = 0; i < friends.length; i++) {

            // differences 
            var differences = 0;
            for (var j = 0; j < userResponses.length; j++) {
                differences += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            // If it is the lowest difference, it will match to a friend
            if (differences < totalDifference) {

                totalDifference = differences;
                friendName = friends[i].name;
                friendImage = friends[i].photo;
            }
        }

        // Add new freinds
        friends.push(userInput);

        // will send the response
        res.json({ status: 'OKAY', friendName: friendName, friendImage: friendImage });
    });
};