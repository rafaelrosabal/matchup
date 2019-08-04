$(function(){
  var defaultSettings = {
    'threshold-type': 'percentage',
    'max-threshold': 0.01,
    'max-delta': 20,
    'max-offset': 0,
  }
  
  var filedCSV ;
  var resultArray = [];
  var countDtp = 0;
  var count = 1;
  var status = false;

  
 rotate('.bar');
  
 function dropZone($target, onDrop){
		$target.
			bind('dragover', function(){
				$target.addClass( 'drag-over' );
				return false;
			}).
			bind("dragend", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("dragleave", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("drop", function(event) {
				var file = event.originalEvent.dataTransfer.files[0];
             
               


				event.stopPropagation();
				event.preventDefault();

				$target.removeClass( 'drag-over' );

				var droppedImage = new Image();
				var fileReader = new FileReader();
        var bufferReader = new FileReader();

				fileReader.onload = function (event) {
					droppedImage.src = event.target.result;
					$target.html(droppedImage);
          $target.addClass('drop-active');
          $target.css('height', droppedImage.height + 20); // thickness of border
          onDrop(event.target.result);
          
         
				};

              
			 fileReader.readAsDataURL(file);
			  alert(fileReader.result);
          
				
				

			});
	}
  var dropZoneOne = $('#dropzone1');
  var dropZoneTwo = $('#dropzone2');
  var file1;
  var file2;
  var totalPixels;

  dropZone(dropZoneOne, function(file){
  
  file1 = file
    if(file2) {
      matchup = new MatchUp({
      // `imageA` and `imageB` can be either Strings (file path on node.js,
      // public url on Browsers) or Buffers
      
      
      imageA: file1,
      imageB: file2,

      // Needs to be one of MatchUp.THRESHOLD_PERCENT or MatchUp.THRESHOLD_PIXELS
      thresholdType: MatchUp.THRESHOLD_PERCENT,

      // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
      maxThreshold: 0.01,

      // Maximum color delta (0...255):
      maxDelta: 20,

      // Maximum surrounding pixel offset
      maxOffset: 0,

      renderComposition: true, // Should MatchUp render a composition image?
      compositionMaskColor: MatchUp.Color.RED // Color of unmatched pixels
    })
    
    
   // Set total pixel count
    var width = Math.min(matchup._imageA.width, matchup._imageB.width);
    var height = Math.min(matchup._imageA.height, matchup._imageB.height);

    totalPixels = width * height;
   
    // Run the comparison
    matchup.compare()
      .then(function (result) {
        // Set total pixel count
        var width = Math.min(matchup._imageA.width, matchup._imageB.width);
        var height = Math.min(matchup._imageA.height, matchup._imageB.height);

        totalPixels = width * height;
        
        
        
        onComplete(result);

       
      })
      .catch((e) => {
        console.error(e)
      })
    }
  });

  dropZone(dropZoneTwo, function(file){
    file2 = file
    if(file1) {
      matchup = new MatchUp({
      // `imageA` and `imageB` can be either Strings (file path on node.js,
      // public url on Browsers) or Buffers
      imageA: file1,
      imageB: file2,

      // Needs to be one of MatchUp.THRESHOLD_PERCENT or MatchUp.THRESHOLD_PIXELS
      thresholdType: MatchUp.THRESHOLD_PERCENT,

      // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
      maxThreshold: 0.01,

      // Maximum color delta (0...255):
      maxDelta: 20,

      // Maximum surrounding pixel offset
      maxOffset: 0,

      renderComposition: true, // Should MatchUp render a composition image?
      compositionMaskColor: MatchUp.Color.RED // Color of unmatched pixels
    })

    window.matchup = matchup;

    // Run the comparison
    matchup.compare()
      .then(function (result) {
        // Set total pixel count
        var width = Math.min(matchup._imageA.width, matchup._imageB.width);
        var height = Math.min(matchup._imageA.height, matchup._imageB.height);

        totalPixels = width * height;
        onComplete(result);
        
      })
      .catch((e) => {
        console.error(e)
      })
    }
  });


 function onInputChange(){
    var options = {
      'threshold-type': $('[name="threshold-type"]').val(),
      'max-threshold': $('[name="max-threshold"]').val(),
      'max-delta': $('[name="max-delta"]').val(),
      'max-offset': $('[name="max-offset"]').val(),
    };
    updateMatchUp(options);
  }

  function updateMatchUp(options){

    var thresholdType = (options['threshold-type'] == 'percentage')? MatchUp.THRESHOLD_PERCENT : MatchUp.THRESHOLD_PIXELS;
    matchup._options['thresholdType'] =  thresholdType;
    matchup._options['maxThreshold'] = Number(options['max-threshold']);
    matchup._options['maxDelta'] =  Number(options['max-delta']);
    matchup._options['maxOffset'] = Number(options['max-offset']);

    window.matchup = matchup;
    matchup.compare()
      .then(function (result) {
        onComplete(result);
        
      })
      .catch((e) => {
        console.error(e)
      })
  }

  function onComplete(result) {

    
    $('.passed-result').text(result.passed);
    if(result.passed) {
      $('.passed-result').removeClass('wrong');
      $('.passed-result').addClass('right');
    } else {
      $('.passed-result').removeClass('right');
      $('.passed-result').addClass('wrong');
    }
   // var percentage = (result.differences / totalPixels).toFixed(2) + '%'
   
   elap
   $('.percentage-result').text(result.threshold);
    //$('.percentage-result').text(percentage);
    $('.pixel-result').text(result.differences);
    
    

    setInputDefaults();

    $('.results').show();
    $('.comparison-image').html(result.compositionImage);
  }
  
  
   function onCompleteCSV(result) {

  var percentage = (result.differences / totalPixels).toFixed(2) + '%'
 
  }

  function setInputDefaults() {
    console.log("seeting inputs");
    for(var key in defaultSettings) {
      var $input = $('[name="' + key + '"]');
      if ($input.val() == ''){
        $input.val(defaultSettings[key]);
      }
    }
  }
  
  
  
 function parseCSV(text, lineTerminator, cellTerminator) {
  //break the lines apart
  var lines = text.split(lineTerminator);
  var output = {
       'compositionImage':  Image,
       'differences': 0,
       'passed': false,
       'threshold': 0,
       
        };
  
  
   
   countDtp = lines.length;

  for (var j = 0; j < lines.length; j++) {
    if (lines[j] != "") {
      
      var information = lines[j].split(",");

    
       compareImagesFromCSV( information[0],  information[1]);

       
    }
        
  }
  
} 
  
  
  function handleFileSelect(evt) {
  
   
   $('.loading-csv').show();
 
  var files = evt.target.files; // FileList object
  
  for (var i = 0, f; (f = files[i]); i++) {
    var reader = new FileReader();
   
    reader.onload = (function(theFile) {
      return function(e) {
      
        parseCSV(e.target.result, "\n", ";");
      };
    })(f);
    
    reader.readAsText(f);
  }
}

 function rotate(selector)
  {
    $(selector).animate( { left: $('.load').width() }, 1500, function(){
      $(selector).css("left", -($(selector).width()) + "px");
      rotate(selector);
    });
  }
  

 
function compareImagesFromCSV(file1, file2){

   var t0 = performance.now();
   
  
 
  matchup = new MatchUp({
      // `imageA` and `imageB` can be either Strings (file path on node.js,
      // public url on Browsers) or Buffers
      imageA: file1,
      imageB: file2,

      // Needs to be one of MatchUp.THRESHOLD_PERCENT or MatchUp.THRESHOLD_PIXELS
      thresholdType: MatchUp.THRESHOLD_PERCENT,

      // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
      maxThreshold: 0.01,

      // Maximum color delta (0...255):
      maxDelta: 20,

      // Maximum surrounding pixel offset
      maxOffset: 0,

      renderComposition: true, // Should MatchUp render a composition image?
      compositionMaskColor: MatchUp.Color.RED // Color of unmatched pixels
    })

    window.matchup = matchup;
    
   // Run the comparison
    matchup.compare()
      .then(function (result) {
        // Set total pixel count
        var width = Math.min(matchup._imageA.width, matchup._imageB.width);
        var height = Math.min(matchup._imageA.height, matchup._imageB.height);

        totalPixels = width * height;
        
        count++;
        
        console.log("count", count);
        console.log("countDtp", countDtp);
       
       if(count == countDtp)
       {
        
        status = true;
        $('.results-csv').show();
         $('.loading-csv').hide();
         
       } 
       
      var t1 = performance.now();
      
      var elapsed =  ((t1 - t0)/1000) % 60 ;
      
      console.log("t1", t1);
           
      fileCSV  = {
       'image1':  file1,
       'image2':  file2,
       'similar': result.threshold,
       'elapsed':  elapsed,
       
        }
        
         resultArray.push(fileCSV);
       
      })
      .catch((e) => {
        console.error(e)
      })
 
}

document
  .getElementById("files")
  .addEventListener("change", handleFileSelect, false);
 
 
  
  function exportArrayToCSV(resultArray, filename) {
  
 
   var csv = CSV(resultArray);
   downloadCSV(csv, filename);
  
   }


function CSV(array) {
   
    var keys = Object.keys(array[0]);

    // Build header
    var result = keys.join("\t") + "\n";

    // Add the rows
    array.forEach(function(obj){
        keys.forEach(function(k, ix){
            if (ix) result += "\t";
            result += obj[k];
        });
        result += "\n";
    });

   return result;
    
   
}


function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

	if (window.Blob == undefined || window.URL == undefined || window.URL.createObjectURL == undefined) {
		alert("Your browser doesn't support Blobs");
		return;
	}
	
	
	csvFile = new Blob([csv], {type:"text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
  }
  
  
   $('.export-csv').on('click', function(ev){
    
    exportArrayToCSV(resultArray, 'processed_file.csv') ;
  });
  
  
});


