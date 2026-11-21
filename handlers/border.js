// Compact Messenger formatter. Change WIDTH here to resize every command box.
const WIDTH=15;
const INNER=WIDTH-4;
function length(s){return Array.from(String(s)).length}
function splitLong(word){
 const chars=Array.from(word),parts=[];
 while(chars.length)parts.push(chars.splice(0,INNER).join(""));
 return parts;
}
function wrapLine(text){
 const out=[];let line="";
 for(const word of String(text).split(/\s+/)){
  if(length(word)>INNER){
   if(line){out.push(line);line=""}
   out.push(...splitLong(word));continue;
  }
  if(!line)line=word;
  else if(length(line)+1+length(word)<=INNER)line+=" "+word;
  else{out.push(line);line=word}
 }
 if(line)out.push(line);
 return out;
}
function border(title,body){
 let t=String(title||"").toUpperCase();
 if(length(t)>WIDTH-5)t=Array.from(t).slice(0,WIDTH-5).join("");
 const top="┌─ "+t+" "+"─".repeat(Math.max(0,WIDTH-5-length(t)))+"┐";
 const lines=[];
 for(const row of String(body??"").split("\n")){
  if(row===""){lines.push("");continue}
  lines.push(...wrapLine(row));
 }
 return [top,...lines.map(line=>"│ "+line.padEnd(INNER," ")+" │"),"└"+"─".repeat(WIDTH-2)+"┘"].join("\n");
}
module.exports=border;
