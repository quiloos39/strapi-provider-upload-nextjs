import fs from "fs";
import path from "path";

type Body = {
  name: string;
};

export const remove = async (request: Request) => {
  const body: Body = await request.json();

  const filePath = path.join(process.cwd(), "public", body.name);
  fs.unlinkSync(filePath);
};
