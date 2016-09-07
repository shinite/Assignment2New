var fs=require('fs');
var r=require('readline');

var rd=r.createInterface(
  {
  input: fs.createReadStream("csv/crimes2001onwards.csv"),
});

var heading=[];
var count=0;
var obj={},obj2={};
var l=[]


//var json={"OVER $500":[],"$500 AND UNDER":[]}


rd.on('line', function(line)
{
  var value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if (count == 0)
  {
    heading =value;
    count=count+1;
  }
  else
  {
          if(value[5] =="THEFT" && value [6]=="OVER $500" && !obj[value[17]])
          {
            obj[value[17]]=1;
          }
          else if(value[5] =="THEFT" && value [6]=="OVER $500")
          {
            obj[value[17]]=obj[value[17]]+1;
          }
          else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER" &&!obj2[value[17]])
          {
              obj2[value[17]]=1;
          }
          else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER")
          {
            obj2[value[17]] =obj2[value[17]]+1;

          }

  }
//    console.log(json);


});

rd.on('close',function()
{
  for (var k in obj)
  {

    var json={"OVER $500":[],"$500 AND UNDER":[],"date":[],}
    json["OVER $500"]=obj[k];
    json["$500 AND UNDER"]=obj2[k];
    json["date"]=k;
    l.push(json);
}
console.log(l);
fs.writeFileSync('csv/MYNEWJSON.json',JSON.stringify(l),'utf8',function(err){console.log(err);});
  //fs.writeFileSync('csv/Under500.json',JSON.stringify(obj2),'utf8',function(err){console.log(err);});
  //console.log(obj);
  console.log("done");
});
