import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { ProgressSteps } from "../components/ProgressSteps";

export function AccountComplete() {
  const history = useHistory();

  function onSubmit() {
    history.push("/nhs-number");
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={2} isCurrentStepDone={true} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Just a couple more things
            </Heading>
            <Text>
              Thanks for confirming your phone number. Your account is almost
              ready to go!
            </Text>
            <Text>
              Just a few more questions and you’ll be ordering medicine in no
              time.
            </Text>
          </List>
          <Button onClick={onSubmit}>Continue to NHS details</Button>
        </Card>
      </PageContents>
    </>
  );
}
