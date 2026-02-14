import { defaultReferences } from "../../defaultReferences";
import { ParsedInputNode } from "../../../parseNodeTypes";
import { z, ZodType } from "zod";
import { zodSelectorFunction } from "../../zod/selector";

describe("Parsed ZodBranded", () => {
  it("should parse branded nodes as their base zod type", () => {
    const testCases: {
      node: ParsedInputNode;
      zodType: ZodType;
    }[] = [
      {
        node: {
          type: "number",
          path: [],
        },
        zodType: z.number().brand("number"),
      },
      {
        node: {
          type: "string",
          path: [],
        },
        zodType: z.string().brand("string"),
      },
    ];
    for (var testCase of testCases) {
      // In Zod v4, branded types don't have a special _def structure
      // They just have the base type's _def, so we use the selector
      const parsed = zodSelectorFunction(
        testCase.zodType._def as any,
        defaultReferences()
      );
      expect(parsed).toStrictEqual(testCase.node);
    }
  });
});
