
// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать – массив значений одного из полей (отсортированных в порядке возрастания):

function getFieldValues(array, str)
{
	var Mass = [];
	for (let i=0; i< array.length; i++) 
		{ Mass[i]=array[i][str]; }
	return Mass.sort();
}

let usersData = [
{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
{ 'user' : 'Sasha', 'password' : 'MyNAmeIsSasha' }, //добавляем чтобы проверить правильность сортировки
{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' } 
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob', 'Sasha']

// 2) Написать функцию, фильтрующую массив с использованием предиката:

function isEven(x) 
{
	return x % 2 == 0;
}

function filter(array, func)
{
    return array.filter(func);
}

let numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках

function findSimilarWords(strl,str2)
{
	let arr1 = strl.split(' ');
	let arr2 = str2.split(' ');
	let FinalArray = [];
	for (let i=0; i < arr1.length; i++) 
	{
		if (arr2.includes(arr1[i])){
			if (FinalArray.includes(arr1[i]) == false)
			{
				FinalArray.push(arr1[i]);
			}
		}
	}
	return FinalArray;
}

var firstLongString = 'Load up on guns and bring your friends it is fun to lose and to pretend';
var secondLongString = 'She is over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and', 'is'];

// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:
function generateBroadcastAndNetworsAddresses(ip, mask)
{
	let ipArr = ip.split('.');
	let NetAddress = new Array;
	let Broadcast = new Array;
	if (ipArr.length!=4) {return false;}    // 4 ли октета
	for(let i=0; i<4; i++) {if (parseInt(ipArr[i])>255) {return false;}} // В каждом октете число < 255
	if (mask>32){return false;} // Маска не более 32
	var maskArr = cidrToNetMask(mask)[0];
	var inverseMask = cidrToNetMask(mask)[1];
	
	for (i = 0; i < 4; i += 1)
	//Побитовое И между маской и данным IP-адресом
	{
	NetAddress[i] = parseInt(ipArr[i]) & maskArr[i];        
	}
	//Побитовое ИЛИ между адресом сети и инверсированной маской.
	for (i = 0; i < 4; i += 1)
	{
	Broadcast[i] = NetAddress[i] | inverseMask[i];                  
	}
	
	var broadcastOut = Broadcast.join('.');
	var netAddressOut = NetAddress.join('.');
	return "Broadcast - " + broadcastOut + ", Network - " + netAddressOut;
} 

 function cidrToNetMask(num)
{
	let maskBinArr = [];
	let maskArr = [];
	let oct = 8;
	let inverse = [];
	let maskInv = [];
	//Маска
	for (i = 0; i < 32; i++)
		{
		if (num > 0){maskBinArr.push(1);}
		else{ maskBinArr.push(0);}          
		num --; 
		}
	//Инверсированная маска
	for (i = 0; i < 32; i++) 
		{
		if(maskBinArr[i] == 0){inverse[i]=1;} 
		else {inverse[i]=0;}                
		}

	for (i=0; i<32; i+=oct) 
		{
		maskArr.push(parseInt(maskBinArr.slice(i,i+oct).join(''), 2));
		maskInv.push(parseInt(inverse.slice(i,i+oct).join(''), 2));
		}

	return [maskArr, maskInv];
}
                   
var IpAddress = '10.223.98.2';
var subnetMask = 28;   
console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask));

// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):

function makeItClean(x)
	{
	let Array = [];
	for (let i=0; i < x.length; i++)
	{
		if (Array.includes(x[i]) == false)
		{
			Array = Array.concat(x[i]);
		}
		Array = Array.filter(function(it, op)
		{
		return Array.indexOf(it)==op;
		});
	}
	return Array;
}

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];
console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, '1', undefined, true];