var memory;

function chat(){
    $.post("chat.cgi", $('#name').val()+","+$('#content').val()+","+$('#color').val(), function(data){
	setTimeout('getChat(true)', 100);
	if(data!=='') alert(data);
    });
    $('#content').val('');
}

function getChat(call_back){
    $.ajaxSetup({cache: false});
    $.get('chat.csv', function(data){
	if(memory !== data){
	    $('#chat').html("");
	    memory = data;
	    var _chat = $.csv(",","","\n")(data);
	    for(var i=0;i<_chat.length;i++){
		$('#chat').append("<tr><td style=\"width:85px;color:#dddddd;\">" + escape(_chat[i][0]) + "</td><td>" + escape(_chat[i][1]) + "</td><td>></td><td style=\"color:" + escape(_chat[i][3]).slice(0,7) + "\">" + escape(_chat[i][2]) + "</td></tr>");
	    }
	    autoScroll();
	}
    });


    if(call_back == true) setTimeout('getChat(true)', 1000);
}

function autoScroll(){
    if($('#auto_scroll').is(':checked')){
	var pos = $('#chat').height() - $('#chat_window').height();
	if(pos > 8)  $('#chat_window').animate({scrollTop: pos}, 500);
    }
}

function keypress(code){
    if(code == 13){
	if($(':focus').attr('id') === 'content') chat();
	else $('#content').focus();
    }
}

function escape(val) {
    return $("<div/>").text(val).html();
}

    