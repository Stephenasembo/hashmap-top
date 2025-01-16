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
    } else {
      let lastNode = this.findLastNode(this.array[hashCode]);
      lastNode.nextNode = newNode;
    }
  }
  findLastNode(node) {
    if (node.nextNode === null) {
      return node;
    }
    return this.findLastNode(node.nextNode);
  }
  has(key) {
    let hashCode = this.hash(key);
    if (this.array[hashCode]) {
      return this.findKey(key, this.array[hashCode]);
    }
    return false;
  }
  findKey(key, node) {
    if (node.key === key) {
      return true;
    }
    return this.findKey(key, node = node.nextNode);
  }
}

class Node {
  constructor (key, node = null) {
    this.key = key;
    this.nextNode = node;
  }
}

const test = new Hashmap();
test.set('student');
test.set('rama');
test.set('sita');
console.log(test.has('sita'));