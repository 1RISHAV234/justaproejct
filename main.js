
var status = "";
var object = [];
function setup() {
    canvas = createCanvas(400,320);
    video = createCapture(VIDEO);
    canvas.center();
    video.hide();
    classifier=ml5.objectDetector('cocossd',modelLoaded);
}
function modelLoaded() {
    console.log("mhm")
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    //console.log(results);
    object = results;
    objl = object.length;
    status = true;
}
function draw() {
    input = document.getElementById("text").value;
    console.log(input)
    
    image(video,0,0,400,320);
    classifier.detect(video,gotResults);
    if (status != "") {
        for (i=1;i<objl;i++) {
            document.getElementById("h44").innerHTML=objl+" objects found. Status: Detected"
            pecent = floor(object[i].confidence*100);
            fill("#7CF4A4");
            text(object[i].label+""+"percent = "+pecent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#620120")
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            console.log(object[i].label); 
            if (input == object[i].label) {
               console.log("i am working");
               document.getElementById("h444").innerHTML=input+" found!"+" percent = "+pecent;
            } else {
                console.log("no")
            }
        }
    }
}