import docSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Document.svg";
import speadsheetSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Spreadsheet.svg";
import slideshowSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Slideshow.svg";
import archiveSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Archive.svg";
import codeSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Code.svg";
import imageSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Image.svg";
import videoSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Video.svg";
import audioSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Audio.svg";
import unknownSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Unknown.svg";

interface FileExtensionIcon {
  extensions: string[];
  icon: string;
  mime: string[];
}

export function getFileIconImageSource(fileName: string, mime: string): string {
  const fn = fileName.toLowerCase().trim();
  const result = fileExtensionIcons.find(
    x => x.extensions.some(ext => fn.endsWith(ext)) || x.mime.some(m => mime.startsWith(m))
  );
  return result?.icon ?? unknownSvg;
}

const fileExtensionIcons: FileExtensionIcon[] = [
  {
    icon: docSvg,
    extensions: [".docx", ".doc", ".txt", ".md", ".markdown", ".mkdown", ".mkdn", ".pdf"],
    mime: [
      "application/x-abiword",
      "application/msword",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
  },
  {
    icon: speadsheetSvg,
    extensions: [".xlsx", ".xls", ".csv", ".tsv", ".psv"],
    mime: ["application/ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
  },
  {
    icon: slideshowSvg,
    extensions: [".pptx", ".ppt"],
    mime: [
      "application/vnd.apple.keynote",
      "application/ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ]
  },
  {
    icon: archiveSvg,
    extensions: [".zip", ".tar", ".tar.gz", ".rar"],
    mime: []
  },
  {
    icon: imageSvg,
    extensions: [],
    mime: ["image/"]
  },
  {
    icon: videoSvg,
    extensions: [],
    mime: ["video/"]
  },
  {
    icon: audioSvg,
    extensions: [],
    mime: ["audio/"]
  },
  {
    icon: codeSvg,
    extensions: [".json", ".js", ".ts", ".htm", ".html", ".css", ".sass"],
    mime: []
  }
];
