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
    let newNode = Node(key, value);
    // Check if the spot is occupied
    if (!this.array[hashCode]) {
      let head = null;
      head = newNode;
      this.array[hashCode] = head;
    } else {
      // Compare keys and overwrite value if they are equal
      if (this.array[hashCode].key === key) {
        this.array[hashCode].value = value;
      } else {
        // Append the new value as a linked list in an array
        let lastNode = this.findLastNode(this.array[hashCode]);
        if (lastNode === null) {
          lastNode = newNode;
        } else {
          lastNode.nextNode = newNode;
        }
      }
    }
  }
  findLastNode(node) {
    if (node === null) {
      return node;
    }
    if (node.nextNode === null) {
      return node;
    }
    this.findLastNode(node.nextNode);
  }
}

function Node(key, value, node = null) {
  return {
    key: key,
    value: value,
    nextNode: node,
  }
}
const test = new Hashmap();
test.set('rama', 'mark');
test.set('sita', 'stephen')
console.log(test.array);