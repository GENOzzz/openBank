const objList =[
	{
		name : 'name1',
		age : 20,
	},
	{
		name : 'name2',
		age : 25,
	},
	{
		name : 'name1',
		age : 30,
	}
	];

const container = document.getElementById('test')

const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');

const ageSum = objList.reduce((acc,cur)=>{
	return acc + cur.age;
},0);



function test(){
	const testList = objList.reduce((acc,cur)=>{
		const nameCondition = nameInput.value
	          ? cur.name.includes(nameInput.value): true;
	   const ageCondition = ageInput.value
	          ? cur.age > ageInput.value : true;      
	    
	    if(nameCondition && ageCondition){
			acc.push(cur);
		}
		
		return acc;
	},[]);
	
	for(let idx in testList){
		container.innerText += idx + ': ';
		for(let key in testList[idx]){
		container.innerText += key + ': ';
		container.innerText += testList[idx][key];			
		}
		container.innerHTML += '<br>';
	}
	
	console.log('objList',objList);
}
