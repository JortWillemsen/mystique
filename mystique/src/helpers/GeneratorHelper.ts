import { FigmaNode, FigmaRectangle, FigmaText } from "./FigmaFileHelper.js";
import { MystiqueTest } from "./../services/RunnerService.js";
import { ConfigService } from "../services/ConfigService.js";
import { floatToRgbString } from "./GenericHelper.js";

export class GeneratorHelper {
  configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public static inject = ["configService"] as const;

  generateRectangleTests(
    node: FigmaRectangle,
    component: string
  ): MystiqueTest[] {
    let tests: MystiqueTest[] = [];

    tests.push(
      this.generateTestForComponent(
        component,
        node,
        "border-radius",
        `${node.cornerRadius}px`
      )
    );
    tests.push(
      this.generateTestForComponent(
        component,
        node,
        "background-color",
        floatToRgbString(node.fills[0].color)
      )
    );

    return tests;
  }

  generateTextTests(node: FigmaText, component: string): MystiqueTest[] {
    let tests: MystiqueTest[] = [];

    tests.push(
      this.generateTestForComponent(
        component,
        node,
        "font-size",
        `${node.style.fontSize}px`
      )
    );
    tests.push(
      this.generateTestForComponent(
        component,
        node,
        "font-family",
        `${node.style.fontFamily}`
      )
    );

    return tests;
  }

  generateTestForComponent(
    component: string,
    node: FigmaNode,
    property: string,
    value: string
  ) {
    const test = {
      name: `${property} should be ${value}`,
      componentName: component,
      componentUrl:
        this.configService.config.storybookUrl +
        `/iframe.html?args=&id=${component.toLowerCase()}&viewMode=story`,
      selector: `.${node.name}`,
      property: property,
      value: value,
    };

    return test;
  }
}
