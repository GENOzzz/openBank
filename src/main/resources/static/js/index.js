//엔터키로 검색 조회 실행
document.addEventListener("keyup",(e)=>{
	if(e.key === 'Enter'){
		signUp();		
	}
})

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
		
		const signCancelUri = '/main'			
		window.location=signCancelUri;
		
	})
	.catch(data=> console.log('fail', data));
	
}
