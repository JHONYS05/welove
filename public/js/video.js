var vidElement=null;
    function golive(){
        var camAvailable=navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
        if(camAvailable){
            vidElement=document.getElementById("vid");
            navigator.mediaDevices.getUserMedia({video: true, audio:true,}).then(function(stream){
             vidElement.srcObject=stream;
             vidElement.play();
            });
        }
    }
    function stop() {
        vidElement.pause();
    }
    var vid = document.getElementById("vid");
function enableAutoplay() { 
vid.autoplay = true;
audio = true
vid.load();
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  alert(inputValue);
});


// Videojs Player Code//
//var player = videojs('my-player');
//var options = {};

//var player = videojs('my-player', options, function onPlayerReady() {
  //videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  //this.play();

  // How about an event listener?
  //this.on('ended', function() {
    //videojs.log('Awww...over so soon?!');
  //});
//});

/// NUEVO AUDIO
async function main() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    let base_timestamp = null;        
    const track = stream.getTracks()[0];
    const settings = track.getSettings();

    const processor = new MediaStreamTrackProcessor(track);
    const reader = processor.readable.getReader();

    const generator = new MediaStreamTrackGenerator("audio");
    const writer = generator.writable.getWriter();

    const audio_player = document.getElementById("audio");
    audio_player.srcObject = new MediaStream([generator]);
    audio_player.play();
    

    const decoder = new AudioDecoder({
      error(e) {
        console.log(e);
      },
      async output(frame) {
        //console.log("output timestamp: " + (frame.timestamp / 1000000) + " s. duration: " + frame.buffer.duration + " s.");
        await writer.write(frame);
        frame.close();
      },
    });

    const encoder = new AudioEncoder({
      error(e) {
        console.log(e);
      },
      output(chunk, md) {
        let config = md.decoderConfig;
        //console.log("chunk timestamp: " + (chunk.timestamp / 1000000) + " s.");
        if (config)
          decoder.configure(config);
        decoder.decode(chunk);
      },
    });

    const config = {
      numberOfChannels: settings.channelCount,
      sampleRate: settings.sampleRate,
      codec: "opus",
      bitrate: 128000
    };
    
    encoder.configure(config);

    async function read () {
      const result = await reader.read();
      let frame = result.value;
      if (base_timestamp === null)
        base_timestamp = frame.timestamp;
      let rebased_frame = new AudioFrame({timestamp: (frame.timestamp - base_timestamp), buffer: frame.buffer });
      frame = rebased_frame;
      //console.log("input timestamp: " + (frame.timestamp / 1000000) + " s. duration: " + frame.buffer.duration + " s.");
      encoder.encode(frame);

      setTimeout(read, 0);
    };
              
    read();
  }   
  main();
    