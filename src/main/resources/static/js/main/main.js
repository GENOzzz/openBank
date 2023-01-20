const code = document.getElementById('code');
const access_token = document.getElementById('access_token');
const refresh_token = document.getElementById('refresh_token');
const user_seq_no = document.getElementById('user_seq_no');
const token_type = document.getElementById('token_type');
const expires_in = document.getElementById('expires_in');
const scope = document.getElementById('scope');

window.addEventListener('DOMContentLoaded',function(){
	
		
	if(code.value){
		
		const codeData = new FormData();
		codeData.append('code',code.value);
		
	    fetch("http://localhost:3000/token/issue",{
			method:'POST',
			body:codeData
		})
		.then(res => res.json())
		.then(data => {
			console.log('sucess1',data);
			
			if(data.rsp_code === 'O0001'){
				alert(data.rsp_message);
			}
			
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
					console.log('success2',data);
					alert('계좌 등록이 완료 되었습니다.\n 다시 로그인 하여주십시오.')
					window.location="http://localhost:3000";
					if(data == false){
						alert('wrong data...')
						window.location='http://localhost:3000/login/logout';
					}
					})
				.catch(data=>console.log('fail',data))
			}else{
				console.log ('something wrong');
			}			
		})
		.catch(data => console.log('fail',data));
	}else{
		if(!access_token.value){
			alert('로그인이 필요합니다.')
			window.location="http://localhost:3000";
		}
	}
	
	if(access_token.value){
		accountList()
		};
});

function logout(){
	window.location="http://localhost:3000/login/logout"	
}