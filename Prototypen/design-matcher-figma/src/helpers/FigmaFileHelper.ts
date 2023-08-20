
export class FigmaFileHelper {
  file: FigmaFile;
  testableNodes: FigmaNode[];

  constructor(file: FigmaFile) {
    this.file = file;
    this.testableNodes = [];
  };

  findTestableNodes() {
    if (this.file === undefined) {
      throw "File not found!";
    }
    this.checkTestableNode(this.file.document);

    this.testableNodes.forEach(node => this.showTestableProperties(node));
  }

  checkTestableNode(node: FigmaNode) {
    console.log("CHECKING: " + node.type);
    if(node.type === "RECTANGLE" || node.type === "TEXT") {
      this.testableNodes.push(node);
      console.log("FOUND TESTABLE NODE: " + node.name);
    }

    node.children?.forEach(child => {
      this.checkTestableNode(child)
    });
  }

  showTestableProperties(node: FigmaNode) {
    switch(node.type) {
      case "RECTANGLE":
        const rect = node as FigmaRectangle;
        console.log(node.name + ": border-radius = " + rect.cornerRadius);
        break;
      case "TEXT":
        const text = node as FigmaText;
        console.log(node.name + ": font-family = " + text.style.fontFamily);
        console.log(node.name + ": font-weight = " + text.style.fontWeight);
        console.log(node.name + ": font-size = " + text.style.fontSize);
        console.log(node.name + ": color-opacity = " + text.fills[0].opacity);
        console.log(node.name + ": text-content = " + text.characters);
    }
  }
}

interface FigmaFile {
  document: FigmaDocument;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
  schemaVersion: number;
}

interface FigmaDocument extends FigmaNode {
  id: string;
  name: string;
  scrollBehavior: string;
}

interface FigmaCanvas extends FigmaNode {
  backgroundColor: FigmaColor;
  locked: boolean;

}

interface FigmaFrame extends FigmaNode {
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

interface FigmaVector extends FigmaNode {
  locked: boolean;
  opacity: number;
  effects: FigmaEffect[];
  size: FigmaPropertyVector;
  fills: FigmaPaint[];
  strokes: FigmaPaint[];
  strokeWeight: number;
  strokeDashes: number[];
}

interface FigmaRectangle extends FigmaNode, FigmaVector {
  cornerRadius: number;
  rectangleCornerRadii: number[];
}

interface FigmaText extends FigmaNode, FigmaVector {
  characters: string;
  style: FigmaTypeStyle;
}

interface FigmaNode {
  id: string;
  name: string;
  visible: boolean;
  type: "DOCUMENT" | "CANVAS" | "FRAME" | "GROUP" | "VECTOR" | "REGULAR_POLYGON" | "RECTANGLE" | "TABLE" | "TEXT",
  rotation: number;
  children: FigmaNode[];
}

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaConstraint {
  type: "SCALE" | "WIDTH" | "HEIGHT"
  value: number;
}

interface FigmaPropertyRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FigmaEffect {
  type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
  visible: boolean;
  radius: number;
  color: FigmaColor;
  spread: number;
  offset: FigmaPropertyVector;
}

interface FigmaPropertyVector {
  x: number;
  y: number;
}

interface FigmaSize {
  width: number;
  height: number;
}

interface FigmaTypeStyle {
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

interface FigmaPaint {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND" | "IMAGE" | "EMOJI" | "VIDEO"
  visible: boolean;
  opacity: number;
  color: FigmaColor;
}

