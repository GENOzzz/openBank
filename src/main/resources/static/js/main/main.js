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
			
			if(data.rsp_code=='O0001'){
				alert(data.rsp_message)
			}else{
				access_token.value = data.access_token;
				refresh_token.value = data.refresh_token;
				user_seq_no.value=data.user_seq_no;
				token_type.value = data.token_type;
				expires_in.value = data.expires_in;
				scope.value = data.scope;
		
				const formData = new FormData(document.getElementById('mainForm'));
				
				console.log(formData)
				
				if(access_token.value != undefined){
					fetch("http://localhost:3000/token/access",{
						method:'POST',
						cache:'no-cache',
						body:formData
					})
					.then(res=>{console.log(res)
					res.json()})
					.then(data=>{
						console.log('success',data)
						if(data == false){
							alert('wrong data...')
							window.location='http://localhost:3000/login/logout'
						}
						})
					.catch(data=>console.log('fail',data))
				}else{
					console.log ('something wrong')
				}
				
			}
			
		})
		.catch(data => console.log('fail',data))
	}else{
		if(!access_token.value){
			alert('로그인이 필요합니다.')
			window.location="http://localhost:3000"
		}
	}
	

});

function logout(){
	window.location="http://localhost:3000/login/logout"	
}

function accountList(){
	fetch("http://localhost:3000/account/list",{
		method:'post'	
	})
	.then(res=>res.json())
	.then(data=>console.log(data))
	.catch(data=>console.log('error',data))
}