import axios from "axios";
import { Options, File } from ".";
import { uploadStream } from "./upload";
import { removeFile } from "./remove";

export const init = (options: Options) => {
  const client = axios.create({
    baseURL: options.nextURL || "http://localhost:3000",
  });

  return {
    async uploadStream(file: File) {
      await uploadStream(client, file);
    },

    async upload(file: File) {
      await uploadStream(client, file);
    },

    async delete(file: File) {
      await removeFile(client, file);
    },
  };
};
