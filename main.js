function setup() {
    canvas = createCanvas(300 , 300)
    canvas.center()
    background("#147F5F")
    canvas.mouseReleased(classify_canvas)
    synth = window.speechSynthesis
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function draw() {
    strokeWeight(13);
    stroke("white")
    if(mouseIsPressed) {
        line(pmouseX , pmouseY, mouseX, mouseY)
    }
}

function clear_c() {
    background("#147F5F")
    document.getElementById("label").innerHTML = ""
    document.getElementById("confidence").innerHTML = ""
}

function classify_canvas() {
    classifier.classify(canvas , gotResults)
}

function gotResults(error , results) {
    if(error) {
        console.error(error)
    }else{
        console.log(results)
        document.getElementById("label").innerHTML = results[0].label
        document.getElementById("confidence").innerHTML = Math.round(results[0].confidence *100) + "%"
        utter_this = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utter_this)
    }
}