import { LiteralNode, ParseReferences } from "@src/parse/parseNodeTypes";

export function parseZodVoidDef(
  _: any,
  refs: ParseReferences
): LiteralNode {
  return {
    type: "literal",
    value: undefined,
    path: refs.path,
  };
}
