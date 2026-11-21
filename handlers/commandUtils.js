const eco=require("./economy");

// Compact border formatting used by commands.
const WIDTH=26;
const CONTENT_WIDTH=WIDTH-4;
const OUTER={topLeft:"┌",topRight:"┐",bottomLeft:"└",bottomRight:"┘",horizontal:"─"};
const INNER={left:"│",right:"│",padding:" "};

function length(text){return Array.from(String(text)).length}
function wrapLine(text){
 const output=[];let line="";
 for(const word of String(text).split(/\\s+/)){
  if(length(word)>CONTENT_WIDTH){
   if(line){output.push(line);line=""}
   let chars=Array.from(word);
   while(chars.length)output.push(chars.splice(0,CONTENT_WIDTH).join(""));
   continue;
  }
  if(!line)line=word;
  else if(length(line)+1+length(word)<=CONTENT_WIDTH)line+=" "+word;
  else{output.push(line);line=word}
 }
 if(line)output.push(line);
 return output;
}
function border(title,body){
 const titleText=" "+String(title||"").toUpperCase()+" ";
 const topFill=Math.max(0,WIDTH-2-length(titleText));
 const top=OUTER.topLeft+titleText+OUTER.horizontal.repeat(topFill)+OUTER.topRight;
 const lines=[];
 for(const raw of String(body??"").split("\\n")){
  if(raw==="")lines.push("");
  else lines.push(...wrapLine(raw));
 }
 const content=lines.map(line=>INNER.left+INNER.padding+line.padEnd(CONTENT_WIDTH," ")+INNER.padding+INNER.right);
 const bottom=OUTER.bottomLeft+OUTER.horizontal.repeat(WIDTH-2)+OUTER.bottomRight;
 return [top,...content,bottom].join("\\n");
}
module.exports={border,WIDTH,levels:{easy:2,normal:3,hard:5,"very hard":10,extreme:50,impossible:100},rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min},eco};