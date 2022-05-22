let inputArr=process.argv.slice(2);

let helpObj=require("./help");
let treeObj=require("./tree.js");
let organizeObj=require("./organize")


//1st 2 input words are node fileName.js then content follows which is stored in inputArr

//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

//command will be starting word of inputArr

let command=inputArr[0];
switch(command){
    case "tree":treeObj.treeKey(inputArr[1]);
                 break;
    
    case "organize":organizeObj.organizeKey(inputArr[1]);
                    break;

    case "help":helpObj.helpKey(inputArr[1]);
                   break;
                   
    default:console.log("Please input right command");      
}
