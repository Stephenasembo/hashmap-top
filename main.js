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
    this.loadFactor = this.length()/this.capacity;
    if (this.loadFactor > 0.75) {
      this.capacity = this.capacity * 2;
      this.loadFactor = this.length()/this.capacity;
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
  get(key) {
    let hashCode = this.hash(key);
    if (this.array[hashCode]) {
      let foundNode = this.find(this.array[hashCode], key);
      if (foundNode) {
        return foundNode.value;
      }
      return null;
    }
    return null;
  }
  // Traverse the linked list looking for a key match
  find(node, key) {
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    return this.find(node.nextNode, key)
  }
  has(key) {
    let hashCode = this.hash(key);
    if(this.array[hashCode]) {
      let foundNode = this.find(this.array[hashCode], key);
      if (foundNode) {
        return true;
      }
      return false;
    }
    return false;
  }
  remove(key) {
    let hashCode = this.hash(key);
    if(this.array[hashCode]) {
      let foundNode = this.find(this.array[hashCode], key);
      if (foundNode) {
        let prev = this.findPrev(this.array[hashCode], foundNode);
        if (prev) {
          prev.nextNode = foundNode.nextNode;
          return true;
        }
        this.array[hashCode] = foundNode.nextNode;
        return true;
      }
      return false;
    }
    return false;
  }
  findPrev(node, next) {
    // If the previous node is the head of the list
    if (node === next) {
      return null;
    }
    if (node.nextNode === next) {
      return node;
    }
    return this.findPrev(node.nextNode)
  }
  findFilledSpots() {
    let filledSpots = [];
    for (let i = 0; i < this.capacity; i += 1) {
      if (this.array[i] !== null && this.array[i] !== undefined) {
        filledSpots.push(i);
      }
    }
    return filledSpots;
  }
  length() {
    let filledSpots = this.findFilledSpots();
    let totalNodes = 0;
    // Iterate through each filled spot of the array
    for (let spot of filledSpots) {
      let head = this.array[spot];
      totalNodes += this.countNodes(head);
    }
    return totalNodes;
  }
  // Count the nodes present in the linked list
  countNodes(head) {
    if(head === null) {
      return 0;
    }
    return 1 + this.countNodes(head.nextNode);
  }
  clear() {
    let filledSpots = this.findFilledSpots();  
    for (let spot of filledSpots) {
      let head = this.array[spot];
      let currentPointer = head;
      this.array[spot] = this.traverseNodes(head, currentPointer);
    }
  }
  traverseNodes(head, lead) {
    if (lead === null) {
      return null;
    }
    lead = lead.nextNode;
    head = lead;
    return this.traverseNodes(head, lead);
  }
  keys() {
    let filledSpots = this.findFilledSpots();
    let keysArray = [];
    for (let spot of filledSpots) {
      this.findKeys(this.array[spot], keysArray);
    }
    return keysArray;
  }
  findKeys(head, array) {
    if (head === null) {
      return array;
    }
    array.push(head.key);
    return this.findKeys(head.nextNode, array);
  }
  values() {
    let filledSpots = this.findFilledSpots();
    let valuesArray = [];
    for (let spot of filledSpots) {
      this.findValues(this.array[spot], valuesArray);
    }
    return valuesArray;
  }
  findValues(head, array) {
    if (head === null) {
      return array;
    }
    array.push(head.value);
    return this.findValues(head.nextNode, array);
  }
  entries() {
    let filledSpots = this.findFilledSpots();
    let entriesArray = [];
    let keysArray = this.keys();
    for (let key of keysArray) {
      for (let spot of filledSpots) {
        let foundNode = this.find(this.array[spot], key);
        if (foundNode) {
          let keyEntry = foundNode.key;
          let valueEntry = foundNode.value;
          let pairArray = [keyEntry, valueEntry];
          entriesArray.push(pairArray);
        }
      }
    }
    return entriesArray;
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
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('kite', 'green')
test.set('moon', 'silver')
test.set('student', 'stephen');
console.log(test.entries());
