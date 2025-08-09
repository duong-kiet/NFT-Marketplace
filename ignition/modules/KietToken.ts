import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KietTokenModule = buildModule("KietToken", (m) => {
  const KietToken = m.contract("KietToken");

  return { KietToken };
});

export default KietTokenModule;
