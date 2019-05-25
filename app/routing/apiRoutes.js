
// var path = require('path');

// will receive the list of the friends
var friends = require('../data/friends.js');

// Export API routes
module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Add a new friend entry
    app.post('/api/friends', function (req, res) {
        var totalDifference = 0;
        var friendMatch = {
            name: "",
            photo: "",
            differences: 10000
        };

        var userInput = req.body;
        var userResponses = userInput.scores;
        var userName = userInput.name;

        var friendScore = userResponses.map(function (item) {
            return parseInt(item, 10);
        });
        userInput = {
            name: req.body.name,
            photo: req.body.photo,
            scores: friendScore
        };
        var sum = friendScore.reduce((a, b) => a + b, 0);

        // will check the existing friends in the list
        for (var i = 0; i < friends.length; i++) {

            // differences 
            var totalDifference = 0;
            var newFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            totalDifference += Math.abs(sum - newFriendScore);

            if (totalDifference <= friendMatch.differences) {
                friendMatch.name = friends[i].name;
                friendMatch.photo = friends[i].photo;
                friendMatch.differences = totalDifference;
            }
        }

        // Add new freinds
        friends.push(userInput);
        res.json(friendMatch);

    });
};