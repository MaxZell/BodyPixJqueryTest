//start camera
function test(){
    $('.md-modal').addClass('md-show');
        webcam.start(false)
            .then(result =>{
               $('.flash').hide();
               cameraStarted();
               console.log("webcam started");
               contextPerson.clearRect(0,0,canvasPerson.width,canvasPerson.height);
               screenMode = window.innerWidth > window.innerHeight? 'l' : 'p';
               
               cameraFrame = startDetectBody();
            })
            .catch(err => {
                displayError();
            });
}

//stop camera
function stopVid(){
    webcam.stop();
    cancelAnimationFrame(cameraFrame);
    contextPerson.clearRect(0,0,canvasPerson.width,canvasPerson.height);
    console.log("webcam stopped");
}

function takePhoto(){
    beforeTakePhoto();
    var captureElement= document.getElementById('selfie-container');
    var appendElement= document.getElementById('webcam-container');
    html2canvas(captureElement).then(function(canvas) {
        canvas.id='captureCanvas';
        canvas.style.position = "absolute";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvasPerson.globalCompositeOperation='source-in';
        appendElement.appendChild(canvas);
        // downloadBase64File(canvas.toDataURL('image/png'), "test");
        webcam.stop();
        cancelAnimationFrame(cameraFrame);
        afterTakePhoto();
    });
}

function downloadBase64File(contentBase64, fileName){
    const linkSource = `${contentBase64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click(); 
}