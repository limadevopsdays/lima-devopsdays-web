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
};

export default function PanelGrid({ panels }: PanelGridProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {panels.map(({ id, panelGroup }) => (
        <div key={id} className="flex gap-2">
          {panelGroup.map(({ id, title }) => (
            <Panel key={id}>
              <Paragraph as="span">
                {title}
              </Paragraph>
            </Panel>
          ))}
        </div>
      ))}
    </div>
  );
};