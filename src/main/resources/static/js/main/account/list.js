
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
				
		(async ()=>{
		 for(let idx in accountList){
			const account = accountList[idx];
			
			/**base container */
			const baseContiner = document.createElement('div');
			baseContiner.classList=`w350 h150 mt${idx*200+100} br5 container_child base_container`;
			
			/**bank account Container */
			const accountContainer = document.createElement('div');
			accountContainer.classList=`h140 mt5 ml5 mr5 mt5 br5 account_container`;
			
			/**form data*/
			/**fintech num */
			const fintechUseNum = document.createElement('input');
			fintechUseNum.setAttribute('id',`fintechUseNum${idx}`);
			fintechUseNum.setAttribute('type','hidden');
			fintechUseNum.setAttribute('value',account.fintech_use_num);
			accountContainer.appendChild(fintechUseNum);
			
			/**bank name & name */
			const nameContainer = document.createElement('div');
			nameContainer.classList='ml5 mr5';
			nameContainer.setAttribute('style','display:flex; justify-content:space-between');
			
			/**bank name */
			const bankNameDiv=document.createElement('div');
			bankNameDiv.classList=`w150 h30 tac fts15`;
			bankNameDiv.setAttribute('style','padding:auto;');
			bankNameDiv.innerText=account.bank_name;
			nameContainer.appendChild(bankNameDiv);
			
			/**name */
			const nameDiv=document.createElement('div');
			nameDiv.classList='w100 h30 tac fts12';
			nameDiv.setAttribute('style','padding:auto;');
			nameDiv.innerText=account.account_holder_name
			nameContainer.appendChild(nameDiv);
			accountContainer.appendChild(nameContainer);
			
			/**bank account num Container*/
			const accountNumContainer = document.createElement('div')
			accountNumContainer.classList='h30 ml5 mt5 mr5 lh30 fts15';
			accountNumContainer.innerText = account.account_num_masked;
			accountContainer.appendChild(accountNumContainer);
			
			/**bank balance Container */
			const balanceContainer = document.createElement('div');
			balanceContainer.classList='h30 mt5 ml5 mr5 lh30 fts15';
			balanceContainer.setAttribute('id',`balance${idx}`);
			
			balanceContainer.addEventListener('DOMContentLoaded',balanceInquiry2(account.fintech_use_num, idx)) ;
			
			accountContainer.appendChild(balanceContainer);
		
			/**button Container */
			const buttonContainer = document.createElement('div')
			buttonContainer.classList='h30 ml5 mt5 mr5 mb5 lh30';
			buttonContainer.setAttribute('style','justify-content:space-around; display:flex');
			
			/*const balanceInquiryButton = document.createElement('button');
			balanceInquiryButton.innerText='잔액 조회';
			balanceInquiryButton.setAttribute('onclick',`balanceInquiry(${idx})`)
			buttonContainer.appendChild(balanceInquiryButton);*/
			
			const transactionalInquiryButton = document.createElement('button');
			transactionalInquiryButton.classList='action_button';
			transactionalInquiryButton.innerText='거래 내역 조회';
			transactionalInquiryButton.setAttribute('onclick',`transactionalInquiry(${idx}, 'all')`);
			buttonContainer.appendChild(transactionalInquiryButton);
			
			const accountCancelButton = document.createElement('button');
			accountCancelButton.classList='action_button';
			accountCancelButton.innerText='계좌 해지';
			accountCancelButton.setAttribute('onclick',`accountCancel(${idx})`);
			buttonContainer.appendChild(accountCancelButton);
			
			const test2InquiryButton = document.createElement('button');
			test2InquiryButton.classList='action_button';
			test2InquiryButton.innerText='test';
			buttonContainer.appendChild(test2InquiryButton);
			
			accountContainer.appendChild(buttonContainer);
			
			baseContiner.append(accountContainer);
			
			reftContainer.appendChild(baseContiner);
			await sleep(20);
			}
		})();
	})
	.then(()=>{
	})
	.catch(data=>console.log('error',data));
}

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec));
}