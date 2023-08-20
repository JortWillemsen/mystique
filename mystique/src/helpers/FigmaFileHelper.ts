import { MystiqueTest } from "../services/RunnerService.js";
import { GeneratorHelper } from "./GeneratorHelper.js";

export class FigmaFileHelper {
  generatorHelper: GeneratorHelper;
  testableNodes: FigmaNode[];
  tests: MystiqueTest[];

  constructor(generatorHelper: GeneratorHelper) {
    this.generatorHelper = generatorHelper;
    this.testableNodes = [];
    this.tests = [];
  }

  public static inject = ["generatorHelper"] as const;

  findTestableNodes(file: FigmaFile) {
    if (file === undefined) {
      throw "File not found!";
    }

    this.checkTestableNode(file.document);
  }

  checkTestableNode(node: FigmaNode) {
    if (node.type === "RECTANGLE" || node.type === "TEXT") {
      this.testableNodes.push(node);
    }

    node.children?.forEach((child) => {
      this.checkTestableNode(child);
    });
  }

  findTests(file: FigmaFile): MystiqueTest[] {
    this.testableNodes = [];
    this.findTestableNodes(file);

    this.testableNodes.forEach((node) => {
      switch (node.type) {
        case "RECTANGLE":
          this.generatorHelper
            .generateRectangleTests(node as FigmaRectangle, file.name)
            .forEach((test) => this.tests.push(test));
          break;
        case "TEXT":
          this.generatorHelper
            .generateTextTests(node as FigmaText, file.name)
            .forEach((test) => this.tests.push(test));
          break;
      }
    });

    return this.tests;
  }
}

export interface FigmaFile {
  name: string;
  document: FigmaDocument;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
  schemaVersion: number;
}

export interface FigmaDocument extends FigmaNode {
  id: string;
  name: string;
  scrollBehavior: string;
}

export interface FigmaCanvas extends FigmaNode {
  backgroundColor: FigmaColor;
  locked: boolean;
}

export interface FigmaFrame extends FigmaNode {
  locked: boolean;
  background: FigmaPaint[];
  backgroundColor: FigmaColor;
  fills: FigmaPaint[];
  strokes: FigmaPaint[];
  strokeWeight: number;
  strokeAlign: "INSIDE" | "OUTSIDE" | "CENTER";
  cornerRadius: number;
  rectangleConerRadii: number[];
  opacity: number;
  absoluteBoundingBox: FigmaPropertyRectangle;
  absoluteRenderBounds: FigmaPropertyRectangle;
  size: FigmaPropertyVector;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  horizontalPadding: number;
  verticalPadding: number;
  effects: FigmaEffect[];
}

export interface FigmaVector extends FigmaNode {
  locked: boolean;
  opacity: number;
  effects: FigmaEffect[];
  size: FigmaPropertyVector;
  fills: FigmaPaint[];
  strokes: FigmaPaint[];
  strokeWeight: number;
  strokeDashes: number[];
}

export interface FigmaRectangle extends FigmaNode, FigmaVector {
  cornerRadius: number;
  rectangleCornerRadii: number[];
}

export interface FigmaText extends FigmaNode, FigmaVector {
  characters: string;
  style: FigmaTypeStyle;
}

export interface FigmaNode {
  id: string;
  name: string;
  visible: boolean;
  type:
    | "DOCUMENT"
    | "CANVAS"
    | "FRAME"
    | "GROUP"
    | "VECTOR"
    | "REGULAR_POLYGON"
    | "RECTANGLE"
    | "TABLE"
    | "TEXT";
  rotation: number;
  children: FigmaNode[];
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaConstraint {
  type: "SCALE" | "WIDTH" | "HEIGHT";
  value: number;
}

export interface FigmaPropertyRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaEffect {
  type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
  visible: boolean;
  radius: number;
  color: FigmaColor;
  spread: number;
  offset: FigmaPropertyVector;
}

export interface FigmaPropertyVector {
  x: number;
  y: number;
}

export interface FigmaSize {
  width: number;
  height: number;
}

export interface FigmaTypeStyle {
  fontFamily: string;
  fontPostScriptName: string;
  paragraphSpacing: number;
  paragraphIndent: number;
  listSpacing: number;
  italic: boolean;
  fontWeight: number;
  fontSize: number;
  textDecoration: "NONE" | "STRIKETHROUGH" | "UNDERLINE";
  textAlignHorizontal: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  letterSpacing: number;
  fills: FigmaPaint[];
  lineHightPx: number;
}

export interface FigmaPaint {
  type:
    | "SOLID"
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND"
    | "IMAGE"
    | "EMOJI"
    | "VIDEO";
  visible: boolean;
  opacity: number;
  color: FigmaColor;
}
