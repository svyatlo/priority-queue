class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			this.left.parent = this;
		} else if (this.right === null) {
			this.right = node;
			this.right.parent = this;
		} else {
			return;
		}
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
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}

		const grandParent = this.parent.parent;
		const parent = this.parent;
		const parentLeft = parent.left;
		const parentRight = parent.right;
		const child = this;
		const childLeft = child.left;
		const childRight = child.right;

		if (grandParent) {
			grandParent.removeChild(parent);
		}

		child.parent = null;
		child.left = null;
		child.right = null;
		parent.parent = null;
		parent.left = null;
		parent.right = null;

		if (childLeft) {
			parent.appendChild(childLeft);
		}
		
		if (childRight) {
			parent.appendChild(childRight);
		}
		
		if (child === parentLeft) {
			child.appendChild(parent);
			if (parentRight) {
				child.appendChild(parentRight);
			}
		} else {
			child.appendChild(parentLeft);
			child.appendChild(parent);
		}

		if (grandParent) {
			grandParent.appendChild(child);
		}
	}
}

module.exports = Node;
