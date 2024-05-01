import { AxiosInstance } from "axios";
import { ReadStream } from "fs";
import { FileResponse, File } from ".";

const _convertStreamToBuffer = async (readStream: ReadStream): Promise<Buffer> => {
  return await new Promise((resolve, reject) => {
    const buffer: Buffer[] = [];
    readStream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      }
    });

    readStream.on("end", () => {
      resolve(Buffer.concat(buffer));
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};

export async function uploadStream(client: AxiosInstance, file: File) {
  const readStream = file.stream!;
  const buffer = await _convertStreamToBuffer(readStream);

  const url = await client
    .post("/api/next-upload/upload", {
      file: buffer.toString("base64"),
      name: file.name,
    })
    .then((res) => res.data as FileResponse)
    .then((res) => new URL(res.url));

  file.previewUrl = url.href;
  file.url = url.href;
  file.path = url.pathname;
}
