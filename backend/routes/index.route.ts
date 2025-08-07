import { Application } from "express";
import nftRoute from "./nft.route";
import eventRoute from "./event.route";
import tokenRoute from "./token.route";

export default function index(app: Application) {
  app.use("/token", tokenRoute);

  app.use("/nfts", nftRoute);

  app.use("/events", eventRoute);
}
