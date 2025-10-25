import {Container} from "@brynlabs/fusion-ui";
import {Logout} from "@/components/auth/logout";

export default function Page() {
  return (
    <Container direction={"both"}>
      <div>Welcome</div>
      <Logout></Logout>
    </Container>
  );
}
