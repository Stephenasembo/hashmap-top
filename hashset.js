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
}

class Node {
  constructor (key, node = null) {
    this.key = key;
    this.node = node;
  }
}