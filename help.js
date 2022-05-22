
function helpFn(dirPath){
    console.log(`List of all commands:  

    1.node main.js tree "directoryPath"
    2.node main.js organize "directoryPath"
    3.node main.js help

    `);
    console.log("Help command implemented successfully for "+dirPath);
}




module.exports={
    helpKey: helpFn
}