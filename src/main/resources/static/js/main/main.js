const code = document.getElementById('code');
const access_token = document.getElementById('access_token');
const refresh_token = document.getElementById('refresh_token');
const user_seq_no = document.getElementById('user_seq_no');
const token_type = document.getElementById('token_type');
const expires_in = document.getElementById('expires_in');
const scope = document.getElementById('scope');

window.addEventListener('DOMContentLoaded',function(){
	
	const data = {
		"code" : code.value,
		"clientId" : 'd91f8584-0a52-41a9-97a9-0488e3cefeeb',
		"clientSecret" :'ttt', 
		"redirectUri" :'http://localhost:3000/main',
		"grantType" : 'authorization_code'
	}
	
	if(code.value){
		const url = `https://testapi.openbanking.or.kr/oauth/2.0/token?code=${data.code}&client_id=${data.clientId}&client_secret=${data.clientSecret}&redirect_uri=${data.redirectUri}&grant_type=${data.grantType}`;
	
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
			
			access_token.value = data.access_token;
			refresh_token.value = data.refresh_token;
			user_seq_no.value=data.user_seq_no;
			token_type.value = data.token_type;
			expires_in.value = data.expires_in;
			scope.value = data.scope;
	
			const formData = new FormData(document.getElementById('mainForm'));
			
			console.log(formData)
			
			fetch("http://localhost:3000/token/access",{
				method:'POST',
				cache:'no-cache',
				body:formData
			})
			.then(res=>{console.log(res)
			res.json()})
			.then(data=>console.log('success',data))
			.catch(data=>console.log('fail',data))
		})
		.catch(data => console.log('fail',data))
	}else{
		if(!access_token.value){
			alert('로그인이 필요합니다.')
			window.location="http://localhost:3000"
		}
	}
	

});

function accountInquiry(){
	
	const url = `https://openapi.openbanking.or.kr/v2.0/account/list?user_seq_no=1101018571&include_cancel_yn=N&sort_order=D`	
	
	fetch(url,{
		method : 'GET',
		headers:{
			'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4NTcxIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODEyNTk1NzAsImp0aSI6IjkyMjlhYmUxLWJlOTgtNGNmNi1iM2YwLTFhYTIxZDczMDMyYSJ9.H8CkZWYoFhmahb8aYkUFANC7C1SBmgDrmg-2ssdi2e0`
		}
	})
	.then(res => res.json())
	.then(data => console.log('success',data))
	.catch(data=>conosle.log('fail',data))
}