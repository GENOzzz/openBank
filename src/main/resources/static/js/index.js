const code = document.getElementById('code');

function signUp(){
	
	const inputId = document.getElementById('id').value
	const inputPw = document.getElementById('pw').value
		
	if(!inputId){
		alert('아이디를 입력하여 주세요.')
		return;
	}
	
	if(!inputPw){
		alert('비밀번호를 입력하여 주세요.')
		return;
	}
	
	const formData = new FormData(document.getElementById('loginForm'));

	fetch("/login/do",{
		method:'POST',
		body:formData
	})
	.then(res=>res.json()) //promise wait...
	.then(data => {
		const tokenDTO = data.tokenDTO;
		if(!tokenDTO.loginResult){
			alert('아이디 또는 비밀번호가 일치하지 않습니다.');
			return;
		}
		if(tokenDTO.accessToken){
			
			const signCancelUri = '/main'
			
			window.location=signCancelUri;
			
		}else{
			window.location="https://testapi.openbanking.or.kr/oauth/2.0/authorize?"+
          "response_type=code&"+
          "client_id=220b7f4b-4382-4605-852c-ea7706539651&"+
          "redirect_uri="+window.location.host+"/main&"+
          "scope=login inquiry transfer&"+
          "state=68749843513579843513579321354988&"+		
          "auth_type=0";
		}
	})
	.catch(data=> console.log('fail', data));
	
}
