var fs = require("fs");
var dicsord = require("eris");
var token = fs.readFileSync("./token.txt", "utf8");
var clint = new dicsord(token);

var validprefixies = ["!","#","-",".","~","/","!","_","=","[","]",">"];

var commnds = [
    {
        name:"help",
        prefix:["~","/","!","-","_"]
    },
    {
        name:"ping",
        prefix:["!","#","-","."]
    }
];

clint.on("ready", ()=>{
    console.log("im "+clint.user.username+",and im ready");
});

clint.on("messageCreate", (msg)=>{
    if (msg.author.bot) {
        return; // NO THANKS !!! //
    }

    var args = msg.content.split(" ");

    function respond(m) {
        msg.channel.createMessage({embed:{
            title:"command run by "+msg.author.username,
            description:m
        }});
    }

    var run = [];
    for (var cmd in commnds) {
        cmd = commnds[cmd];
        if (args[0].endsWith(cmd.name)) {
            var p = false;
            for (var pre in cmd.prefix) {
                if (args[0].includes(cmd.prefix[pre])) {
                    p = true;
                }
            }
            if (p) {
                run.push(cmd.name);
            } else {
                respond("Invalid prefix please use "+cmd.prefix.join(" or ")+" for "+cmd.name);
            }
        }
    }

    if (run.length == 0) {
        var bad = false;
        for (var prefixie in validprefixies) {
            var prefix = validprefixies[prefixie];
            if (msg.content.startsWith(prefix)) {
                bad = true;
            }
        }
        if (bad) {
            respond("invalid command try help for list of command")
        }
    }

    for (var c in run) {
        var cmd = run[c];

        if (cmd == "help") {
            var m = "here is commands:";

            for (var cm in commnds) {
                var cmm = commnds[cm];
                m = m+"\n"+cmm.name+"\nprefixies:"+cmm.prefix.join(" and ")+"\n";
            }

            respond(m);
        }

        if (cmd == "ping") {
            respond("PONG!!!");
        }
    }
})

clint.connect();
