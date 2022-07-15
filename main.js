objects =[];
video = "";
status1="";
function setup() { 
    canvas = createCanvas(380, 380); 
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
 }

function start()
{
     objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image (video,0,0,380,380);
    if(status1 !="") {
        objectDetector.detect(video,gotResult);

    }
    for(i=0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status :  Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+objects.length;
        fill("black");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }

}
function modelLoaded()
{
    console.log("model Loaded");
    status1 =true;

}
function gotResult (error,results)
{
    if(error)
    {
        console.log(error);

    }
    console.log (results);
    objects = results;

}