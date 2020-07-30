import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { accountSelectors } from "../store/account/selectors";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { ProgressSteps } from "../components/ProgressSteps";

export function SignupComplete() {
  const history = useHistory();
  const patient = useSelector(accountSelectors.getPatient);

  function onSubmit() {
    history.push("/");
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={3} isCurrentStepDone={true} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Your account is good to go!
            </Heading>
            <Text>
              It’s time to tell us what medicine{" "}
              {patient.isNoK ? "they" : "you"} need. Log in to get started.
            </Text>
          </List>
          <Button onClick={onSubmit}>Log in to Echo</Button>
        </Card>
      </PageContents>
    </>
  );
}
