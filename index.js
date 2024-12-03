import { log, error } from 'node:console';
import { read } from './modules/read.js';
import { write } from './modules/write.js';
import { greyBlurImage, resizeImage } from './modules/image.js';

console.log('Hello sharp');
// todo path __filename __dirname

await resizeImage('./task3sharp/targhpic.jpg', './task3sharp/targh4resized.jpg');

await greyBlurImage('./task3sharp/targhpic.jpg', './task3sharp/targh4greyblur.jpg');
