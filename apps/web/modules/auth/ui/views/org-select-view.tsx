import React from "react";
import { OrganizationList } from "@clerk/clerk-react";

function OrgSelectView() {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      hidePersonal
      skipInvitationScreen
    />
  );
}

export default OrgSelectView;
