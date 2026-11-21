const eco=require("./economy");
function border(title,body){return "╭━━━━━━━━━━ "+title+" ━━━━━━━━━━╮\n"+body+"\n╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯"}
module.exports={border,levels:{easy:2,normal:3,hard:5,"very hard":10,extreme:50,impossible:100},rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min},eco};