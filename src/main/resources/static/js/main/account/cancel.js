function accountCancel(idx){
	if(confirm('계좌 해지를 진행하시겠습니까?')){
		
			const formData = new FormData();
			
			const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);	
			formData.append('fintechUseNum',fintechUseNum.value);
			
			const bankTranId = document.getElementById('bank_tran_id');
			formData.append('bankTranId',bankTranId.value);
			
			const accessToken = document.getElementById('access_token');
			formData.append('accessToken',accessToken.value);
			
			const userSeqNo = document.getElementById('user_seq_no');
			formData.append('userSeqNo',userSeqNo.value);
						
			//console.log(formData)
		
			fetch("/account/cancel",{
				method:'post',
				body:formData
			})
			.then(res=>res.json())
			.then(data=>{
				console.log(data);
				
				if(data.rsp_code!="A0000"){
					alert(data.rsp_message);
				}else{
					alert('계좌해지에 성공 하였습니다.');
					location.reload();
				};
						
				for(let key in data){
					console.log('key',key)
					console.log('value',data[key])
				}

			})
			.catch(data=>console.log('error',data));
	}
}