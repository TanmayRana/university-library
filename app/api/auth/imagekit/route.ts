import config from "@/lib/config";
import ImageKit from "imagekit";

const {
  env: {
    imageKit: { publickey, privatekey, urlEndpoint },
  },
} = config;

const imageKit = new ImageKit({
  publicKey: publickey,
  privateKey: privatekey,
  urlEndpoint: urlEndpoint,
});

export async function GET() {
  const result = imageKit.getAuthenticationParameters();
  return Response.json(result);
}
