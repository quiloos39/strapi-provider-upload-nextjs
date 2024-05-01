import { ReadStream } from "fs";
import { init } from "./provider";

interface FileResponse {
  url: string;
}

interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  sizeInBytes: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
  localUrl?: string;
}

interface Options {
  nextURL?: string;
}

export { init, File, FileResponse, Options };
