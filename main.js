class Hashmap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.array = [];
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    let hashCode = this.hash(key);
    this.array[hashCode] = [key, value];
  }
}

const test = new Hashmap();
test.set('hello', 'mark');
test.set('bye', 'stephen')
test.set('fruit', 'banana')
console.log(test.array);