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
	fetch("/test/test",{
			method:'POST',
		})
		.then(res => res.json())
		.then(data =>{
			console.log('success',data)
			nameInput.value = data.test
			ageInput.value = data.test2			
		})
		.catch(data => console.log('fail',data));
}
