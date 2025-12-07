import {Container, Tile, TileContent, TileHeader} from "@brynlabs/fusion-ui";
import {PrinterList} from "@/components/printer-list/printer-list";
import {CreatePrinter} from "@/components/create-printer/create-printer";

export default function Admin() {
  return (
    <Container direction={"both"}>
      <Tile>
        <TileHeader>Printers</TileHeader>
        <TileContent>
          <PrinterList></PrinterList>
          <CreatePrinter></CreatePrinter>
        </TileContent>
      </Tile>
    </Container>
  );
}
