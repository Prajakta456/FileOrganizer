let path=require("path");
let fs = require("fs");


function treeFn(dirPath){
    let destPath;

    //process.cwd() gives the path of the current working directory
    if(dirPath==undefined)
        treeHelper(process.cwd(),"");
    
      else{
          let doesExist=fs.existsSync(dirPath);

          if(doesExist){
             
            treeHelper(dirPath,"");
            //we are passing empty string for indent
          }
           //if the path does not exist
          else{
            console.log("Kindly enter the correct path");
            return;
          }
      }
    //console.log("Tree command implemented successfully for "+dirPath);
}


function treeHelper(dirPath,indent){
    //is file or folder
    let isFile=fs.lstatSync(dirPath).isFile();

    //if it is just a file print that name of file
     if(isFile==true){
         let fileName=path.basename(dirPath);
         console.log(indent+'├─'+fileName);
     }

     //case for folder
     else{

        let dirName=path.basename(dirPath);
         console.log(indent+'└─ '+dirName);

         let childrens=fs.readdirSync(dirPath);

         for(let i=0;i<childrens.length;i++){
             let temp=path.join(dirPath,childrens[i])
             treeHelper(temp, indent+"\t");
         }

     }
}
//tree function is the function used in main.js so it is exported
module.exports={
    treeKey:treeFn
}