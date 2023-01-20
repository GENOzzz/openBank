window.addEventListener('DOMContentLoaded',function(){

	const code = document.getElementById('code').value;
	
	const data = {
		"code": code,
		"client_id": 'd91f8584-0a52-41a9-97a9-0488e3cefeeb',
		"client_secret":'', 
		"redirect_uri":'http://localhost:3000/main',
		"grant_type":'authorization_code'
	}
	
	const url = `https://testapi.openbanking.or.kr/oauth/2.0/token?code=${data.code}&client_id=${data.client_id}&client_secret=${data.client_secret}&redirect_uri=${data.redirect_uri}&grant_type=${data.grant_type}`;
	
    fetch(url,{
		mode:'cors',
		method:'POST',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	})
	.then(res => res.json())
	.then(data => {
		console.log('sucess',data)
		
		const access_token = document.getElementById('access_token');
		access_token.innerText = data.access_token;
		const refresh_token = document.getElementById('refresh_token');
		refresh_token.innerText = data.refresh_token;
		const user_seq_no= document.getElementById('user_seq_no');
		user_seq_no.innerText=data.user_seq_no;

	})
	.catch(data => console.log('fail',data))
});