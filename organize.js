let path=require("path");
let fs = require("fs");

let types={
    media:["mp4","mkv"],
    pics:["jpeg","jpg","png"],
    archives:["zip","7z",'rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','odt','ods','odp','odg','odf','txt','ps','tex','pptx'],
    app:['exe','dmg','pkg','deb','ini'],
    codes:['py','java','cpp','pl','js']
}

function organizeFn(dirPath){
    
    console.log("Organize command implemented successfully for "+dirPath);
   
    //1.input=> directory path given
    let destPath;

    if(dirPath==undefined)
        console.log("Please enter the correct directory path");
    
      else{
          let doesExist=fs.existsSync(dirPath);

          if(doesExist){
              destPath=path.join(dirPath,"organized_files");
              if(fs.existsSync(destPath)==false){
                  fs.mkdirSync(destPath);
              }
          }

          else{
            console.log("Please enter the correct path,path entered does not exist");
            return;
          }
      }
      organizeHelper(dirPath,destPath);

    //2.create a directory named as organized_files
    //3.identify all categories of files present in that input directory
    //4.copy/cut files to that organized directory inside any category folder

}
function organizeHelper(src,dest){

    let childNames=fs.readdirSync(src);
    //console.log(childNames);

for(let i=0;i<childNames.length;i++){
    let childAddress=path.join(src,childNames[i]);

    //check if child is a file or folder

    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
        console.log(childNames[i]);
        let category=getcategory(childNames[i]);
        console.log(childNames[i]," belongs to =>",category);
        sendFiles(childAddress,dest,category);
    }
}
}//close function organizeHelper


function sendFiles(srcfile,dest,category){

    let categoryPath=path.join(dest,category);

    if(fs.existsSync(categoryPath)==false){
         fs.mkdirSync(categoryPath);
    }

    //in copying a file:::first create a new file and then copy the contents of the earlier copied file
    let fileName=path.basename(srcfile);
     let destFilePath=path.join(categoryPath,fileName);
     //for copying content
     fs.copyFileSync(srcfile,destFilePath);
     console.log(fileName," copied to=>",category);

     //only this command differentiates cut from copy command
     fs.unlinkSync(srcfile);
}

function getcategory(name){

    let ext=path.extname(name);
    ext=ext.slice(1);
    console.log(ext);
  
    for(let type in types){
    
      let cTypeArr=types[type];
  
       for(let i=0;i<cTypeArr.length;i++){
           if(ext==cTypeArr[i]){
               return type;
           }
       }
   
    }
    return "others";
  }//close function getcategory()

  //organizeFn is the function used in main so it is exported
  module.exports={
      organizeKey: organizeFn
  }
  
  //The fs.readdirSync() method is used to synchronously read the contents of a given directory. 
  //The method returns an array with all the file names or objects in the directory. 
  //The options argument can be used to change the format in which the files are returned from the method.
  
  //Syntax:
  //fs.readdirSync( path, options )

  