import Service from "@/libs/remote-service";

export const getGroupsWithSections = async () => {
  const svc = Service.lookup("QueueGroupService", "etracs");
  const groupsWithSections = await svc.invoke("getGroupsWithSections", null);
  const groups = groupsWithSections.map((item: any) => {
    const group = {
      objid: item.objid,
      title: item.title,
      sections: getSections(item),
    };
    return group;
  });
  return groups;
};

const getSections = (group: any) => {
  return group.sections.map((item: any) => {
    const section = {
      objid: item.objid,
      groupid: item.groupid,
      title: item.title,
      currentseries: item.currentseries,
      group: {
        objid: group.objid,
        title: group.title,
      },
    };
    return section;
  });
};
