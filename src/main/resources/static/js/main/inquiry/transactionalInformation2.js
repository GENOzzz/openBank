const tranKeyList = {
	"tran_date" : "거래일",
	"tran_time" : "거래시각",
	"inout_type" : "입출금",
	"tran_type" : "거래내용",
	"print_content" : "통장인자내용",
	"tran_amt" : "거래금액",
	"after_balance_amt" : "거래후 잔액",
	"branch_name" : "거래점"
	};

let resListCnt =0; //거래 카운트

let pageNum = 0; //총 페이지 개수

let firstPage = 1;

let nowPageNum = 1;//현재 페이지

let transactionList;//거래 내역 리스트

const pageButtonContainer = document.createElement("div");
pageButtonContainer.setAttribute("id", "pageButtonContainer");

function transactionalInquiry(idx){
	const formData = new FormData();
	
	/*const inquiryType = document.getElementById('inquiryType');
	if(inquiryType != undefined){
		formData.append('inquiryType',inquiryType.value);
	}*/ //
	
	const fintechUseNum = document.getElementById(`fintechUseNum${idx}`);	
	formData.append('fintechUseNum',fintechUseNum.value);
	
	const bankTranId = document.getElementById('bank_tran_id');
	formData.append('bankTranId',bankTranId.value);
	
	const accessToken = document.getElementById('access_token');
	formData.append('accessToken',accessToken.value);
	
	const userSeqNo = document.getElementById('user_seq_no');
	formData.append('userSeqNo',userSeqNo.value); 
	
	/*formData.append('period',period);*/ //기간
	
	fetch("/inquiry/transactional",{
		method:'post',
		body:formData
	})
	.then(res=>res.json())
	.then(data=>{
		if(data.rsp_code!="A0000"){
			alert(`잔액조회 오류\n ${data.rsp_message}`);
			return;
		};
		
		console.log(data);
		
		transactionList = data.res_list;
		
		/*for(let key in data){
			console.log('key',key)
			console.log('value',data[key])
		}*/
		
		/**table title*/
		const tableTitle = document.getElementById('table_title');
		
		tableTitle.innerText = `${data.bank_name}`;
		
		const tableContainer = document.getElementById('tableContainer');
		
		if(tableContainer.hasChildNodes()){
			tableContainer.removeChild(tableContainer.firstChild);
		}
		/*if(tableContainer.firstElementChild){
			let tranTable = table.firstElementChild;
			tableContainer.removeChild(tranTable);
		}*/
		
		const tranTable = document.createElement('table');
		tranTable.classList='tran_table';
		tranTable.setAttribute('id', 'tran_table');
		
		/**table_base */
		const tranColGroup = document.createElement('colgroup');
		
		const tHead = document.createElement('thead');
		const headTr = document.createElement('tr');
		headTr.classList='tran_head_tr';
		
		for(let i in tranKeyList){
			
			const col = document.createElement('col');
			col.setAttribute('width','10%');
			tranColGroup.append(col);
			
			const th = document.createElement('th');
			th.classList='tran_head_th';
			th.setAttribute('scope','col');
			th.innerText=tranKeyList[i];
			headTr.append(th);
		};

		tHead.append(headTr);
		tranTable.append(tranColGroup);
		tranTable.append(tHead);
				
		resListCnt=data.page_record_cnt;
		
		const tBody = drawTableBody(transactionList,1);
		
		tranTable.append(tBody);
		
		tableContainer.append(tranTable);
		
	})
	.catch(data=>console.log('error',data));
}

/**table_body transactionlInformation */
function drawTableBody(list,page){
	
	const searchKeyword = {
		"branch_name" : document.getElementById('branch_name')?.value,
		"tran_type" : document.getElementById('tran_type')?.value,
		"print_content" : document.getElementById('print_content')?.value
	};
	
	const tBody = document.createElement('tbody');
	
	//let transactionalInformation = list;
	
	const transactionalInformation = list.reduce((acc,cur)=>{
		const branch_name_condition =  
		(searchKeyword.branch_name!=undefined && searchKeyword.branch_name!='') 
		? cur.branch_name.includes(searchKeyword.branch_name) : true;
		
		const tran_type_condition = 
		(searchKeyword.tran_type!=undefined && searchKeyword.tran_type!='') 
		? cur.tran_type.includes(searchKeyword.tran_type) : true;
		
		const print_content_condition = 
		(searchKeyword.print_content!=undefined && searchKeyword.print_content!='') 
		? cur.print_content.includes(searchKeyword.print_content) : true;
		
		if(branch_name_condition && tran_type_condition && print_content_condition){
			acc.push(cur);
		}
		return acc;
	},[])
				
	let startIdx = ((page-1)*18);
	 
	changeCnt(transactionalInformation.length);
	
	if(startIdx + 18 < resListCnt){
		for(let i = startIdx ; i < startIdx+18; i ++){
			const tr = document.createElement('tr');
			tr.classList='tran_body_tr';
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
			tr.classList='tran_body_tr';
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
			tr.classList='tran_body_tr';
			for(let j = 0; j<8 ; j++){
				const td = document.createElement('td');
				td.innerText='-'
				tr.append(td);				
			}
			tBody.append(tr);
		}
	}
	
	tBody.setAttribute('id','t_body');
	
	createPageButton(1,pageNum)
	
	return tBody;
}


/**page function */
function changePage(nowPage) {
	nowPageNum = nowPage;
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
function createPageButton(firstPage, lastPage) {
  const pageButtonContainer = document.getElementById("pageButtonContainer");
  
  while (pageButtonContainer.hasChildNodes()) {
    pageButtonContainer.removeChild(pageButtonContainer.firstChild);
  }
  
  for (let i = firstPage; i <= lastPage; i++) {
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
  nowPageNum = page;
  changePage(page);
}

function nextPage() {
  if (nowPageNum < pageNum) {
	  nowPageNum = nowPageNum + 1;
    changePage(nowPageNum);
  }
}

function prevPage() {
  if (nowPageNum > 1) {
	  nowPageNum = nowPageNum -1;
    changePage(nowPageNum);
  }
}

function changeCnt(cnt){
	resListCnt =cnt; //거래 카운트
	pageNum = parseInt(resListCnt/20); 
	const pageRemainder = resListCnt%20;
	
	if(pageRemainder != 0){
		pageNum = pageNum + 1;
	}; //총 페이지 개수
	
	const lastPageButton = document.getElementById('lastPageButton');
	if(lastPageButton!=null){
		lastPageButton.setAttribute('onclick', `goPage(${pageNum})`);		
	}
}

function cleanSearch(){
		const branch_name = document.getElementById('branch_name');
		const tran_type = document.getElementById('tran_type');
		const print_content = document.getElementById('print_content');
		
		branch_name.value='';
		tran_type.value = '';
		print_content.value = '';
}

function selectInOut(){
	console.log('selectInOut');
}
