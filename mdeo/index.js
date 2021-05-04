let mdata={
    audioFileName: "mydirr.mp3",
audioUploaded: false,
error: "",
imageFileName: "my",
imageUploaded: false,
index: 0,
link: "",
loader: false,
selctedContentType: "text",
selctedFilterType: "",
textBody: "demo5",
textData: "",
textHeader: "demo5",
title: "demo_5"
}

const myData = returnObj(mdata);

console.log("the dys",myData);


function returnObj(data){
    let myObj =[];
    for (const key in data) { 
    if(key==="textHeader"||key==="textBody"||key==="link"||key==="imageFileName"||key==="audioFileName"){
        console.log(`${key}: ${data[key]}`);
             if(data[key].length>0){
                 if(key==="link"){
                 myObj.push( {
            "content_type": "action", 
            "content": "LINK",
            "bundle": {
                        "url":data[key] 
                    }
          }
    )
                 } 
                 else if(key=="audioFileName"){
                         const videoFile = data[key].split('.').pop();
                    myObj.push( {
               "content_type": videoFile==="mp4"?"video":"audio",
               "content": data[key],
               "filter_id": 4,
               "bundle": {"url": "https://google.com"}
           });
    
                 }else{
                 myObj.push( {
               "content_type": key,
               "content": data[key],
               "filter_id": 4,
               "bundle": {"url": "https://google.com"}
           }
    )
                 }
                 
               
          } 
      }
    }
    return myObj;
    
    }
    
