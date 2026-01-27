// Check if browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  const micToggle = document.getElementById('micToggle');
  let videoStream = null;
  let videoOverlay = null;

  function enableWebcamOverlay() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        videoStream = stream;
        videoOverlay = document.createElement('video');
        videoOverlay.className = 'webcam-overlay';
        videoOverlay.autoplay = true;
        videoOverlay.playsInline = true;
        videoOverlay.muted = true;
        videoOverlay.srcObject = stream;
        document.body.appendChild(videoOverlay);
      })
      .catch(function(err) {
        console.error('Error accessing webcam:', err);
        micToggle.checked = false;
      });
  }

  function disableWebcamOverlay() {
    if (videoOverlay) {
      videoOverlay.remove();
      videoOverlay = null;
    }
    if (videoStream) {
      videoStream.getTracks().forEach(function(track) {
        track.stop();
      });
      videoStream = null;
    }
  }

  micToggle.addEventListener('change', function() {
    if (micToggle.checked) {
      enableWebcamOverlay();
    } else {
      disableWebcamOverlay();
    }
  });

  window.addEventListener('beforeunload', disableWebcamOverlay);
} else {
  console.error('getUserMedia not supported on your browser!');
}
  