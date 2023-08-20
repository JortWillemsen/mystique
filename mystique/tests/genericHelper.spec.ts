import {
  floatToRgbString,
  replaceAt,
  rgbToString,
} from "../src/helpers/GenericHelper.js";

test.each([
  ["a", 0, "aello"],
  ["b", 1, "hbllo"],
  ["c", 2, "heclo"],
  ["d", 3, "heldo"],
  ["e", 4, "helle"],
  ["z", 5, "hello"],
])(
  "replaceAt should replace a character at the correct index",
  (replacement, index, result) => {
    const string = "hello";

    const answer = replaceAt(string, index, replacement);

    expect(answer).toBe(result);
  }
);

test.each([
  [1, 0, 1, "rgb(255,0,255)"],
  [0.4, 0.12, 1, "rgb(102,31,255)"],
  [1, 1, 1, "rgb(255,255,255)"],
  [0, 0, 0, "rgb(0,0,0)"],
])(
  "floatRgbToString should convert floats to an rgb string",
  (r, g, b, result) => {
    const answer = floatToRgbString({ r: r, b: b, g: g });

    expect(answer).toBe(result);
  }
);

test.each([
  [{ r: 255, g: 0, b: 255 }, "rgb(255,0,255)"],
  [{ r: 102, g: 31, b: 255 }, "rgb(102,31,255)"],
  [{ r: 255, g: 255, b: 255 }, "rgb(255,255,255)"],
  [{ r: 0, g: 0, b: 0 }, "rgb(0,0,0)"],
])("floatRgbToString should convert floats to an rgb string", (rgb, result) => {
  const answer = rgbToString(rgb);

  expect(answer).toBe(result);
});
