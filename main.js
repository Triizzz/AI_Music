song = "";


rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song = loadSound("music1.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide(); 

poseNet = ml5.poseNet(video, modelLoaded);   
poseNet.on('pose', gotPoses);  

}

function modelLoaded(){
   console.log('poseNet Is Initilized');
}

function play(){
    song.play();
    
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist " + scoreRightWrist);


        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWrist= "+ leftWristX + "leftWristY = " + leftWristY);
        
       rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("rightWrist= "+ rightWristX + "rightWristY = " + rightWristY);
        
    }
}



let song1, song2;
let song1Playing = false;

function preload() {
  song1 = loadSound('song1.mp3');
  song2 = loadSound('song2.mp3');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function modelReady() {
  console.log('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  
  if (poses.length > 0) {
    let leftWrist = poses[0].pose.keypoints[9];
    let rightWrist = poses[0].pose.keypoints[10];
    
    if (leftWrist.score > 0.2) {
      let x = leftWrist.position.x;
      let y = leftWrist.position.y;
      
      // Set color and border color for the circle
      fill(255, 0, 0); // Red color
      stroke(0, 255, 0); // Green color
      
      // Draw a circle at the position of the left wrist
      circle(x, y, 50);
      
      if (!song1.isPlaying()) {
        // Stop song2 if it's playing
        song2.stop();
        
        // Play song1
        song1.play();
        song1Playing = true;
        
        // Update the heading tag with the name of song1
        let songHeading = document.getElementById('song');
        songHeading.innerHTML = 'Song 1';
      }
    } else if (rightWrist.score > 0.2) {
      // Stop song1 if it's playing
      if (song1Playing) {
        song1.stop();
        song1Playing = false;
        
        // Update the heading tag with the name of song2
        let songHeading = document.getElementById('song');
        songHeading.innerHTML = 'Song 2';
      }
      
      // Play song2
      song2.play();
    }
  }
}
