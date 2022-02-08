var express = require('express');
var router = express.Router();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path')
const yas = require('youtube-audio-server')
/* GET home page. */
router.get('/', function(req, res, next) {
  let x = req.originalUrl.replace("/","");
  res.render('index', { title: req.originalUrl.replace("/","")});
  let y = x.replace(' ','+');
  const url = "https://www.googleapis.com/youtube/v3/search/?key=AIzaSyCSxMvPgYvu45ORWdHkoTdgFqE3Vvn0Mik&part=snippet&q="+y;
  console.log(url);
            
            const id = x;
            const file = 'whole-lotta-love.mp3'
            console.log(`Downloading ${id} into ${file}...`)
            yas.downloader
              .setFolder('C:\\Users\\KIIT\\Desktop\\techie_music_electron\\src\\some\\folder') 
              .onSuccess(({id, file}) => {
                
                console.log(`downloade file`)
              
              })
              .onError(({ id, file, error }) => {
                console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
              })
              .download({ id, file})
});

module.exports = router;
