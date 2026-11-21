// =========================
// EASY BORDER CUSTOMIZATION
// =========================

// Overall message width (including outer border).
const WIDTH = 26;

// OUTER border characters: edit these to change the box shape.
const OUTER = {
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  horizontal: "─"
};

// INNER border characters: edit these to change the sides/padding.
const INNER = {
  left: "│",
  right: "│",
  leftPadding: " ",
  rightPadding: " "
};

// =========================
// Formatter (leave this part)
// =========================

const CONTENT_WIDTH = WIDTH - 2 - Array.from(INNER.leftPadding).length - Array.from(INNER.rightPadding).length;

function length(text) {
  return Array.from(String(text)).length;
}

function wrap(text) {
  const output = [];
  let line = "";

  for (const word of String(text).split(/\\s+/)) {
    if (length(word) > CONTENT_WIDTH) {
      if (line) {
        output.push(line);
        line = "";
      }

      let chars = Array.from(word);
      while (chars.length) {
        output.push(chars.splice(0, CONTENT_WIDTH).join(""));
      }
      continue;
    }

    if (!line) line = word;
    else if (length(line) + 1 + length(word) <= CONTENT_WIDTH) line += " " + word;
    else {
      output.push(line);
      line = word;
    }
  }

  if (line) output.push(line);
  return output;
}

function border(title, body) {
  const titleText = String(title || "").toUpperCase();
  const topText = " " + titleText + " ";
  const topFill = Math.max(0, WIDTH - 2 - length(topText));

  const top =
    OUTER.topLeft +
    topText +
    OUTER.horizontal.repeat(topFill) +
    OUTER.topRight;

  const contentLines = [];
  for (const originalLine of String(body ?? "").split("\\n")) {
    if (originalLine === "") {
      contentLines.push("");
    } else {
      contentLines.push(...wrap(originalLine));
    }
  }

  const content = contentLines.map(line =>
    INNER.left +
    INNER.leftPadding +
    line.padEnd(CONTENT_WIDTH, " ") +
    INNER.rightPadding +
    INNER.right
  );

  const bottom =
    OUTER.bottomLeft +
    OUTER.horizontal.repeat(WIDTH - 2) +
    OUTER.bottomRight;

  return [top, ...content, bottom].join("\\n");
}

module.exports = border;
