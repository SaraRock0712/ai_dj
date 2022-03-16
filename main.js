sound = "";

scoreRightwrist = 0;
scoreLeftwrist = 0;
left_wrist_x = 0;
right_wrist_y = 0;
left_wrist_y = 0;
right_wrist_x = 0;

function preload(){
    sound = loadSound("winterbear.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(350,350);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("POSENET MODEL INITIALIZED");
}

function draw(){
    image(video, 0 , 0 , 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftwrist > 0.2){

    circle(left_wrist_x, left_wrist_y, 20);
    inNumberleft_wrist_y = Number(left_wrist_y);
    removedecimals = floor(inNumberleft_wrist_y);
    volume = removedecimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    sound.setVolume(volume);}
    if(scoreRightwrist > 0.2)
    {
        circle(right_wrist_x, right_wrist_y, 20);
        if(right_wrist_y > 0 && right_wrist_y <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            sound.rate(0.5);
        }

        else if(right_wrist_y > 100 && right_wrist_y <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            sound.rate(1);
        }

        else if(right_wrist_y > 200 && right_wrist_y <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            sound.rate(1.5);
        }

        else if(right_wrist_y > 300 && right_wrist_y <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x";
            sound.rate(2);
        }

        else if(right_wrist_y > 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            sound.rate(2.5);  
        }
    }
}

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1.5);
}
function pause(){
    sound.pause();
}

function stop(){
    sound.stop();
}

function gotPoses(results){
    if(results.length > 0 )
    {
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreLeftwrist = results[0].pose.keypoints[10].score;
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x =" +left_wrist_x+ "left wrist y =" + left_wrist_y) ;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x =" +right_wrist_x+ "right wrist y =" + right_wrist_y);
    }
}