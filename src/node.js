class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		// console.log('node', node);
		if (this.left === null) {
			this.left = node;
			this.left.parent = this;
		} else if (this.right === null) {
			this.right = node;
			this.right.parent = this;
		} else {
			return;
		}
		//console.log('this', this);
		//console.log('this.right', this.right);
	}

	removeChild(node) {
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw 'Not a child of this node!';
		}
	}

	remove() {

	}

	swapWithParent() {
		
	}
}

module.exports = Node;
