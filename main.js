song = "";
song2 = "";
status = "";
status2 = "";

scoreleftWrist = 0;
scorerightWrist = 0;

LeftWristX = 0;
LeftWristY = 0;

RightWristX = 0;
RightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);

        scoreleftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreleftWrist is equal to " + scoreleftWrist);

        scorerightWrist = result[0].pose.keypoints[10].score;
        console.log("scorerightWrist is equal to " + scorerightWrist);

        LeftWristX = result[0].pose.leftWrist.x;
        LeftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftWristX, "leftWristY = " + LeftWristY);

        RightWristX = result[0].pose.rightWrist.x;
        RightWristY = result[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX, "RightWristY = " + RightWristY);
    }

}

function modelLoaded() {
    console.log("posenet is initiallized");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);

    status = song.isPlaying();

    status2 = song2.isPlaying();

    fill('red');
    stroke('blue');
    if (scorerightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);

        song2.stop();

        if (status == false) {
            song.play();
            document.getElementById("song").innerHTML = "playing harry potter song";

        }
    }

    if (scoreleftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);

        song.stop();

        if (status2 == false) {
            song2.play();
            document.getElementById("song").innerHTML = "playing peter pan song";

        }
    }

}

