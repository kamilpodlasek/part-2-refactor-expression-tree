import { strictEqual } from "assert";

class Operator {
  left: INode;
  right: INode;

  constructor(left: INode, right: INode) {
    this.left = left;
    this.right = right;
  }

  result() {
    throw Error("Calling result on an unspecified operator!");
  }

  toString() {
    throw Error("Calling toString on an unspecified operator!");
  }
}

class Add extends Operator {
  result() {
    return this.left.result() + this.right.result();
  }

  toString() {
    return `(${this.left.toString()} + ${this.right.toString()})`;
  }
}

class Subtract extends Operator {
  result() {
    return this.left.result() - this.right.result();
  }

  toString() {
    return `(${this.left.toString()} - ${this.right.toString()})`;
  }
}

class Multiply extends Operator {
  result() {
    return this.left.result() * this.right.result();
  }

  toString() {
    return `(${this.left.toString()} x ${this.right.toString()})`;
  }
}

class Divide extends Operator {
  result() {
    return this.left.result() / this.right.result();
  }

  toString() {
    return `(${this.left.toString()} ÷ ${this.right.toString()})`;
  }
}

const operators = {
  "+": Add,
  "-": Subtract,
  x: Multiply,
  "÷": Divide,
};

interface INode {
  result: () => number;
  toString: () => string;
}

const Node = (
  operator: string,
  value: number | null,
  left: INode | null,
  right: INode | null
): INode => {
  if (value) {
    return {
      result: () => value,
      toString: () => value.toString(),
    };
  }

  if (!left) {
    throw Error("Left side of the operator not provided!");
  }

  if (!right) {
    throw Error("Right side of the operator not provided!");
  }

  if (!operators[operator]) {
    throw Error("Operator not found!");
  }

  return new operators[operator](left, right);
};

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
