import type { ReactNode } from "react";
import { createContext, useState } from "react";

export type QueueSection = {
  objid: string;
  groupid: string;
  title: string;
  currentseries: number;
  group: {
    objid: string;
    title: string;
  };
};

export type QueueGroup = {
  objid: string;
  title: string;
  sections: QueueSection[];
};

export type QueueContextData = {
  groups: QueueGroup[];
  getGroups: () => QueueGroup[];
  setGroups: (groups: QueueGroup[] | []) => void;
  getSections: (groupId: string) => QueueSection[];
};

const QueueContext = createContext<QueueContextData>({
  groups: [],
  getGroups: () => [],
  setGroups: (groups: QueueGroup[]) => [],
  getSections: (groupId: string) => [],
});

export function QueueContextProvider({ children }: { children: ReactNode }) {
  const [queueGroups, setQueueGroups] = useState<QueueGroup[]>([]);

  function setGroups(groups: QueueGroup[]) {
    setQueueGroups(groups);
  }

  function getGroups() {
    return queueGroups;
  }

  function getSections(groupId: string): QueueSection[] {
    const group = queueGroups.find(
      (group) => group.objid.toLowerCase() === groupId
    );
    return group?.sections || [];
  }

  const context: QueueContextData = {
    groups: queueGroups,
    getGroups,
    setGroups,
    getSections,
  };

  return (
    <QueueContext.Provider value={context}>{children}</QueueContext.Provider>
  );
}

export default QueueContext;
