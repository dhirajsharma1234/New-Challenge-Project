import ffmpeg from 'fluent-ffmpeg';
import { status } from '../config/status.js';
import { message } from '../config/message.js';

// Function to convert video to M3U8 format
function convertToM3U8(inputBuffer, outputPath) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg()
      .input(inputBuffer)
      .inputFormat('mp4')
      .outputOptions('-hls_time 10')
      .output(outputPath)
      .on('end', () => {
        console.log('Conversion finished.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        reject(err);
      });

    console.log('Starting conversion...');
    command.run();
  });
}

class VideoConvert {
  convertVideo = async (req, res) => {
    try {
      if(!req.file) return res.status(400).json({ status:status.BAD_REQUEST,message:message.FILE_NOT_UPLOADED })

      // Convert the uploaded video to M3U8 format
      const inputBuffer = req.file.buffer;
      const givenPath = './demoVideo/demo.m3u8';

      await convertToM3U8(inputBuffer, givenPath);

      return res.status(200).json({ status: status.SUCCESS, path: givenPath });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: status.BAD_REQUEST, message: error.message });
    }
  }
}

const video = new VideoConvert();
export { video };
