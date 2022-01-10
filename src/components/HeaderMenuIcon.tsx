import { BetaIcon, NewIcon } from "assets/icons";
import { IconTypes } from "lib/headerMenus";
import React, { ReactElement } from "react";

interface HeaderMenuIconProps {
  icon: IconTypes;
}

function HeaderMenuIcon({ icon }: HeaderMenuIconProps): ReactElement | null {
  switch (icon) {
    case "new":
      return <NewIcon />;
    case "beta":
      return <BetaIcon />;
    default:
      return null;
  }
}

export default HeaderMenuIcon;
