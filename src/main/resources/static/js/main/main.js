const code = document.getElementById('code');
const access_token = document.getElementById('access_token');
const refresh_token = document.getElementById('refresh_token');
const user_seq_no = document.getElementById('user_seq_no');
const token_type = document.getElementById('token_type');
const expires_in = document.getElementById('expires_in');
const scope = document.getElementById('scope');
const loginId = document.getElementById('login_id');
const clientId = document.getElementById('client_id');
const tokenUpdateDate = document.getElementById('token_update_date');

window.addEventListener('DOMContentLoaded',function(){
	
	if(!loginId){
		alert('로그인이 필요합니다.')
		window.location="/";
	}
	
	//let transactionalInformation = list;

	if(code.value){
		
		const codeData = new FormData();
		codeData.append('code',code.value);
		
	    fetch("/token/issue",{
			method:'POST',
			body:codeData
		})
		.then(res => res.json())
		.then(data => {
			console.log('sucess : /token/issue',data);
			
			if(data.rsp_code){
				if(data.rsp_code != 'O0000'){
					alert(data.rsp_message);
					return;
				}				
			}
			
			if(!access_token.value){
				setData(data);			
				const formData = new FormData(document.getElementById('mainForm'));				
				fetch("/token/access",{
					method:'POST',
					cache:'no-cache',
					body:formData
				})
				.then(res=>res.json())
				.then(data=>{
					if(data == false){
						alert('wrong data...');
						return;
					}
					alert('계좌 등록이 완료 되었습니다.\n 다시 로그인 하여주십시오.')
					window.location="/";
					})
				.catch(data=>console.log('fail : /token/access',data))
			}else{
				setData(data);			
				const formData = new FormData(document.getElementById('mainForm'));
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
				.catch(data=>console.log('fail : /token/update',data))
			}
		})
		.catch(data => console.log('fail : /token/issue',data));
	}
	
	if(access_token.value){
		accountList()
	};
	
	if(tokenUpdateDate.value!= null && tokenUpdateDate.value != '') {
		const today = new Date();
		const tokenRestOfDate = new Date(tokenUpdateDate.value);
		const diffMSec = today.getTime() - tokenRestOfDate.getTime();
		const diffDate = diffMSec / (24 * 60 * 60 * 1000);
		const alarm = 90-Math.floor(diffDate);
		console.log(alarm);
		if(alarm<8){
			alert(`토큰의 유효기간이 ${alarm}일 남았습니다.\n 기간 연장을 클릭하여 주십시오.`);
		}
	}
	
		
});

function logout(){
	window.location="/login/logout"	;
}

function accountAdd(){
		
	if(confirm('계좌등록을 진행하시겠습니까?')){
		window.location="https://testapi.openbanking.or.kr/oauth/2.0/authorize?"+
	          "response_type=code&"+
	          "client_id="+ clientId.value +"&"+
	          "redirect_uri=http://"+window.location.host+"/main&"+
	          "scope=login inquiry&"+
	          "state=68749843513579843513579321354988&"+	
	          "auth_type=0";
	}
	
}

function setData(data){
	access_token.value = data.access_token;
	refresh_token.value = data.refresh_token;
	user_seq_no.value=data.user_seq_no;
	token_type.value = data.token_type;
	expires_in.value = data.expires_in;
	scope.value = data.scope;
}

function extensionOfPeriod(){
	if(confirm('조회 권한 유효기간을 연장 하시겠습니까?\n약 3분가량 소요됩니다.')){
		LoadingWithMask();
		
		fetch('/token/extension',{
			method:'post',
		})
		.then(res=>res.json())
		.then(data=>{
			console.log('succcess : /token/extension', data)
			
			if(data.rsp_code){
				if(data.rsp_code != 'O0000'){
					alert(data.rsp_message);
					closeLoadingWithMask();
					return;
				}				
			}
			
			const formData = new FormData();
			formData.append('accessToken',data.access_token);
			formData.append('refreshToken',data.refresh_token);
			formData.append('expiresIn',data.expires_in);
			formData.append('scope',data.scope);
			formData.append('userSeqNo',data.user_seq_no);
			
			fetch('/token/update',{
					method:'post',
					cache:'no-cache',
					body:formData
			})
			.then(res=>res.json())
			.then(data=>{
				if(data == false){
				alert('/update : wrong');
			}
			closeLoadingWithMask();
			alert('갱신이 완료되었습니다.\n 다시 로그인 하여주십시오.')
			window.location="/";
			})
			.catch(data=> console.log('error : extension => update',data))
		})
		.catch(data=>console.log('error : /token/extension', data))
	}
}

function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;
     
    //화면에 출력할 마스크를 설정해줍니다.
    var mask       = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'>"
    mask += "<div class='loading-container'>";
    mask += 	"<div class='loading'></div>";
    mask += 	"<div id='loading-text'>loading</div>"
    mask += "</div>";  
    mask +="</div>";
     
    //화면에 레이어 추가
    $('body')
        .append(mask)
        
        
    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
            'width' : maskWidth
            , 'height': maskHeight
            , 'opacity' : '0.3'
            , 'display' : 'flex'
            , 'justify-content' : 'center'
            , 'align-items': 'center'
    }); 
  
    //마스크 표시
    $('#mask').show();
 
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();  
}