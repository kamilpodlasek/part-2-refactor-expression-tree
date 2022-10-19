import { Node } from "./tree";

describe("The expression tree should", () => {
  describe("throw if", () => {
    test("the left side of the operator is not provided", () => {
      expect(() => Node("+", null, null, Node("", 6, null, null))).toThrow(
        new Error("Left side of the operator not provided!")
      );
    });

    test("the right side of the operator is not provided", () => {
      expect(() => Node("+", null, Node("", 6, null, null), null)).toThrow(
        new Error("Right side of the operator not provided!")
      );
    });

    test("the operator is not found", () => {
      expect(() =>
        Node("**", null, Node("", 6, null, null), Node("", 6, null, null))
      ).toThrow(new Error("Operator not found!"));
    });
  });

  describe("return the correct result if", () => {
    test("a number is provided", () => {
      expect(Node("", 3, null, null).result()).toStrictEqual(3);
    });

    describe("a single operator is used", () => {
      test("and the operation is the same as the symbol ('-' and '-')", () => {
        expect(
          Node(
            "-",
            null,
            Node("", 3, null, null),
            Node("", 2, null, null)
          ).result()
        ).toStrictEqual(1);
      });

      test("and the operation is different than the symbol ('/' and '÷')", () => {
        expect(
          Node(
            "÷",
            null,
            Node("", 4, null, null),
            Node("", 2, null, null)
          ).result()
        ).toStrictEqual(2);
      });
    });

    test("nested operators are used", () => {
      expect(
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
        ).result()
      ).toStrictEqual(12);
    });
  });

  describe("return the correct string representation if", () => {
    test("a number is provided", () => {
      expect(Node("", 3, null, null).result()).toStrictEqual(3);
    });

    describe("a single operator is used", () => {
      test("and the operation is the same as the symbol ('-' and '-')", () => {
        expect(
          Node(
            "-",
            null,
            Node("", 3, null, null),
            Node("", 2, null, null)
          ).toString()
        ).toStrictEqual("(3 - 2)");
      });

      test("and the operation is different than the symbol ('/' and '÷')", () => {
        expect(
          Node(
            "÷",
            null,
            Node("", 4, null, null),
            Node("", 2, null, null)
          ).toString()
        ).toStrictEqual("(4 ÷ 2)");
      });
    });

    test("nested operators are used", () => {
      expect(
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
        ).toString()
      ).toStrictEqual("(7 + ((3 - 2) x 5))");
    });
  });
});
