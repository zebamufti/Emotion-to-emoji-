prediction1=""
prediction2=""
Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_uri){
        console.log(data_uri)
        document.getElementById("result").innerHTML="<img id='captured_img'  src=' "+data_uri +"'>";
    })
}
console.log("ml5 version",ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yjnjwmB99/model.json', model_loaded)
function model_loaded(){
    console.log("model has been loaded")
}
function speak_data(){
    var synth= window.speechSynthesis;
    speak_data1="the first prediction is "+ prediction1
    speak_data2="the second prediction is "+ prediction2
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}
function check(){
img=document.getElementById("captured_img")
console.log(img)
classifier.classify(img,gotresult)
}
function gotresult(error,result){
if(error){
    console.error(error)
}
else{
console.log(result) 
document.getElementById("result_emotion_name").innerHTML=result[0].label
document.getElementById("result_emotion_name2").innerHTML=result[1].label
prediction1=result[0].label
prediction2=result[1].label
speak_data()
if(result[0].label=="happy"){
    document.getElementById("update_emoji").innerHTML="&#128512;"
}
if(result[0].label=="angry"){
    document.getElementById("update_emoji").innerHTML="&#128545;"
}
if(result[0].label=="sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;"
}
if(result[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML="&#128512;"
}
if(result[1].label=="angry"){
    document.getElementById("update_emoji2").innerHTML="&#128545;"
}
if(result[1].label=="sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;"
}
}
}
