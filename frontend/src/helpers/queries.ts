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
  }
`;
