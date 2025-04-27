import PanelGridRoot from "./PanelGridRoot";
import PanelRow from "./PanelRow";
import Panel from "../panel";
import Paragraph from "../paragraph";

export interface PanelItem {
  id: string;
  title: string;
}

export interface IPanelGroup {
  id: string;
  panelGroup: PanelItem[];
}

export interface PanelGridProps {
  panels: IPanelGroup[];
  renderRow?: (group: IPanelGroup, children: React.ReactNode) => React.ReactNode;
  renderPanel?: (item: PanelItem) => React.ReactNode;
};

export default function PanelGrid({ panels, renderRow, renderPanel }: Readonly<PanelGridProps>) {
  return (
    <PanelGridRoot>
      {panels.map((group) => {
        const panelNodes = group.panelGroup.map((item) => (
          renderPanel ?
            renderPanel(item) :
            <Panel key={item.id}>
              <Paragraph as="span">{item.title}</Paragraph>
            </Panel>
        ));

        return renderRow ?
          renderRow(group, panelNodes) :
          <PanelRow key={group.id}>{panelNodes}</PanelRow>;
      })}
    </PanelGridRoot>
  );
}
