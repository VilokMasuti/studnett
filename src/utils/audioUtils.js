import lamejs from "lamejs";
export async function compressAudio(audioBlob){

  try {
  // Read blob as ArrayBuffer
  const arrayBuffer = await audioBlob.arrayBuffer();
   // Decode audio using Web Audio API

   const audioContext = new (window.AudioContext||window.webkitAudioContext)()
    const audioData = await audioContext.decodeAudioData(arrayBuffer);

     // Get Float32 samples from the first channel

     const samples = audioData.getChannelData(0);

      // Convert Float32 [−1.0, 1.0] samples to Int16
  const int16Samples = new Int16Array(samples.length);
   for (let i = 0; i < samples.length; i++) {
      int16Samples[i] = Math.max(-32768, Math.min(32767, samples[i] * 32767));
    }

    // Encode to MP3 (mono, original sample rate, 128kbps)

    const mp3Encoder = new lamejs.Mp3Encoder(1, audioData.sampleRate, 128);

    const mp3Data = mp3Encoder.encodeBuffer(int16Samples)
const mp3End = mp3Encoder.flush();
    const mp3Blob = new Blob([new Uint8Array([...mp3Data, ...mp3End])], { type: "audio/mp3" });

   return mp3Blob;

  } catch (error) {
    console.error('Error compressing audio:', error);
      // If any error, fallback to original (webm/wav) blob
 return audioBlob;
  }
}
