// Compact Messenger message formatter. Edit WIDTH to change box size.
const WIDTH=26;
const INNER=WIDTH-4;
function len(s){return Array.from(String(s)).length}
function wrapLine(text){
 const words=String(text).split(/\s+/);const out=[];let line="";
 for(const word of words){
  if(!line){line=word;continue}
  if(len(line)+1+len(word)<=INNER)line+=" "+word;
  else{out.push(line);line=word}
 }
 if(line)out.push(line);
 for(let i=0;i<out.length;i++)if(len(out[i])>INNER){
  const chars=Array.from(out[i]);out.splice(i,1,chars.slice(0,INNER).join(""),chars.slice(INNER).join(""));i--;
 }
 return out;
}
function border(title,body){
 const titleText=String(title||"").toUpperCase();
 const top="┌─ "+titleText+" "+"─".repeat(Math.max(0,WIDTH-4-len(titleText)))+"┐";
 const lines=[];
 for(const raw of String(body??"").split("\n")){
  if(raw===""){lines.push("");continue}
  lines.push(...wrapLine(raw));
 }
 return [top,...lines.map(line=>"│ "+line.padEnd(INNER," ")+" │"),"└"+"─".repeat(WIDTH-2)+"┘"].join("\n");
}
module.exports=border;