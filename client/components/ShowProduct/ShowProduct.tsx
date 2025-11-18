import { memo } from "react";
function ShowProduct() {
  console.log("rerender");
  return <div>ShowProduct</div>;
}

export default memo(ShowProduct);
