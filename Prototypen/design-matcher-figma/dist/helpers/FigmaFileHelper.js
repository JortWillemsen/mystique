export class FigmaFileHelper {
    file;
    testableNodes;
    constructor(file) {
        this.file = file;
        this.testableNodes = [];
    }
    ;
    findTestableNodes() {
        if (this.file === undefined) {
            throw "File not found!";
        }
        this.checkTestableNode(this.file.document);
        this.testableNodes.forEach(node => this.showTestableProperties(node));
    }
    checkTestableNode(node) {
        console.log("CHECKING: " + node.type);
        if (node.type === "RECTANGLE" || node.type === "TEXT") {
            this.testableNodes.push(node);
            console.log("FOUND TESTABLE NODE: " + node.name);
        }
        node.children?.forEach(child => {
            this.checkTestableNode(child);
        });
    }
    showTestableProperties(node) {
        switch (node.type) {
            case "RECTANGLE":
                const rect = node;
                console.log(node.name + ": border-radius = " + rect.cornerRadius);
                break;
            case "TEXT":
                const text = node;
                console.log(node.name + ": font-family = " + text.style.fontFamily);
                console.log(node.name + ": font-weight = " + text.style.fontWeight);
                console.log(node.name + ": font-size = " + text.style.fontSize);
                console.log(node.name + ": color-opacity = " + text.fills[0].opacity);
                console.log(node.name + ": text-content = " + text.characters);
        }
    }
}
//# sourceMappingURL=FigmaFileHelper.js.map