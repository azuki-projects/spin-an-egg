const eco=require("./economy");

const WIDTH=34;
function visibleLength(s){return Array.from(String(s)).length}
function pad(s,n){s=String(s);return s+" ".repeat(Math.max(0,n-visibleLength(s))}
function wrap(text,width){
 const lines=[];
 for(const raw of String(text??"").split("\n")){
  if(!raw){lines.push("");continue}
  let line="";
  for(const word of raw.split(/\s+/)){
   if(!line){line=word;continue}
   if(visibleLength(line)+1+visibleLength(word)<=width)line+=" "+word;
   else{lines.push(line);line=word}
  }
  while(visibleLength(line)>width){
   const chars=Array.from(line);lines.push(chars.slice(0,width).join(""));line=chars.slice(width).join("");
  }
  lines.push(line);
 }
 return lines;
}
function border(title,body){
 const width=WIDTH,inner=width-2;
 let titleText=" "+String(title||"").toUpperCase()+" ";
 if(visibleLength(titleText)>width-2)titleText=Array.from(titleText).slice(0,width-2).join("");
 const top="┌"+titleText+"─".repeat(Math.max(0,width-2-visibleLength(titleText)))+"┐";
 const content=wrap(body,inner);
 return [top,...content.map(line=>"│"+pad(line,inner)+"│"),"└"+"─".repeat(width-2)+"┘"].join("\n");
}
module.exports={border,WIDTH,levels:{easy:2,normal:3,hard:5,"very hard":10,extreme:50,impossible:100},rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min},eco};