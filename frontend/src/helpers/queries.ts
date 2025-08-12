import { gql } from "graphql-request";

export const query = gql`
  query ($to: Bytes!) {
    allMinted: minteds {
      to
      tokenId
      uri
    }
    myMinted: minteds(where: { to: $to }) {
      to
      tokenId
      uri
    }
    allTransfer: transfers(
      where: { from_not: "0x0000000000000000000000000000000000000000" }
    ) {
      from
      to
      tokenId
    }
    myTransfer: transfers(
      where: {
        from_not: "0x0000000000000000000000000000000000000000"
        from: $to
      }
    ) {
      from
      to
      tokenId
    }
  }
`;
