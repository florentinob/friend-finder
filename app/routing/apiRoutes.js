var matchData = require("../data/friends");

totalDifference = function(user, friend) {
    var totalDiff = 0;

    var userScores = user.scores.map(function (x) {
        return parseInt(x, 10);
    });
    console.log("userScores: ", userScores.join(" "));

    var friendScores = friend.scores.map(function (x) {
        return parseInt(x, 10);
    });
    console.log( "friendScores: ", friendScores.join(" "));

    for (var i = 0; i < userScores.length; i++) {
        totalDiff += Math.abs(userScores[i] - friendScores[i]);
    }
    console.log("totalDiff: ", totalDiff);

    return {
        name: friend.name,
        photo: friend.photo,
        totalDiff: totalDiff
    };
}

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(matchData);
    });

    app.post("/api/friends", function (req, res) {
        var currentUser = req.body;
        console.log("currentUser: ", currentUser);

        var friendArray = [];
        for (var i = 0; i < matchData.length; i++) {
            friendArray.push(totalDifference(currentUser, matchData[i]));
        }

        friendArray.sort(function (a, b) {
            var totalDiff1 = a.totalDiff;
            var totalDiff2 = b.totalDiff;

            if (totalDiff1 < totalDiff2) {
                return 1;
            }
            return 0;
        });

        for (var i = 0; i < friendArray.length; i++) {
            console.log(friendArray[i].name, friendArray[i].photo, friendArray[i].totalDiff);    
        }
        
        matchData.push(currentUser);

        console.log("Best Match: ", friendArray[0].name, friendArray[0].photo, friendArray[0].totalDiff);
        res.json(friendArray[0]);
    });
}