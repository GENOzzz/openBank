function excelDownload(json){
	const option = document.getElementById('excelOption');
		// step 1. workbook 생성
	  let wb = XLSX.utils.book_new();
	
	  // step 2. 시트 만들기 
	  let newWorksheet;
	  if(option.value === 'table'){
		  newWorksheet = excelHandler.getWorksheet();		  
	  }else{
		  const tranKeyList = {
					"tran_date" : "거래일",
					"tran_time" : "거래시각",
					"inout_type" : "입출금",
					"tran_type" : "거래내용",
					"print_content" : "통장인자내용",
					"tran_amt" : "거래금액",
					"after_balance_amt" : "거래후 잔액",
					"branch_name" : "거래점"};
			
			for(let key in tranKeyList){
				json.forEach(e=>{
					renameKey(e,key,tranKeyList[key]);
				});
			}
		  newWorksheet = excelHandler.getJsonWorkSheet(json);
	  }
		
		
		const lastIdx=json.length -1;
		const first = json[0].거래일;
		const last = json[lastIdx].거래일;
		
		const title = `${first} ~ ${last} 거래내역`; 
		
	  // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
	  XLSX.utils.book_append_sheet(wb, newWorksheet, title);
	
	  // step 4. 엑셀 파일 만들기 
	  let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
	
	  // step 5. 엑셀 파일 내보내기 
	  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),title+`.xlsx`);
	
}

let excelHandler = {	
    getExcelData : function(){
        return document.getElementById('tran_table'); 	//TABLE id
    },
    getJsonWorkSheet : function(json){
		return XLSX.utils.json_to_sheet(json);
	},
    getWorksheet : function(){
        return XLSX.utils.table_to_sheet(this.getExcelData());
    }
}

function s2ab(s) { 
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf);  //create uint8array as viewer
  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
  return buf;
}

function renameKey ( obj, oldKey, newKey ) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
};

function noData(){
	alert('거래내역 조회를 먼저 하여 주십시오');
	return;
}