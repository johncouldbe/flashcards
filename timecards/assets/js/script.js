$(window).on("load", function(){
  function speechParser() {
    recordedArray.forEach( function (item, i) {
      /* 1 Change1 */
      if (item == "cow" && recordedArray[i+1] == "cow" && recordedArray[i+2] == "cow"){
        if(recordedArray[i+3] == "cow"){
          recordedArray[i +3] = "cat";
          recordedArray[i +1] = "cat";
        } else {
          recordedArray[i +1] = "cat";
        }
      }
      if (item == "cat" && recordedArray[i+1] == "cat" && recordedArray[i+2] == "cat"){
        recordedArray[i +1] = "cow";
      }
      if (item == "cal"){
        recordedArray[i] = "cow";
      }
      if (item == "dog" || item == "dark" || item == "stuck" || item == "."){ //Change to Duck
       recordedArray[i] = "duck";
       console.log(1);
      }
      if (item == "tap" || item == "fat" || item == "tack" || item == "cap" || item == "scat"){ //Change to Cat
       recordedArray[i] = "cat";
       console.log(3);
      }
      if (item == "forest" || item == "or" || item == "course"){ //Change to Horse
       recordedArray[i] = "horse";
       console.log(9);
      }
      /* 2 Changes */
      if (item == "tap." || item == "cat." || item == "catdog"){ //Change to Cat then Duck
       recordedArray[i] = "cat";
       recordedArray.splice((i + 1), 0, "duck");
       console.log(5);
      }
      if (item == "cal."){ //Change to Cat then Duck
       recordedArray[i] = "cow";
       recordedArray.splice((i + 1), 0, "duck");
       console.log(5);
      }
      if (item == "cow." || item == "so."){ //Change to Duck then Cow
       recordedArray[i] = "cow";
       recordedArray.splice((i + 1), 0, "duck");
       console.log(4);
      }
      if (item == "dr." || item == "dachau" || item == "ductile"){ //Change to Duck then Cow
       recordedArray[i] = "duck";
       recordedArray.splice((i + 1), 0, "cow");
       console.log(4);
      }
      if (item == ".org"){ //Change to Duck then Horse
       recordedArray[i] = "duck";
       recordedArray.splice((i + 1), 0, "horse");
       console.log(10);
      }
      if (item == "horse." || item == "horoscope"){ //Change to Horse then Duck
       recordedArray[i] = "horse";
       recordedArray.splice((i + 1), 0, "duck");
       console.log(8);
      }
      /* 3 Changes */
      if (item == "cat.com"){ //Change to Cat then Duck then Cow
       recordedArray[i] = "cat";
       recordedArray.splice((i + 1), 0, "duck");
       recordedArray.splice((i + 2), 0, "cow");
       console.log(7);
      }
      if (item == "crap."){ //Change to Cat then Duck then Cow
       recordedArray[i] = "cow";
       recordedArray.splice((i + 1), 0, "cat");
       recordedArray.splice((i + 2), 0, "duck");
       console.log(7);
      }
      if (item == "..."){ //Change to Cat then Duck then Cow
       recordedArray[i] = "duck";
       recordedArray.splice((i + 1), 0, "cow");
       recordedArray.splice((i + 2), 0, "duck");
       console.log(7);
      }
      if (item == "horse..."){
          recordedArray[i +1] = "duck";
          recordedArray[i +2] = "cat";
          recordedArray[i +3] = "duck";
      }
     });
  }

  showStartContainer();
  //Function to hide/show main menu modal
  function hideStartContainer(){
    $('.start-container').css('display','none');
  };
  function showStartContainer(){
    $('.start-container').css('display','block');
  };
  //Hide modal when x pressed
  $('.close').click( function startDictation() {
    hideStartContainer();
  });

  //Audio
  var metronome = new Audio('assets/audio/metronome.wav');
  var metronomeUp = new Audio('assets/audio/metronome-up.wav');
  var metronomeCounter = 1;
  /*Gotta fix this. metronomeCounter not working */
  function metronomed(){
    if(metronomeCounter < 4){
      metronomeCounter++;
      metronomeUp.play();
    } else {
      metronome.play();
      metronomeCounter = 1;
      console.log(metronomeCounter);
    }
  };

  //User Response
  var recorded = ""; //users response is stored as a string
  var recordedArray = []; //where the users response will be broken down and stored into an array of answers

  //Listens to user and puts speech to text

  var recognition = new webkitSpeechRecognition();
  function speech(){
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    /* Add an if count is greater than 0 statement here */
    recognition.onresult = function(event) {
      recorded += event.results[0][0].transcript.toLowerCase();
      recordedArray = recorded.split(' ');
      console.log(recordedArray);
      recognition.stop();
      if(count != 0){
        count = reps - 1;
        $('.scoreHeader').html('');
        $('.score').html('Your audio ended too soon!');
      } else {
          keepScore(); //Time cards will finish before. This function is here to wait until end of input
        }
    }


    recognition.onerror = function(e) {
      answers = []; //If you don't do this answers keep adding into the array if there is no response
      imagesArray = []; //Makes sure we don't keep displaying the same order repeatedly if that happens
      createRandomArray();
      recognition.stop();
    }
  };

  // Time Cards
  var reps = 8; //How many cards
  var count = 0; //Keeps Track of how many flash cards so far
  var speed = 60; //Speed at which cards are flashed in Beats Per Minute
  var images = [
    "duck.png",
    "cat.jpg",
    "cow.svg",
    "horse.jpg"
  ];
  var imagesArray = []; //Will later store a randomized order for our cards images

  //Creates a randomized array to draw images for the time cards
  function createRandomArray(){
    for(i = 0; i < reps; i++){
      var newRandom = Math.floor(Math.random() * 4);
      while(newRandom == imagesArray[i -1]){
        newRandom = Math.floor(Math.random() * 4);
      }
      imagesArray.push(newRandom);
    }
  };

  // Time Cards Response
  var answers = []; //Actual answers from the time cards

  //Time Card function. Flashes cards up in intervals determined by "speed"
  function initiated (){

    $('.score').html(''); //If a previous score was there it is now erased

    //Start Interval
    var intervalID = setInterval(function () {

    //metronomed();  //Metronome click every Interval
    var current = imagesArray[count];  //Grabs the images name and stores it to be used

    answers.push(images[current].slice(0, -4)); //Removes the end of the file i.e. ".jpg", creating the answer to the card and puts it into answers array
    $('.card').css('background-image', 'url(\'assets/images/' + images[current] + '\')'); //flashed card

     if (++count == reps) { //Once the right amount of cards have been shown end this part and reset var count
       console.log(answers);
       count = 0;
       setTimeout(function(){ showStartContainer(); }, 1500); //Shows main container after 1.5s so user has time to see image and respond
       window.clearInterval(intervalID);

     }
   }, (60 / speed) * 1000); //Converts speed to Milliseconds
 };

  //Clears out all Variables so that theyre ready to be reused next time
  function clearEverything(){
    answers = [];
    imagesArray = [];
    recorded = "";
    score = 0;
    metronomeCounter = 0;
  };

  //Compares Time Cards answers to user Response and runs function "clearEverything" when done.
  var score = 0;

  function keepScore() {
    speechParser();
    for (var i = 0; i < answers.length; i++){
      var a = answers[i];
      var b = recordedArray[i];
      if (a == b){
        score++;
      }
    }
    $('.score').html(score + " / " + reps);
  };
  //Speed Changer
  document.getElementById('speedHeader').innerHTML = speed;
  document.getElementById('cardHeader').innerHTML = reps;

  $('.speedButton').click(function(){
    if(document.getElementById('speed').value == "" && document.getElementById('card').value == ""){
      alert('Please make sure you have entered a value.');
    } else {
      if(document.getElementById('speed').value != ""){
        speed = document.getElementById('speed').value;
        document.getElementById('speedHeader').innerHTML = speed;
      }
      if(document.getElementById('card').value != ""){
        reps = document.getElementById('card').value;
        document.getElementById('cardHeader').innerHTML = reps;
      }
    }
    return false;
  });

  //Run program on click
  $('.initiate').click( function () {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      clearEverything();
      createRandomArray();  //Create our randomized order of cards
      hideStartContainer();
      initiated();
      speech();
    } else {
      alert('Uh Oh! It looks like your browser doesn\'t support Speech Recognition.');
    }

  });


});
