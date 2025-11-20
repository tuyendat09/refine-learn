import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";
import { Icon } from "@iconify/react";

export default function useSidebar() {
  const { listUrl } = useNavigation();

  const linksArr = [
    {
      label: "Product List",
      url: listUrl("protected-product"),
      icon: <Icon icon="ant-design:product-outlined" width={20} height={20} />,
    },
    {
      label: "Category",
      url: listUrl("protected-category"),
      icon: (
        <Icon icon="material-symbols:category-outline" width={20} height={20} />
      ),
    },
  ];
  const { mutate } = useLogout();
  const { data } = useGetIdentity();

  function handleLogOut() {
    mutate();
  }

  const user = data?.user.username;
  return {
    handleLogOut,
    user,
    linksArr,
  };
}
