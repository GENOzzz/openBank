function accountList(){
	const formData = new FormData(document.getElementById('mainForm'));
				
	console.log(formData)

	fetch("http://localhost:3000/account/list",{
		method:'post',
		body:formData
	})
	.then(res=>res.json())
	.then(data=>{
		if(data.rsp_code!="A0000"){
			alert(data.rsp_message);
		};
				
		/*for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}*/
		
		const accountList = data.res_list;

		const reftContainer = document.getElementById('left_container');
				
		for(let idx in accountList){
			const account = accountList[idx];
			//console.log(account);
			/**bank account dom */
			const div = document.createElement('div');
			div.classList=`w350 h115 mt${idx*150+100} brs1 br5 container_child`;
			
			/**form data*/
			/**fintech num */
			const fintechUseNum = document.createElement('input');
			fintechUseNum.setAttribute('id',`fintechUseNum${idx}`)
			fintechUseNum.setAttribute('type','hidden');
			fintechUseNum.setAttribute('value',account.fintech_use_num);
			div.appendChild(fintechUseNum);
			
			/**bank name & name */
			const nameContainer = document.createElement('div');
			nameContainer.classList='ml5 mt5 mr5 brs1';
			nameContainer.setAttribute('style','display:flex; justify-content:space-between');
			
			/**bank name */
			const bankNameDiv=document.createElement('div');
			bankNameDiv.classList=`w100 h30 tac`;
			bankNameDiv.setAttribute('style','font-size:15px, padding:auto;');
			bankNameDiv.innerText=account.bank_name;
			nameContainer.appendChild(bankNameDiv);
			
			/**name */
			const nameDiv=document.createElement('div');
			nameDiv.classList='w100 h30 tac';
			nameDiv.setAttribute('style','font-size:15px, padding:auto;');
			nameDiv.innerText=account.account_holder_name
			nameContainer.appendChild(nameDiv);
			div.appendChild(nameContainer);
			
			/**bank account num dom*/
			const accountNum = document.createElement('div')
			accountNum.classList='h30 ml5 mt5 mr5 brs1 lh30';
			accountNum.innerText = account.account_num_masked;
			div.appendChild(accountNum);
			
			/**button dom */
			const buttonDom = document.createElement('div')
			buttonDom.classList='h30 ml5 mt5 mr5 brs1 lh30';
			buttonDom.setAttribute('style','justify-content:space-around; display:flex');
			
			const balanceInquiryButton = document.createElement('button');
			balanceInquiryButton.innerText='잔액 조회';
			balanceInquiryButton.setAttribute('onclick',`balanceInquiry(${idx})`)
			buttonDom.appendChild(balanceInquiryButton);
			
			const transactionalInquiryButton = document.createElement('button');
			transactionalInquiryButton.innerText='거래 내역 조회';
			buttonDom.appendChild(transactionalInquiryButton);
			
			const accountCancelButton = document.createElement('button');
			accountCancelButton.innerText='계좌 해지';
			accountCancelButton.setAttribute('onclick',`accountCancel(${idx})`);
			buttonDom.appendChild(accountCancelButton);
			
			const test2InquiryButton = document.createElement('button');
			test2InquiryButton.innerText='test';
			buttonDom.appendChild(test2InquiryButton);
			
			div.appendChild(buttonDom);
			
			reftContainer.appendChild(div);
			
			/**bank  */
		}		
	})
	.catch(data=>console.log('error',data));
}