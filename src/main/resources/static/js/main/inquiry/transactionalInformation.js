const tranKeyList = {
	"tran_date" : "거래일",
	"tran_time" : "거래시각",
	"inout_type" : "입출금",
	"tran_type" : "거래내용",
	"print_content" : "통장인자내용",
	"tran_amt" : "거래금액",
	"after_balance_amt" : "거래후 잔액",
	"branch_name" : "거래점"};

let resListCnt =0; //거래 카운트

let pageNum = 0; //총 페이지 개수

let firstPage = 1;

let nowPageNum = 1;//현재 페이지

let transactionList;//거래 내역 리스트

const pageButtonContainer = document.createElement("div");
pageButtonContainer.setAttribute("id", "pageButtonContainer");

function transactionalInquiry(idx, period){
	const formData = new FormData();
	
	const inquiryType = document.getElementById('inquiryType');
	if(inquiryType != undefined){
		formData.append('inquiryType',inquiryType.value);
	}
	
	const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);	
	formData.append('fintechUseNum',fintechUseNum.value);
	
	const bankTranId = document.getElementById('bank_tran_id');
	formData.append('bankTranId',bankTranId.value);
	
	const accessToken = document.getElementById('access_token');
	formData.append('accessToken',accessToken.value);
	
	const userSeqNo = document.getElementById('user_seq_no');
	formData.append('userSeqNo',userSeqNo.value); 
	
	formData.append('period',period);
	
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
		
		/*for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}*/
		
		/**table */
		const table = document.getElementById('table');
		
		const tableTitle = document.getElementById('table_title');
		
		tableTitle.innerText = `${data.bank_name}`;

		if(table.firstElementChild){
			let baseContainer = table.firstElementChild;
			table.removeChild(baseContainer);
		}
		
		/**base Container */
		const baseContainer = document.createElement('div');
		baseContainer.classList="w1000 h800 br5 ";
		baseContainer.setAttribute('id','baseContainer');
		
		/**button Container*/
		const buttonContainer = document.createElement('div');
		buttonContainer.classList='w100p h50 lh50 mt5';
		
		const inOutSelect = document.createElement('select');
		inOutSelect.setAttribute('name','inquiryType');
		inOutSelect.setAttribute('id','inquiryType');
		inOutSelect.classList='ml10 select_box';
		
		const inquiryTypeOption = {
			'A' : '전체',
			'I' : '입급',
			'O' : '출금'
		};
		
		for(let key in inquiryTypeOption){
			const option = document.createElement('option');
			option.text = inquiryTypeOption[key];
			option.value = key;
			inOutSelect.options.add(option);
		}
		
		buttonContainer.append(inOutSelect);
		
		const buttonList={
			'7': "1주일",
			'30':"1개월",
			'90': "3개월",
			'180': "6개월",
			'all' : "전체"};
		
		for(let key in buttonList){
			const button = document.createElement('button');
			button.classList='ml10 mt1 term_button';
			button.innerText=buttonList[key];
			button.setAttribute('onclick',`transactionalInquiry(${idx},'${key}')`);
			buttonContainer.append(button);						
		}
				
		const excelTypeOption = {
			'all' : '전체',
			'table' : '화면'
		};
		
		const excelSelect = document.createElement('select');
		excelSelect.setAttribute('name','excelType');
		excelSelect.setAttribute('id','excelOption');
		excelSelect.classList='ml550 select_box';
		for(let key in excelTypeOption){
			const option = document.createElement('option');
			option.text = excelTypeOption[key];
			option.value = key;
			excelSelect.options.add(option);
		};
				
		buttonContainer.append(excelSelect);
		
		transactionList = data.res_list;
		
		const json = JSON.stringify(transactionList);		
		
		const excelButton = document.createElement('button');
		excelButton.classList='ml10 mt1 excel_button';
		excelButton.innerText='Excel';
		excelButton.setAttribute('onclick',`excelDownload(${json})`);
		buttonContainer.append(excelButton);
						
		baseContainer.append(buttonContainer);
		
		/**tran_table Container */
		const tableContainer = document.createElement('div');
		tableContainer.classList='w100p h640 mt5 ';
		tableContainer.setAttribute('style','display:flex; justify-content: center;')
		
		const tranTable = document.createElement('table');
		tranTable.classList='tran_table';
		tranTable.setAttribute('id', 'tran_table');
		
		/**table_base */
		const colGroup = document.createElement('colgroup');
		
		const tHead = document.createElement('thead');
		const headTr = document.createElement('tr');
		headTr.classList='head_tr';
		
		for(let i in tranKeyList){
			
			const col = document.createElement('col');
			col.setAttribute('width','10%');
			colGroup.append(col);
			
			const th = document.createElement('th');
			th.classList='head_th';
			th.setAttribute('scope','col');
			th.innerText=tranKeyList[i];
			headTr.append(th);
		};

		tHead.append(headTr);
		tranTable.append(colGroup);
		tranTable.append(tHead);
				
		resListCnt=data.page_record_cnt;
		
		const tBody = drawTableBody(transactionList,1);
		
		tranTable.append(tBody);
		
		tableContainer.append(tranTable)
		
		baseContainer.append(tableContainer);
		
		/**page Container */
		const pageContainer = document.createElement('div');
		pageContainer.classList='w100p h90 mt5';
		pageContainer.setAttribute('style','display:flex; justify-content: center; align-items: center;')
		
		pageNum = parseInt(resListCnt/20); 
		const pageRemainder = resListCnt%20;
		
		if(pageRemainder != 0){
			pageNum = pageNum + 1;
		};
		
		const pageMoveButtonList = ["<<", "<", "pageButtonContainer", ">", ">>"];
		pageMoveButtonList.forEach((e) => {
	    if (e === "pageButtonContainer") {
	      pageContainer.append(pageButtonContainer);
	    } else {
	      const button = document.createElement("button");
	      button.innerText = e;
	      button.classList="page_move_button";
	      switch (e) {
	        case "<<":
	          button.setAttribute("onclick", `goPage(${1})`);
	          break;
	        case ">>":
	          button.setAttribute("onclick", `goPage(${pageNum})`);
	          break;
	        case "<":
	          button.setAttribute("onclick", `prevPage()`);
	          break;
	        case ">":
	          button.setAttribute("onclick", `nextPage()`);
	          break;
	      }
	      pageContainer.append(button);
	    }
	  });
				
		baseContainer.append(pageContainer);
		
		table.append(baseContainer);
		
		})
	.then(()=>{
		if(pageNum >= 5){
	  		createPageButton(1, 5);		  
	  	}else{
			createPageButton(1,pageNum);
	  	}
	  })
	.catch(data=>console.log('error',data));
}

/**table_body transactionlInformation */
function drawTableBody(list,page){
	const tBody = document.createElement('tbody');
	
	const transactionalInformation = list;
	
	let startIdx = ((page-1)*18)+1;
	
	if(startIdx + 18 < resListCnt){
		for(let i = startIdx ; i < startIdx+18; i ++){
			const tr = document.createElement('tr');
			tr.classList='body_tr';
			for(let key in tranKeyList){
				const td = document.createElement('td');
				if(key === 'tran_date'){
					td.classList='date'
				};
				td.innerText=transactionalInformation[i][key];
				tr.append(td)
			}
			tBody.append(tr);	
		}		
	}else{
		for(let i = startIdx ; i < resListCnt; i ++){
			const tr = document.createElement('tr');
			tr.classList='body_tr';
			for(let key in tranKeyList){
				const td = document.createElement('td');
				if(key === 'tran_date'){
					td.classList='date'
				};
				td.innerText=transactionalInformation[i][key];
				tr.append(td)
			}
			tBody.append(tr);
		}
		for(let i=0; i < 18-(resListCnt-startIdx); i++){
			const tr = document.createElement('tr');
			tr.classList='body_tr';
			for(let j = 0; j<8 ; j++){
				const td = document.createElement('td');
				td.innerText='-'
				tr.append(td);				
			}
			tBody.append(tr);
		}
	}
	
	tBody.setAttribute('id','t_body');
	
	return tBody;
}


/**page function */
function changePage(nowPage) {
	const tranTable = document.getElementById('tran_table');
	const oldBody = document.getElementById('t_body');
	tranTable.removeChild(oldBody);
	
	const tBody =  drawTableBody(transactionList,nowPage);
	tranTable.append(tBody);

  if (nowPage > 3) {
    if (nowPage + 2 <= pageNum) {
      createPageButton(nowPage - 2, nowPage + 2);
    } else {
      createPageButton(pageNum - 4, pageNum);
    }
  } else {
	  if(pageNum>5){
	    createPageButton(1, 5);		  
	  }else{
		  createPageButton(1,pageNum);
	  }
  }
}

/**pageButton */
function createPageButton(firstIdx, lastIdx) {
	  
  const pageButtonContainer = document.getElementById("pageButtonContainer");
  
  while (pageButtonContainer.hasChildNodes()) {
    pageButtonContainer.removeChild(pageButtonContainer.firstChild);
  }
  
  for (let i = firstIdx; i <= lastIdx; i++) {
    const button = document.createElement("button");
    button.classList='page_move_button';
    button.innerText = i;
    button.setAttribute("onclick", `changePage(${i})`);
    const pageButtonContainer = document.getElementById("pageButtonContainer");
    pageButtonContainer.append(button);
  }
}


/**move page */
function goPage(page) {
  changePage(page);
}

function nextPage() {
  if (nowPageNum < pageNum) {
    changePage(nowPageNum + 1);
  }
}

function prevPage() {
  if (nowPageNum > 1) {
    changePage(nowPageNum - 1);
  }
}
