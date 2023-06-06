import { gql } from 'apollo-boost';
export const getHubListQuery = gql`
  query ($pageNumber: Int) {
    hubLists(
      searchWord: "" # optional
      pageNumber: $pageNumber # optional
      perPage: 7 # optional
    ) {
      message
      hublist {
        hubId
        hubicon
        hubname
        huburl
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        categories
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const getHubDetailQuery = gql`
  query ($hubId: ID) {
    getHubDetailInfo(hubId: $hubId) {
      message
      hubdetail {
        hubId
        hubicon
        hubname
        huburl
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        outputrssnum
        categories
      }
    }
  }
`;
export const updateHubInfo = gql`
  mutation ($hubId: ID!, $hubName: String!, $hubCategory: [String!]!) {
    updateHubInfo(
      hubId: $hubId
      hubName: $hubName
      hubCategory: $hubCategory
      publicScope: GENERAL_PUBLIC # GENERAL_PUBLIC/LIMITED_PUBLIC
    ) {
      message
    }
  }
`;

export const singleHubInfo = gql`
  query ($hubId: ID!) {
    getHubDetailInfo(hubId: $hubId) {
      message
      hubdetail {
        hubicon
        hubname
        huburl
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        outputrssnum
        categories
      }
    }
  }
`;

export const checkLoginEmail = gql`
  mutation ($email: String!) {
    checkLoginEmail(email: $email) {
      message
    }
  }
`;
export const loginGql = gql`
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        email
        email_verified
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
      }
    }
  }
`;
export const signupCheckEmail = gql`
  mutation ($email: String!) {
    checkEmail(email: $email) {
      message
    }
  }
`;

export const verifyEmail = gql`
  query VerifyEmail($email: String!, $otp: String!) {
    verifyEmail(email: $email, otp: $otp) {
      message
    }
  }
`;

export const CreateUser = gql`
  mutation CreateUser($email: String!, $password: String!, $confirmPassword: String!) {
    createUser(email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
      message
      token
    }
  }
`;

export const SetBasicInfo = gql`
  mutation SetBasicInfo($purpose: String!, $purpose_detail: String!, $ecomedia_id: String!) {
    setBasicInfo(purpose: $purpose, purpose_detail: $purpose_detail, ecomedia_id: $ecomedia_id) {
      ecomedia_id
      message
      role
    }
  }
`;
export const forgetPassword = gql`
  query ($email: String!) {
    forgetPassword(email: $email) {
      message
    }
  }
`;

export const googleSocialLogin = gql`
  query ($token: String!) {
    socialLogin(token: $token) {
      message
      user {
        email
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
      }
    }
  }
`;

export const PurposeList = gql`
  query {
    purposeList {
      key
      value
      items {
        key
        value
      }
    }
  }
`;

export const hubCategories = gql`
  query ($searchWord: String!) {
    hubCategories(searchWord: $searchWord) {
      message
      hubCategoryList {
        id
        name
      }
    }
  }
`;

export const resetPassword = gql`
  mutation ResetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      message
    }
  }
`;

export const hubIconUpdateQuery = gql`
  mutation updateHubIcon($hubId: ID!, $hubIcon: String!) {
    updateHubIcon(hubId: $hubId, hubIcon: $hubIcon) {
      message
      imageUrl
    }
  }
`;

export const additionalNewsAssetsearchResult = gql`
  query NewsAssetSearchingForConnection($hubId: ID!, $searchWord: String, $pageNumber: Int, $perPage: Int) {
    searchNewsAsset(hubId: $hubId, searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      newsAssetList {
        newsAssetId
        asseetIcon
        asseetName
        assetURL
        self_icon
        assetowner_id
        publish_status
        hubconnstatus {
          hubId
          status
        }
        categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetHubNewsAssetListQueryString = gql`
  query GetHubNewsAssetList($hubId: ID!, $searchWord: String, $pageNumber: Int, $perPage: Int) {
    getHubNewsAssetList(hubId: $hubId, searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      hubNewsAssetList {
        assetname
        newsAssetId
        asseticon
        asseturl
        self_icon
        ecomedia_id
        public_status
        assetcategories {
          id
          name
        }
        third_party_categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const newsAssetDisconnectQueryString = gql`
  mutation NewsAssetDisconnect($newsAssetId: ID!, $hubId: ID!) {
    newsAssetDisconnect(newsAssetId: $newsAssetId, hubId: $hubId) {
      message
    }
  }
`;

export const HubConnectNewsAsset = gql`
  mutation HubConnectNewsAsset($newsAssetId: ID!, $hubId: ID!) {
    connectNewsAsset(newsAssetId: $newsAssetId, hubId: $hubId) {
      message
    }
  }
`;

export const newsAssetsCatSetupQuery = gql`
  mutation NewsAssetCategorySetupByHubOwner($newsAssetId: ID!, $hubId: ID!, $categories: [String]) {
    newsAssetCategorySetupHubOwner(newsAssetId: $newsAssetId, hubId: $hubId, categories: $categories) {
      message
    }
  }
`;
