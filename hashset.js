class Hashmap {
  constructor() {
    this.loadFactor = null;
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
  set(key) {
    let hashCode = this.hash(key);
    let newNode = new Node(key);
    // Check if spot is filled
    if (!this.array[hashCode]) {
      this.array[hashCode] = newNode;
    }
  }
}

class Node {
  constructor (key, node = null) {
    this.key = key;
    this.nextNode = node;
  }
}

const test = new Hashmap();
test.set('student', 'Stephen');
console.log(test);