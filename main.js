img ="";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    
}

function preload()
{
    
}

function draw()
{
    image(video, 0, 0, 400, 400);
    if(status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);
        objectDetector.detect(video, gotresult);
        for (i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Dectected objects";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;


            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke(r, b, g);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == object_name)
            {
                objectDetector.detect(gotresult);
                video.stop();
                document.getElementById("status").innerHTML = object_name + " found";
            }
            else
            {
                document.getElementById("status").innerHTML = "Object Not Found";
            }

        }
    }



}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("modelLoaded!");
    status = true;
    objectDetector.detect(video, gotresult);
}

function gotresult(error, results)
{
    if (error)
    {
        console.log(error);
    }
     
    console.log(results);
    objects = results;
}
