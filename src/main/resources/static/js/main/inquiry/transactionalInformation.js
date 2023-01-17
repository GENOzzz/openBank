function transactionalInquiry(idx){
	const formData = new FormData();
	
	const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);	
	formData.append('fintechUseNum',fintechUseNum.value);
	
	const bankTranId = document.getElementById('bank_tran_id');
	formData.append('bankTranId',bankTranId.value);
	
	const accessToken = document.getElementById('access_token');
	formData.append('accessToken',accessToken.value);
	
	const userSeqNo = document.getElementById('user_seq_no');
	formData.append('userSeqNo',userSeqNo.value);
	
	fetch("http://localhost:3000/inquiry/transactional",{
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
		
		console.log('start')
		
		for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}
		
		console.log('end')
		
		/**table */
		const table = document.getElementById('table');

		if(table.firstElementChild){
			let amtContainer = table.firstElementChild;
			table.removeChild(amtContainer);
		}
		
		const transactionalContainer = document.createElement('div');
		transactionalContainer.classList="w1000 h800 brs1 br5";
		transactionalContainer.setAttribute('id','transactionalContainer')
		
		table.append(transactionalContainer);
		
		
		
		})
	.catch(data=>console.log('error',data));
}