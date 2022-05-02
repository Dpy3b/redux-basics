function* generatorFunction(){
	for (let i = 0; i < 3; i++) {
		yield i

	}
}

const iter = generatorFunction()

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());