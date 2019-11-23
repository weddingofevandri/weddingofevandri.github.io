//Sent Mail Use Third Party
function onSentEmail(){
	var recipientMail = document.getElementById('umail').value;
	var body = "<div style=\"width:90%;margin-left:4%;border:1px solid #ddd;border-radius:4px;box-shadow: 0 0 1px 1px rgba(0, 140, 186, 0.5)\">" +
			"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" +
			 "<tr>" +
			  "<td width=\"\" valign=\"top\">" +
			   "<table style=\"padding-left:10%;padding-right:10%;padding-top:5%;padding-bottom:10%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" +
				"<tr>" +
				 "<td>" +
				  "<p>Dear "+recipientMail+"<p/>" +
				  "<p>Terima kasih sudah konfirmasi via undangan di website pernikahan <strong>Eva</strong> & <strong>Andri</strong>.<p/>" +
				  "<p>Jangan lupa datang yaa di akad dan resepsi pernikahan kami.</p>" +
				  "<p>Akad Nikah :</p> " +
				  "<p>Hari Jumat, 29 November 2019<br/>Pukul 07.00 WIB<br/>Di Kediaman Mempelai Wanita<br/>Dk.Widari, Limbangan, Kec. Karanganyar, Pekalongan</p>" +
				  "<p>Resepsi :</p> " +
				  "<p>Hari Sabtu, 14 Desember 2019<br/>Pukul 19.00 - 21.00 WIB<br/>Di Gedung Balai Makarti Muktitama, Departemen Tenaga Kerja dan Transmigrasi<br/>Jl. TMP Kalibata No.17, Rawajati, Kec. Pancoran, Jakarta Selatan</p>" +
				  "<br/>" +
				  "<p>Terima Kasih.<br/><strong>Eva & Andri</strong></p>" +
				 "</td>" +
				"</tr>" +
				"<tr>" +
				 "<td>" +
				  "<p>&reg; Someone, somewhere 2019</p>" +
				 "</td>" +
				"</tr>" +
				"<tr>" +
				  "<td>" +
				   "<a href=\"https://www.facebook.com/andri.priyono.5/\"><img src=\"https://findicons.com/files/icons/2354/dusseldorf/32/facebook.png\" /></a>" +
				  "</td>"+
				"</tr>"+
			   "</table>" +
			  "</td>" +
			 "</tr>" +
			"</table>" +
		   "</div>"
			;
	if(ValidateEmail(recipientMail)){
		if(document.getElementById('yes').checked || document.getElementById('maybe').checked){
			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "vengefoldjrstar@gmail.com",
				Password : "a5a816e6-b240-45e0-995a-f936c41205f1",
				SecureToken : "a5a816e6-b240-45e0-995a-f936c41205f1",
				To : recipientMail,
				//To : 'vengefoldjrstar@gmail.com',
				From : "vengefoldjrstar@gmail.com",
				Subject : "The Wedding Of Eva & Andri",
				Body : body
				}).then(message => alert("Pesan Sukses Terkirim!!! Cek Email Kamu Sekarang (Inbox atau Spam)!!! "
			));
			ProcessWithFireBase("Add");
		}
		else{
			ProcessWithFireBase("Add");
			alert("Terima Kasih Telah Meluangkan Waktu Nya. Mohon Doanya Yaa!!!")
		}
	}
	else{
		alert("Alamat Email Tidak Valid!!!");
	}
}
		
function onTestMail(){
	var recipientMail = document.getElementById('umail').value;
	if(ValidateEmail(recipientMail)){
		if(document.getElementById('yes').checked || document.getElementById('maybe').checked){
			alert(recipientMail);
		}
		else{
			alert('Tidak Hadir');
		}
	}
	else{
		alert("Alamat Email Tidak Valid!!!");
	}
	ProcessWithFireBase("Add");
}
		
function ValidateEmail(inputText)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailformat))
	{
		//document.getElementById('umail').focus();
		return true;
	}
	else
	{
		document.getElementById('umail').focus();
		return false;
	}
}
//Database Google FireBase
function ProcessWithFireBase(action){
	var firebaseConfig = {
		apiKey: "AIzaSyCdkC1Ex4imxSPiwH9eoixEiFr421DqEwc",
		authDomain: "datasourcewedding.firebaseapp.com",
		databaseURL: "https://datasourcewedding.firebaseio.com",
		projectId: "datasourcewedding",
		storageBucket: "datasourcewedding.appspot.com",
		messagingSenderId: "233096767553",
		appId: "1:233096767553:web:dba1cb4249c70b7d"
		};
	firebase.initializeApp(firebaseConfig);
	if(action == "Add"){
		var mail = document.getElementById('umail').value;
		var isabsent = "";
		if(document.getElementById('yes').checked){
			isabsent = "YES";
		}
		else if (document.getElementById('maybe').checked){
			isabsent = "MAYBE";
		}
		else{
			isabsent = "NO";
		}
		set_data(mail, isabsent, "guest");
	}
}

function set_data(mail,isabsent,key){
	var i = 0;
	var commentsRef = firebase.database().ref('users');
	commentsRef.on('child_added', function(data) {
		alert(data.key);
		alert(data.val().email);
		alert(i);
		i = i+1;
		//addCommentElement(postElement, data.key, data.val().text, data.val().author);
	});
	if (){
		new_data();
	}
	else{
		update_data();
	}
}

function new_data(key,mail,isabsent){
	firebase.database().ref('users/' + key).set({
		email: mail +", "+ isabsent,
		});
}
	
function update_data(key,mail,isabsent){
	firebase.database().ref('users/' + key).update({
	email:  mail +", "+ isabsent,
	});
}
	
function remove_data(key){
	firebase.database().ref('users/' + key).remove();
}
	
function read_data(){
	var commentsRef = firebase.database().ref('users');
	commentsRef.on('child_added', function(data) {
		alert(data.key);
		alert(data.val().email);
		//addCommentElement(postElement, data.key, data.val().text, data.val().author);
	});

	// commentsRef.on('child_changed', function(data) {
		// //setCommentValues(postElement, data.key, data.val().text, data.val().author);
	// });

	// commentsRef.on('child_removed', function(data) {
		// //deleteComment(postElement, data.key);
	// });
}

function read_data_once(){
	firebase.database().ref('/users/' + "guest").once('value').then(function(snapshot) {
		var key = snapshot.key;
		var email = snapshot.val().email;
		alert(key);
		alert(email);
	});
}

function ReadFromFireBase(){
	var firebaseConfig = {
		apiKey: "AIzaSyCdkC1Ex4imxSPiwH9eoixEiFr421DqEwc",
		authDomain: "datasourcewedding.firebaseapp.com",
		databaseURL: "https://datasourcewedding.firebaseio.com",
		projectId: "datasourcewedding",
		storageBucket: "datasourcewedding.appspot.com",
		messagingSenderId: "233096767553",
		appId: "1:233096767553:web:dba1cb4249c70b7d"
		};
	firebase.initializeApp(firebaseConfig);
}


