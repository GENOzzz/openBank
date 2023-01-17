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

	fetch("http://localhost:3000/login/do",{
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
			
			const signCancelUri = 'http://localhost:3000/main'
			
			window.location=signCancelUri;
			
		}else{
			window.location="https://testapi.openbanking.or.kr/oauth/2.0/authorize?"+
          "response_type=code&"+
          "client_id=d91f8584-0a52-41a9-97a9-0488e3cefeeb&"+
          "redirect_uri=http://localhost:3000/main&"+
          "scope=login inquiry transfer&"+
          "state=12345678901234567890123456789012&"+
          "auth_type=0";			
		}
	})
	.catch(data=> console.log('fail', data))
	
}
