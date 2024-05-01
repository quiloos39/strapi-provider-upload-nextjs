import fs from "fs";
import path from "path";

type Body = {
  file: string;
  name: string;
};

export const upload = async (request: Request) => {
  const body: Body = await request.json();

  const filePath = path.join(process.cwd(), "public", body.name);
  fs.writeFileSync(filePath, body.file, "base64");

  const host = request.headers.get("host") || request.headers.get("x-forwarded-host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const url = `${protocol}://${host}/${body.name}`;

  return {
    url,
  };
};
