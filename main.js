Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = "<img id='image_c' src='" + data_uri + "'>";

    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5C3YXA3f2/model.json',modelLoaded);

function modelLoaded() {

    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction_1;

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('image_c');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error) {
        console.error(error);

    } else {
        console.log(results);
        document.getElementById("emotion_namer").innerHTML = results[0].label;

        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_image").innerHTML = "&#9996;"

        }

        if(results[0].label == "Best")
        {
            document.getElementById("update_image").innerHTML = "&#128077;";

        }
        
    }
}