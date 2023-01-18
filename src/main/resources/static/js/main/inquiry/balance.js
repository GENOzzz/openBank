function balanceInquiry(idx){
	const formData = new FormData();
	
	const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);	
	formData.append('fintechUseNum',fintechUseNum.value);
	
	const bankTranId = document.getElementById('bank_tran_id');
	formData.append('bankTranId',bankTranId.value);
	
	const accessToken = document.getElementById('access_token');
	formData.append('accessToken',accessToken.value);
	
	const userSeqNo = document.getElementById('user_seq_no');
	formData.append('userSeqNo',userSeqNo.value);
	
	fetch("http://localhost:3000/inquiry/balance",{
		method:'post',
		body:formData
	})
	.then(res=>res.json())
	.then(data=>{
		if(data.rsp_code!="A0000"){
			alert(data.rsp_message);
			return;
		};
		
		console.log(data);
		
		
		/*for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}*/
		
		/**table */
		const table = document.getElementById('table');

		if(table.firstElementChild){
			let baseContainer = table.firstElementChild;
			table.removeChild(baseContainer);
		}
		
		/**base container */
		const baseContainer = document.createElement('div');
		baseContainer.classList="w1000 h500 brs1 br5";
		baseContainer.setAttribute('id','baseContainer')
		
		/**bank name */
		const bankName = document.createElement('div');
		bankName.classList='w400 h30 brs1 br5 mt10 ml10';
		bankName.innerText = `${data.bank_name} (${data.product_name})`;
		baseContainer.append(bankName);
		
		/**balance_amt 잔액*/
		const balanceAmt = document.createElement('div');
		balanceAmt.classList='w400 h30 brs1 br5 mt5 ml10';
		
		/**change money */
		const changeBalance = chaingeWon(data.balance_amt);
		const koreanBalanceMoney = numberToKorean(data.balance_amt);
		balanceAmt.innerText=`잔액 :  ₩ ${changeBalance} (${koreanBalanceMoney}원)`;
		baseContainer.append(balanceAmt);
		
		/**available_amt 출금 가능 금액*/
		const availableAmt = document.createElement('div');
		availableAmt.classList='w400 h30 brs1 br5 mt5 ml10';
		
		/**change money */
		const changeAvailable = chaingeWon(data.available_amt);
		const koreanMoney = numberToKorean(data.available_amt);
		availableAmt.innerText=`출금 가능 금액 :  ₩ ${changeAvailable} (${koreanMoney}원)`;
		baseContainer.append(availableAmt);
				
		console.log(table);
		
		
		
		table.append(baseContainer);
		
		
		
		})
	.catch(data=>console.log('error',data));
}