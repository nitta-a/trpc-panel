import { nodePropertiesFromRef, getShapeFromDef, getChildDef } from "@src/parse/utils";
import { DiscriminatedUnionNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

type OptionsMap = Map<string, any>;

type ZodDiscriminatedUnionV4 = {
  options: any[];
  discriminator: string;
  description?: string;
};

type ZodDiscriminatedUnionThreePointTwenty = {
  optionsMap: OptionsMap;
  discriminator: string;
  description?: string;
};

type ZodDiscriminatedUnionPreThreePointTwenty = {
  options: OptionsMap;
  discriminator: string;
  description?: string;
};

export type ZodDiscriminatedUnionDefUnversioned =
  | ZodDiscriminatedUnionV4
  | ZodDiscriminatedUnionPreThreePointTwenty
  | ZodDiscriminatedUnionThreePointTwenty;

function isZodV4(
  def: ZodDiscriminatedUnionDefUnversioned
): def is ZodDiscriminatedUnionV4 {
  return "options" in def && Array.isArray((def as any).options);
}

function isZodThreePointTwenty(
  def: ZodDiscriminatedUnionDefUnversioned
): def is ZodDiscriminatedUnionThreePointTwenty {
  return "optionsMap" in def;
}

function makeDefConsistent(def: ZodDiscriminatedUnionDefUnversioned): {
  discriminator: string;
  entries: Array<[string, any]>;
} {
  if (isZodV4(def)) {
    const entries: Array<[string, any]> = def.options.map((option: any) => {
      const optionDef = getChildDef(option);
      const shape = getShapeFromDef(optionDef);
      const discriminatorField = shape[def.discriminator];
      const discriminatorDef = getChildDef(discriminatorField);
      const value = discriminatorDef?.values?.[0] ?? discriminatorDef?.value;
      return [value, option];
    });
    return {
      discriminator: def.discriminator,
      entries,
    };
  }
  const optionsMap = isZodThreePointTwenty(def) ? def.optionsMap : def.options;
  return {
    discriminator: def.discriminator,
    entries: Array.from(optionsMap.entries()) as Array<[string, any]>,
  };
}

export const parseZodDiscriminatedUnionDef: ParseFunction<
  any,
  DiscriminatedUnionNode
> = (def, refs) => {
  const defConsistent = makeDefConsistent(def);
  const nodeEntries = defConsistent.entries.map(([discriminatorValue, zodObj]) => {
    const zodObjDef = getChildDef(zodObj);
    return [
      discriminatorValue,
      zodSelectorFunction(zodObjDef, refs),
    ];
  });

  const nodesMap = Object.fromEntries(nodeEntries);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "discriminated-union",
    discriminatedUnionValues: defConsistent.entries.map(([n]) => n),
    discriminatedUnionChildrenMap: nodesMap,
    discriminatorName: def.discriminator,
    ...nodePropertiesFromRef(refs),
  };
};
