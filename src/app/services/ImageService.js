
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ImageService', function(){
      this.processImage = function(file,canvasRef) {
          canvas = canvasRef;
          ctx = canvas.getContext("2d");
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
              image.src = reader.result;
              canvas.height = 450;
              canvas.width = 570;
          }
      };

      this.getDataURL = function() {
        var temp = dataURL;
        dataURL = "";
        return temp;
      }

      this.resetData = function() {
        dataURL = "";
        canvas = null;
        ctx = null;
      }

      var onLoadHandler = function() {
        // if (image.width < image.height){
        //   console.log("Portait", image.height, image.width);
        //   var ratio = image.height/image.width;
        //   var height = canvas.height;
        //   var width = height*ratio;
        //   var offset = (canvas.width - width)/2;
        //   ctx.drawImage(image, offset, 0, width, height);
        // }
        // else{
        //   console.log("canvas", canvas.width, canvas.height);
        //   console.log("Landscape", image.width, image.height);
        //   var ratio = image.width/image.height;
        //   var width = canvas.width;
        //   var height = width*ratio;
        //   console.log(width, height);
        //   var offset = (canvas.height - height)/2;
        //   ctx.drawImage(image, 0, offset, width, height);
        //}
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          dataURL = canvas.toDataURL();
          console.log(dataURL);
      };

      var canvas,ctx;
      var image = document.createElement("img");
      image.crossOrigin = "Anonymous";
      image.onload = onLoadHandler;

      var dataURL = "";
     
    });

})();
