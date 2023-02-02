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
		
	    fetch("/token/issue",{
			method:'POST',
			body:codeData
		})
		.then(res => res.json())
		.then(data => {
			console.log('sucess1',data);
			
			if(data.rsp_code != 'O0000'){
				alert(data.rsp_message);
				return;
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
				fetch("/token/update",{
					method:'POST',
					cache:'no-cache',
					body:formData
				})
				.then(res=>res.json())
				.then(data=>{
					if(data == false){
						alert('wrong data...');
					}
					alert('계좌 등록이 완료 되었습니다.\n 다시 로그인 하여주십시오.')
					window.location="/";
					})
				.catch(data=>console.log('fail : /token/access',data))
			}		
		})
		.catch(data => console.log('fail',data));
	}else{
		if(!access_token.value){
			alert('로그인이 필요합니다.')
			window.location="/";
		}
	}
	
	if(access_token.value){
		accountList()
		};
});

function logout(){
	window.location="/login/logout"	;
}

function accountAdd(){
	
	if(confirm('계좌등록을 진행하시겠습니까?')){
		window.location="https://testapi.openbanking.or.kr/oauth/2.0/authorize?"+
	          "response_type=code&"+
	          "client_id=39965b53-c3e4-46a3-8c1b-55180370d35d&"+
	          "redirect_uri=http://"+window.location.host+"/main&"+
	          "scope=login inquiry transfer&"+
	          "state=68749843513579843513579321354988&"+	
	          "auth_type=0";
	}
	
}