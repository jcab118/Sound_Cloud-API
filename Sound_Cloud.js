$(document).ready(function(){

//Sound Cloud API//
	SC.initialize({
	  client_id: 'fd4e76fc67798bfa742089ed619084a6',
	});

//Search Header//
	var header = $('<h4>');
	header.text("Search by Artist or Song Name");
	$('div').eq(0).append(header);

//Search Input//
	var input = $('<input>',{
		id: 'track-input',
		type: 'text',
		placeholder: '...',
		class: 'col-md-4',
		height: '25px'
	});

	//Search Button Variable//
	var button = $('<button>',{
		id: 'search-button',
		class: 'btn btn-primary',
		text: 'Search'
	});

	$('div').eq(0).append(input).append(button).append('<br><br>')

	var songDiv = $('<div>');
	songDiv.addClass('song-div');
	$(document).on('click', '#search-button', function(){
		appendSongList(songDiv);
	});

//Creating Search Button//
	$(document).on('click', '.song-button', function(){
		var id = $(this).data('id');
		SC.stream("/tracks/" + id).then(function(player) {
			player.play();
		});
	});

//Search by Pressing Enter Key//
	$(document).on('keypress', function(e){
		if(e.key === 'Enter'){
			appendSongList(songDiv);
		}
	})

//Creating song results list//
	function appendSongList(div){
		$('.song-div').remove();
		SC.get('/tracks',{
			q: $('#track-input').val()
		}).then(function(response){
			var str = "<ol>";
			for(var i = 0; i < response.length; i++){
				str += "<li><button class='song-button' data-id=" + response[i].id + ">" + response[i].title + "</button></li>"
			}
			str += "</ol>"
			div.html(str);
			$('div').eq(0).append(div)
		});
		$('#track-input').val("");
	}

})

var tracks, players = [];
 //Play, stop, pause, rewind, fastforward Buttons//
document.addEventListener("DomContentLoaded", function(event){

document.getElementById("playBtn").addEventListener("click", function(){
  playTrack(currentSong);
  console.log("test")
});

document.getElementById("pauseBtn").addEventListener("click", function(){
  players[currentSong].pause();
});

document.getElementById("stopBtn").addEventListener("click", function(){
  players[currentSong].pause();
  players[currentSong].seek(0);
});

document.getElementById("forwardBtn").addEventListener("click", function(){
  currentSong++;
  if(currentSong>= tracks.length){
    currentSong = 0;
  }
  playTrack(currentSong);
});

document.getElementById("rewindBtn").addEventListener("click", function(){
  currentSong--;
  if (currentSong <0){
    currentSong=tracks.length-1;
  }
  playTrack(currentSong);
});
});
