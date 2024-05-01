import { AxiosInstance } from "axios";
import { File } from ".";

export async function removeFile(client: AxiosInstance, file: File) {
  await client.post("/api/next-upload/remove", {
    name: file.name,
  });
}
