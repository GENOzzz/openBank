function balanceInquiry2(fintechUseNum, idx){
	const formData = new FormData();
	
	//const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);
	formData.append('fintechUseNum',fintechUseNum);
	
	const bankTranId = document.getElementById('bank_tran_id');
	formData.append('bankTranId',bankTranId.value);
	
	const accessToken = document.getElementById('access_token');
	formData.append('accessToken',accessToken.value);
	
	const userSeqNo = document.getElementById('user_seq_no');
	formData.append('userSeqNo',userSeqNo.value);
	
	fetch("/inquiry/balance",{
		method:'post',
		body:formData
	})
	.then(res=>res.json())
	.then(data=>{
		if(data.rsp_code!="A0000"){
			alert(`${data.rsp_message}`);
			return;
		};
		
		
		/*for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}*/
		
		/**balance container */
		const balanceContainer = document.getElementById(`balance${idx}`);
						
		/**change money */
		const changeBalance = chaingeWon(data.balance_amt);
		const koreanBalanceMoney = numberToKorean(data.balance_amt);
		balanceContainer.innerText=` ₩ ${changeBalance} (${koreanBalanceMoney}원)`;
		})
	.catch(data=>console.log('error',data));
}