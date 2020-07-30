import React from "react";
import { useHistory } from "react-router-dom";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { Heading } from "../design-system/Heading";
import { Button } from "../design-system/Button";
import { List } from "../design-system/List";
import { Divider } from "../design-system/Divider";

export function NotImplemented() {
  const history = useHistory();

  return (
    <PageContents maxWidth={560}>
      <Card>
        <List gap={3}>
          <Heading fontFamily="display" size={4}>
            What would you expect here?
          </Heading>
          <Text>
            This page hasn't been built as part of the prototype, but can you
            tell us what you were expecting to see here?
          </Text>
        </List>
        <Divider />
        <Button variant="secondary" onClick={() => history.goBack()}>
          Go back
        </Button>
      </Card>
    </PageContents>
  );
}
