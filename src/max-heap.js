const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		// if (this.root) {
		// 	console.log('this.root.data', this.root.data);
		// 	const rootToDetach = this.detachRoot();
		// 	this.restoreRootFromLastInsertedNode(rootToDetach);
		// 	console.log('rootToDetach', rootToDetach.data);
		// 	console.log('this.new.root', this.root.data);
		// 	this.shiftNodeDown(this.root);
		// 	console.log('this.new.root', this.root.data);
		// 	return this.root.data;
		// }
	}

	detachRoot() {
		console.log('this.root', this.root.data + ' ' + this.root.priority);
		const rootToDetach = this.root;
		const rootIndex = this.parentNodes.indexOf(this.root);

		if (rootIndex > -1) {
			this.parentNodes.splice(rootToDetach, 1);
		}
		for (let i = 0; i < this.parentNodes.length; i += 1) {
			console.log('after detachRoot' + ' ' + this.parentNodes[i].data + ' ' + this.parentNodes[i].priority);
		}
		this.root = null;
		return rootToDetach;
	}

	restoreRootFromLastInsertedNode(detached) {
		const leftRootChild = detached.left;
		const rightRootChild = detached.right;
		const rootIndex = this.parentNodes.indexOf(detached);
		const lastInserted = this.parentNodes[this.parentNodes.length - 1];
		const lastInsertedIndex = this.parentNodes.length - 1;
		const lastInsertedParent = lastInserted.parent;
		const lastInsertedParentIndex = Math.floor((lastInsertedIndex + 1) / 2) - 1;
		
		console.log('rootIndex', rootIndex);
		
		this.parentNodes.pop();

		// if (lastInsertedParent) {
		// 	lastInsertedParent.removeChild(lastInserted);
		// }

		// if (lastInsertedParentIndex === -1) {
		// 	this.parentNodes.unshift(lastInsertedParent);
		// }

		// if (this.root === lastInsertedParent) {
		// 	this.parentNodes.unshift(lastInsertedParent);
		// }
		
		// if (rootIndex > -1) {
		// 	this.parentNodes.splice(detached, 1, lastInserted);
		// }

		this.root = lastInserted;
		lastInserted.appendChild(leftRootChild);
		lastInserted.appendChild(rightRootChild);
		console.log('this.root', this.root.data + ' ' + this.root.priority);
		console.log('this.root.left', this.root.left.data + ' ' + this.root.left.priority);
		console.log('lastInserted', lastInsertedIndex);
		console.log('lastInsertedParentIndex', lastInsertedParentIndex);
		
		if (lastInsertedParentIndex > -1) {
			this.parentNodes.splice(lastInsertedParentIndex - 1, 0, lastInsertedParent);
		}
		// if (lastInsertedParent === detached) {
		// 	this.parentNodes.splice(lastInsertedParentIndex - 1, 0, lastInsertedParent);
		// }
		
		//const lastInsertedIndex = this.parentNodes.length - 1;
		//const lastInsertedParentIndex = Math.floor((lastInsertedIndex + 1) / 2) - 1;
		
		if (rootIndex === -1 && detached === lastInsertedParent) {
			this.parentNodes.unshift(lastInserted);
		}
		for (let i = 0; i < this.parentNodes.length; i += 1) {
			console.log(i + ' ' + this.parentNodes[i].data + ' ' + this.parentNodes[i].priority);
		}
		// if (lastInsertedParentIndex > -1) {
		// 	this.parentNodes.splice(lastInsertedParentIndex, 0, lastInsertedParent);
		// }
		
	}

	size() {
		let size = 0;
		if (this.root) {
			const stackOfParents = [];
			let nodeChecked = this.root;
			// function isNodeHasChildren(nodeChecked) {
			// 	stackOfParents.push(nodeChecked);
			// 	if (nodeChecked.left) {
			// 		size += 1;
			// 		nodeChecked = nodeChecked.left;
			// 		stackOfParents.push(nodeChecked)
			// 		isNodeHasChildren(nodeChecked);
			// 	} else if (nodeChecked.right) {
			// 		size += 1;
			// 		nodeChecked = nodeChecked.right;
			// 		stackOfParents.push(nodeChecked)
			// 		isNodeHasChildren(nodeChecked);
			// 	}
			// }
			console.log('size', this.parentNodes.length);
		}

		return size;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left && this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			const nodeParent = node.parent;
			const nodeIndex = this.parentNodes.indexOf(node);
			const nodeParentIndex = this.parentNodes.indexOf(node.parent);

			node.swapWithParent();
			
			if (this.root === nodeParent) {
				this.root = node;
			}

			if (nodeParentIndex === -1 && nodeIndex > -1) {
				this.parentNodes.splice(nodeIndex, 1, nodeParent);
			} else if (nodeParentIndex > -1 && nodeIndex > -1) {
				const tempIndex = nodeIndex;
				this.parentNodes.splice(nodeIndex, 1);
				this.parentNodes.splice(nodeParentIndex, 1, node);
				this.parentNodes.splice(tempIndex, 0, nodeParent);
			}
			
			// for (let i = 0; i < this.parentNodes.length; i += 1) {
			// 	console.log(i + ' ' + this.parentNodes[i].data + ' ' + this.parentNodes[i].priority);
			// }
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node.left) {
			let childToSwap = null;

			if (node.right && node.right.priority > node.left.priority) {
				childToSwap = node.right;
			} else {
				childToSwap = node.left;
			}
			//console.log("childToSwap", childToSwap.data + ' ' + childToSwap.priority)
			if (node.priority < childToSwap.priority) {	
				const nodeIndex = this.parentNodes.indexOf(node);
				const nodeChildIndex = this.parentNodes.indexOf(childToSwap);
				// for (let i = 0; i < this.parentNodes.length; i += 1) {
				// 	console.log("before" + i + ' ' + this.parentNodes[i].data + ' ' + this.parentNodes[i].priority);
				// }

				childToSwap.swapWithParent();
				
				if (this.root === node) {
					this.root = childToSwap;
				}

				if (nodeIndex === -1 && nodeChildIndex > -1) {
					this.parentNodes.splice(nodeChildIndex, 1, node);
				} else if (nodeIndex > -1 && nodeChildIndex > -1) {
					const tempIndex = nodeChildIndex;
					this.parentNodes.splice(nodeChildIndex, 1);
					this.parentNodes.splice(nodeIndex, 1, childToSwap);
					this.parentNodes.splice(tempIndex, 0, node);
				}
				
				// for (let i = 0; i < this.parentNodes.length; i += 1) {
				// 	console.log("after" + i + ' ' + this.parentNodes[i].data + ' ' + this.parentNodes[i].priority);
				// }
			}
			this.shiftNodeDown(node);
		}	
	}
}

module.exports = MaxHeap;
