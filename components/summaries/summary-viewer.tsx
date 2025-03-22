"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { NavigationControls } from "./navigation-control";
import ProgresssBar from "./progress-bar";

// function parsePoint(point: string) {
//   const isNumbered = /^\d+\./.test(point);
//   const isMainPoint = /^./.test(point);

//   const emojiRegex = /[\u{1F300}-\u{1F9FF}] | [\u{2600}-\u{26FF}]/u;
//   const hasEmoji = emojiRegex.test(point);
//   const isEmpty = !point.trim();

//   return { isNumbered, isMainPoint, hasEmoji, isEmpty };
// }

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[•]\s*/, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;

  return { emoji: emoji.trim(), text: text.trim() };
}

const parseSection = (section: string): { title: string; points: string[] } => {
  // console.log(section);

  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];

  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

export const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split(/\n# |\n## /)
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  // console.log(sections);

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full  overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgresssBar sections={sections} currentSection={currentSection} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm;pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
              {sections[currentSection]?.title || ""}
            </h2>
          </div>
          <div>
            {sections[currentSection]?.points.map((point, index) => {
              const parsedPoint = parseEmojiPoint(point);
              const emoji = parsedPoint?.emoji || "";
              const text = parsedPoint?.text || "";

              return (
                <div
                  key={index}
                  className="group mb-3 relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
                >
                  <div className=" rounded-2xl">
                    <div className="relative flex items-start gap-3">
                      <span className="text-lg lg:text-xl shrink-0 pt-1">
                        {emoji}
                      </span>
                      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={() => setCurrentSection(currentSection - 1)}
        onNext={() => setCurrentSection(currentSection + 1)}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
};
