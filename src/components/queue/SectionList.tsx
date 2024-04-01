import React from "react";
import QueueItem from "./Items";

interface QueueSectionListProps {
  sections: QueueSection[];
  onClick: (sectionId: string) => void;
}

interface QueueSection {
  objid: string;
  title: string;
}

const QueueSectionList: React.FC<QueueSectionListProps> = ({
  sections,
  onClick,
}) => {
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-16">
      {sections.map((section: QueueSection) => (
        <QueueItem
          key={section.objid}
          title={section.title}
          onClick={() => {
            onClick(section.objid);
          }}
        />
      ))}
    </div>
  );
};

export default QueueSectionList;
